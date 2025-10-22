const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configura il transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o SMTP del provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email da inviare
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // riceve il dottore
      subject: `Nuovo messaggio da ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Messaggio inviato con successo!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Errore nell’invio del messaggio' });
  }
});

module.exports = router;
