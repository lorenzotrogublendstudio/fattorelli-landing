import React from 'react';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import EmergencyBanner from './EmergencyBanner';
import ContactForm from './ContactForm';
import Map from './Map';
import Reviews from './Reviews';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header con nome studio */}
      <Header />

      {/* Sezione di benvenuto con P.E.P. */}
      <WelcomeSection />

      {/* Banner emergenza 24/24 */}
      <EmergencyBanner />

      {/* Form di contatto */}
      <ContactForm />

      {/* Mappa interattiva */}
      <Map />

      {/* Recensioni pazienti */}
      <Reviews />

      {/* Footer con contatti */}
      <Footer />
    </div>
  );
}

export default App;
