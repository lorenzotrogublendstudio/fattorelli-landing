// App.jsx
import React, { useEffect, useState } from "react";
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import EmergencyBanner from './EmergencyBanner';
import ContactForm from './ContactForm';
import Map from './Map';
import Reviews from './Reviews';              // 👈
import Footer from './Footer';
import BookingModal from './BookingModal';    // 👈

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // APRI SEMPRE ALLA PRIMA VISITA
    const timer = setTimeout(() => setShowModal(true), 400);
    return () => clearTimeout(timer);

    // --- Se preferisci solo una volta per sessione:
    // const seen = sessionStorage.getItem("seenBookingModal");
    // if (!seen) {
    //   const t = setTimeout(() => setShowModal(true), 400);
    //   sessionStorage.setItem("seenBookingModal", "1");
    //   return () => clearTimeout(t);
    // }
  }, []);

  return (
    <div className="App">
      <Header />
      <WelcomeSection />
      <EmergencyBanner />
      <ContactForm />
      <Map />
      {/* Passo l'opener al componente Reviews */}
      <Reviews onOpenModal={() => setShowModal(true)} />   {/* 👈 */}
      <Footer />

      <BookingModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
