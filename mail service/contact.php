<?php
declare(strict_types=1);

// JSON response
header('Content-Type: application/json; charset=utf-8');

// CORS + preflight
$origin  = $_SERVER['HTTP_ORIGIN'] ?? '*';
$allowed = ['http://localhost:5173','http://127.0.0.1:5173'];
if (in_array($origin, $allowed, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header('Vary: Origin');
} else {
  header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// -------- Load .env (corrente o cartella padre) --------
foreach ([__DIR__.'/.env', dirname(__DIR__).'/.env'] as $envPath) {
  if (is_file($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES) as $line) {
      $line = trim($line);
      if ($line === '' || str_starts_with($line, '#')) continue;
      if (strpos($line, '=') !== false) {
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v, " \t\n\r\"'");
      }
    }
    break;
  }
}

// -------- PHPMailer autoload (corrente o cartella padre) --------
$autoloadFound = false;
foreach ([__DIR__.'/vendor/autoload.php', dirname(__DIR__).'/vendor/autoload.php'] as $autoload) {
  if (is_file($autoload)) { require $autoload; $autoloadFound = true; break; }
}
if (!$autoloadFound) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'PHPMailer non disponibile (vendor/autoload.php mancante)']);
  exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// -------- Input (JSON o POST) --------
$payload = null;
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
  $raw = file_get_contents('php://input');
  $payload = json_decode($raw ?: '[]', true);
}
if (!is_array($payload)) $payload = $_POST ?: [];

$name    = trim($payload['name'] ?? '');
$email   = trim($payload['email'] ?? '');
$phone   = trim($payload['phone'] ?? '');
$message = trim($payload['message'] ?? '');
$honey   = trim($payload['company'] ?? ''); // honeypot

$errors = [];
if ($honey !== '')                          $errors[] = 'Spam rilevato';
if (mb_strlen($name) < 2)                   $errors[] = 'Nome obbligatorio';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email non valida';
if (mb_strlen($message) < 5)                $errors[] = 'Messaggio troppo corto';
if ($errors) { http_response_code(400); echo json_encode(['ok'=>false,'errors'=>$errors]); exit; }

function esc(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

$html = '
<div style="font-family:Roboto,Arial,sans-serif;background:#f6fbfc;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e3f0f1;box-shadow:0 10px 28px rgba(16,53,56,.08);overflow:hidden">
    <div style="background:linear-gradient(135deg,#279394,#1f7778);padding:18px;color:#fff;font-weight:900;font-size:18px;letter-spacing:.5px">
      Nuova richiesta — Studio Dentistico Dr. Umberto Fattorelli
    </div>
    <div style="padding:20px 22px;color:#103538">
      <p><strong>Nome:</strong> '.esc($name).'</p>
      <p><strong>Email:</strong> '.esc($email).'</p>
      <p><strong>Telefono:</strong> '.esc($phone ?: '—').'</p>
      <hr style="border:none;border-top:1px solid #edf5f6;margin:14px 0">
      <p><strong>Messaggio:</strong></p>
      <p style="white-space:pre-wrap;">'.esc($message).'</p>
    </div>
    <div style="padding:14px 22px;color:#5c7679;font-size:12px;background:#f9fcfd">
      Email automatica — '.date('Y-m-d H:i:s').'
    </div>
  </div>
</div>';

try {
  // -------- Config comune SMTP --------
  $host   = $_ENV['SMTP_HOST']   ?? '';
  $port   = (int)($_ENV['SMTP_PORT'] ?? 587);
  $user   = $_ENV['SMTP_USER']   ?? '';
  $pass   = $_ENV['SMTP_PASS']   ?? '';
  $secure = $_ENV['SMTP_SECURE'] ?? ($port === 465 ? 'ssl' : 'tls'); // niente warning

  $fromEmail = $_ENV['MAIL_FROM']      ?? ($user ?: '');
  $fromName  = $_ENV['MAIL_FROM_NAME'] ?? 'Modulo contatti';
  $toEmail   = $_ENV['MAIL_TO']        ?? $fromEmail;

  // -------- Mail allo studio --------
  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->isSMTP();
  $mail->Host       = $host;
  $mail->Port       = $port;
  $mail->SMTPAuth   = true;
  $mail->Username   = $user;
  $mail->Password   = $pass;
  $mail->SMTPSecure = $secure;

  $mail->setFrom($fromEmail, $fromName);
  $mail->addAddress($toEmail);
  if ($email) $mail->addReplyTo($email, $name);

  // BCC multipla (MAIL_BCC="a@b.it, c@d.it")
  if (!empty($_ENV['MAIL_BCC'])) {
    foreach (preg_split('/[,;]+/', $_ENV['MAIL_BCC']) as $bcc) {
      $bcc = trim($bcc);
      if ($bcc && filter_var($bcc, FILTER_VALIDATE_EMAIL)) $mail->addBCC($bcc);
    }
  }

  $mail->isHTML(true);
  $mail->Subject = "Nuova richiesta da $name";
  $mail->Body    = $html;
  $mail->AltBody = "Nome: $name\nEmail: $email\nTelefono: $phone\n\nMessaggio:\n$message\n";
  $mail->send();

  // -------- Autoresponder opzionale --------
  if (($_ENV['AUTOREPLY_ENABLED'] ?? '0') === '1' && $email) {
    $auto = new PHPMailer(true);
    $auto->CharSet = 'UTF-8';
    $auto->isSMTP();
    $auto->Host       = $host;
    $auto->Port       = $port;
    $auto->SMTPAuth   = true;
    $auto->Username   = $user;
    $auto->Password   = $pass;
    $auto->SMTPSecure = $secure;

    $auto->setFrom($fromEmail, $fromName);
    $auto->addAddress($email, $name);
    $auto->addReplyTo($toEmail, $fromName);

    $subject = $_ENV['AUTOREPLY_SUBJECT'] ?? 'Abbiamo ricevuto la tua richiesta';
    $body = '
      <div style="font-family:Roboto,Arial,sans-serif;padding:22px">
        <p>Ciao '.esc($name).',</p>
        <p>grazie per averci contattato. Ti risponderemo il prima possibile.</p>
        <p><strong>Riepilogo:</strong></p>
        <p>'.nl2br(esc($message)).'</p>
        <p style="color:#5c7679">Studio Dentistico Dr. Umberto Fattorelli</p>
      </div>';

    $auto->isHTML(true);
    $auto->Subject = $subject;
    $auto->Body    = $body;
    $auto->AltBody = "Ciao $name,\nabbiamo ricevuto la tua richiesta.\n\n$message\n";
    $auto->send();
  }

  echo json_encode(['ok'=>true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'Errore invio: '.$e->getMessage()]);
}