import React from 'react';
import './WelcomeSection.css';

function WelcomeSection() {
  return (
    <section className="welcome">
      <div className="welcome-content centered">
        <div className="welcome-text">
          <h2 className="hero-title">Il sorriso che meriti</h2>
          
          <div className="slogan-container">
            <p className="slogan-text">La tua salute dentale</p>
            <p className="slogan-highlight">nelle mani giuste</p>
          </div>
        </div>
      </div>

      <div className="philosophy-container">
        <p className="philosophy-text">
          La mia attività di Medico Odontoiatra ho deciso di svilupparla e farla crescere 
          secondo il mio acronimo <strong>P.E.P.</strong> = <strong>Professionalità</strong>, <strong>Empatia</strong> e <strong>Preparazione</strong>, a mio 
          parere regole Auree per poter offrire ai miei Pazienti un Trattamento adeguato 
          in massima sicurezza
        </p>
        
        <div className="services-container">
          <p className="services-title">Lo Studio copre tutte le branche dell'Odontoiatria quali:</p>
          <ul className="services-list">
            <li>odontoiatria generica</li>
            <li>odontoiatria estetica</li>
            <li>odontoiatria conservativa ed endodonzia</li>
            <li>Chirurgia Orale e Chirurgia Implantare</li>
            <li>Parodontologia, Igiene e Profilassi</li>
            <li>Protesi Dentaria</li>
            <li>Ortodonzia</li>
          </ul>
        </div>
      </div>
      <div className="pep-cards-container">
        <div className="pep-card">
          <span className="pep-letter">Professionalità</span>
        </div>
        
        <div className="pep-card">
          <span className="pep-letter">Empatia</span>
        </div>
        
        <div className="pep-card">
          <span className="pep-letter">Preparazione</span>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;