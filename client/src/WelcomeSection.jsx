import React from 'react';
import './WelcomeSection.css';

function WelcomeSection() {
  return (
    <section className="welcome">
      <div className="welcome-content">
        <div className="welcome-text">
          <h2 className="hero-title">Benvenuti tra</h2>

          <ul className="chips">
            <li className="chip">Professionalità</li>
            <li className="chip">Empatia</li>
            <li className="chip">Preparazione</li>
          </ul>

          <p>
            La mia attività di Medico Odontoiatra ho deciso di svilupparla e farla crescere secondo il mio acronimo <strong>P.E.P.</strong> = Professionalità, Empatia e Preparazione, o mie pare regole Auree per poter offrire ai miei Pazienti un Trattamento adeguato in massima sicurezza.
          </p>
        </div>

        <div className="welcome-photo">
          <img
            src="/media/fattorelli.jpg"
            alt="Dr. Umberto Fattorelli"
            className="foto-fattorelli"
          />
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
