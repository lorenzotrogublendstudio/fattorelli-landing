import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <h3>Studio Dentistico <br />Dr. Umberto Fattorelli</h3>
          <p>Via Rossi Antondomenico, 11<br />29122 Piacenza (PC)</p>
          <p>
            Email: <a href="mailto:info@studiofattorelli.it">info@studiofattorelli.it</a><br />
            Tel: <a href="tel:05231657502">0523 1657502</a>
          </p>
          <p>P.IVA 01857070338</p>
        </div>

        <div className="footer-right">
          <h4>Orari</h4>
          <ul>
            <li>Lunedì - Venerdì: 9:00 - 19:00</li>
            <li>Sabato: 9:00 - 13:00</li>
            <li>Domenica: Chiuso</li>
          </ul>

          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="social fb"></a>
            <a href="#" aria-label="Instagram" className="social ig"></a>
            <a href="#" aria-label="Whatsapp" className="social wa"></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Studio Dentistico Dr. Umberto Fattorelli — Tutti i diritti riservati
      </div>
    </footer>
  );
}
