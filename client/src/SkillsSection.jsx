import React from 'react';
import './SkillsSection.css';

function SkillsSection() {
     // Costruisce l'URL corretto sia per ambiente locale che per GitHub Pages
  const imgUrl = `${import.meta.env.BASE_URL}media/attrezzature-e-strumenti-dentali-nell-ufficio-del-dentista-close-up-di-strumenti.jpg`;
  
  return (
    <section className="skills-section">
      <div className="container">
        <h2 className="section-title">Esperienza e Professionalità</h2>
        
        <div className="skills-row">
          {/* Colonna sinistra - Grid di 4 card */}
          <div className="skills-column">
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Esperienza Pluriennale</h3>
                <p>Oltre 20 anni di esperienza nella cura dei pazienti e nelle più avanzate tecniche odontoiatriche.</p>
              </div>
              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-microscope"></i>
                </div>
                <h3>Tecnologie Avanzate</h3>
                <p>Utilizzo delle più moderne attrezzature per garantire diagnosi precise e trattamenti meno invasivi.</p>
              </div>
              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <h3>Cure Personalizzate</h3>
                <p>Ogni paziente riceve un piano di trattamento studiato sulle proprie specifiche esigenze.</p>
              </div>
              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Formazione Continua</h3>
                <p>Aggiornamento costante sulle più recenti tecniche e materiali per offrire cure all'avanguardia.</p>
              </div>
            </div>
          </div>
          
          {/* Colonna destra - Immagine dello studio */}
          <div className="image-column">
            <div className="studio-image-container">
              <img 
                src={imgUrl}
                alt="Studio dentistico Dott. Fattorelli" 
                className="studio-image"
              />
              <div className="image-overlay">
                <p>Tecnologie all'avanguardia per il vostro benessere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;