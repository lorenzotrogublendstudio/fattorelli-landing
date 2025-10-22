<?php
// contact.php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Vary: Origin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ==============================
// 1️⃣ Leggi .env
// ==============================
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
  $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($lines as $line) {
    if (strpos($line, '=') !== false) {
      [$key, $value] = explode('=', $line, 2);
      $key = trim($key);
      $value = trim($value, " \t\n\r\"'");
      $_ENV[$key] = $value;
    }
  }
}

// ==============================
// 2️⃣ Carica PHPMailer
// ==============================
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ==============================
// 3️⃣ Leggi dati form
// ==============================
$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '[]', true);

$name    = trim($payload['name'] ?? '');
$email   = trim($payload['email'] ?? '');
$phone   = trim($payload['phone'] ?? '');
$message = trim($payload['message'] ?? '');
$honey   = trim($payload['company'] ?? ''); // honeypot

$errors = [];
if ($honey !== '') { $errors[] = 'Spam rilevato'; }
if (mb_strlen($name) < 2) { $errors[] = 'Nome obbligatorio'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'Email non valida'; }
if (mb_strlen($message) < 5) { $errors[] = 'Messaggio troppo corto'; }

if ($errors) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'errors'=>$errors]);
  exit;
}

// ==============================
// 4️⃣ Prepara email
// ==============================
function esc($s){ return htmlspecialchars((string)$s, ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8'); }

$html = '
<div style="font-family:Roboto,Arial,sans-serif;background:#f6fbfc;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;
       border:1px solid #e3f0f1;box-shadow:0 10px 28px rgba(16,53,56,.08);overflow:hidden">
    <div style="background:linear-gradient(135deg,#279394,#1f7778);
         padding:18px;color:#fff;font-weight:900;font-size:18px;letter-spacing:.5px">
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

// ==============================
// 5️⃣ Invia con PHPMailer
// ==============================
try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = $_ENV['SMTP_HOST'];
  $mail->Port = (int)$_ENV['SMTP_PORT'];
  $mail->SMTPAuth = true;
  $mail->Username = $_ENV['SMTP_USER'];
  $mail->Password = $_ENV['SMTP_PASS'];
  $mail->SMTPSecure = $_ENV['SMTP_SECURE'] ?: 'tls';

  $mail->setFrom($_ENV['MAIL_FROM'], $_ENV['MAIL_FROM_NAME']);
  $mail->addAddress($_ENV['MAIL_TO']);
  $mail->addReplyTo($email, $name);

  $mail->isHTML(true);
  $mail->Subject = "Nuova richiesta da $name";
  $mail->Body    = $html;
  $mail->AltBody = "Nome: $name\nEmail: $email\nTelefono: $phone\n\nMessaggio:\n$message\n";

  $mail->send();
  echo json_encode(['ok'=>true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false, 'error'=>'Errore invio: '.$mail->ErrorInfo]);
}
