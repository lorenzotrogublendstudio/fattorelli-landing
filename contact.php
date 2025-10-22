<?php
// contact.php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

// CORS (se frontend e backend sono sullo stesso dominio puoi semplificare)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// Carica PHPMailer (composer)
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Config SMTP — METTI I TUOI DATI QUI
const SMTP_HOST = 'smtp.tuodominio.it';
const SMTP_PORT = 587;
const SMTP_USER = 'utente@tuodominio.it';
const SMTP_PASS = '********';
const SMTP_SECURE = 'tls'; // 'ssl' oppure 'tls'

const MAIL_TO   = 'dottfattorelli@gmail.com';
const MAIL_FROM = 'no-reply@tuodominio.it';
const MAIL_FROM_NAME = 'Landing Fattorelli';

// Leggi payload JSON
$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '[]', true);

// Validazioni base
$name    = trim($payload['name']   ?? '');
$email   = trim($payload['email']  ?? '');
$phone   = trim($payload['phone']  ?? '');
$message = trim($payload['message']?? '');
$honey   = trim($payload['company']?? ''); // honeypot

$errors = [];
if ($honey !== '') { $errors[] = 'Spam rilevato'; }
if (mb_strlen($name) < 2)   { $errors[] = 'Nome obbligatorio'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'Email non valida'; }
if (mb_strlen($message) < 10){ $errors[] = 'Messaggio troppo corto'; }

if ($errors) {
  http_response_code(400);
  echo json_encode(['ok'=>false, 'errors'=>$errors], JSON_UNESCAPED_UNICODE);
  exit;
}

// Rate limit soft per IP (10 min / 6 richieste)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'local';
$bucketFile = sys_get_temp_dir() . '/contact_bucket_' . md5($ip) . '.json';
$bucket = ['count'=>0,'ts'=>time()];
if (file_exists($bucketFile)) {
  $bucket = json_decode(file_get_contents($bucketFile), true) ?: $bucket;
}
if (time() - $bucket['ts'] > 600) { $bucket = ['count'=>0,'ts'=>time()]; }
$bucket['count']++;
file_put_contents($bucketFile, json_encode($bucket));
if ($bucket['count'] > 6) {
  http_response_code(429);
  echo json_encode(['ok'=>false,'error'=>'Troppi tentativi, riprova tra poco.'], JSON_UNESCAPED_UNICODE);
  exit;
}

// HTML sicuro
function esc($s){ return htmlspecialchars((string)$s, ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8'); }
$html = '
<div style="font-family:Roboto,Arial,sans-serif;background:#f6fbfc;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e3f0f1;box-shadow:0 10px 28px rgba(16,53,56,.08);overflow:hidden">
    <div style="background:linear-gradient(135deg,#279394,#1f7778);padding:18px;color:#fff;font-weight:900;font-size:18px;letter-spacing:.5px">
      Nuova richiesta dal sito — Studio Dentistico Dr. Umberto Fattorelli
    </div>
    <div style="padding:20px 22px;color:#103538">
      <p style="margin:0 0 8px"><strong>Nome:</strong> '.esc($name).'</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> '.esc($email).'</p>
      <p style="margin:0 0 8px"><strong>Telefono:</strong> '.esc($phone ?: '—').'</p>
      <hr style="border:none;border-top:1px solid #edf5f6;margin:14px 0">
      <p style="margin:0 0 6px"><strong>Messaggio:</strong></p>
      <p style="white-space:pre-wrap;margin:0">'.esc($message).'</p>
    </div>
    <div style="padding:14px 22px;color:#5c7679;font-size:12px;background:#f9fcfd">
      Email generata automaticamente dalla landing — '.date('Y-m-d H:i:s').'
    </div>
  </div>
</div>';

// Invia mail
try{
  $mail = new PHPMailer(true);
  // Config SMTP
  $mail->isSMTP();
  $mail->Host = SMTP_HOST;
  $mail->Port = SMTP_PORT;
  $mail->SMTPAuth = true;
  $mail->Username = SMTP_USER;
  $mail->Password = SMTP_PASS;
  $mail->SMTPSecure = SMTP_SECURE;

  // Mittente/destinatari
  $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
  $mail->addAddress(MAIL_TO);
  $mail->addReplyTo($email, $name);

  // Contenuto
  $mail->isHTML(true);
  $mail->Subject = 'Nuova richiesta di contatto — ' . $name;
  $mail->Body    = $html;
  $mail->AltBody = "Nome: $name\nEmail: $email\nTelefono: ".($phone?:'—')."\n\nMessaggio:\n$message\n";

  $mail->send();
  echo json_encode(['ok'=>true], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false, 'error'=>'Invio fallito: '.$mail->ErrorInfo], JSON_UNESCAPED_UNICODE);
}
