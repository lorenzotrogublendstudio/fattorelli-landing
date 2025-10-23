import React from 'react';
import './Header.css';
import logo from '../public/media/logo-blu.svg'; // usa il tuo file SVG

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* LOGO */}
        <a href="/" className="brand" aria-label="Studio Dentistico Dr. Umberto Fattorelli">
          <img src={logo} alt="Studio Fattorelli" className="brand-logo" />
        </a>

        {/* INDIRIZZO */}
        <address className="header-address">
          <span>Via Rossi Antondomenico, 11</span>
          <span>29122 Piacenza (PC)</span>
        </address>
      </div>
    </header>
  );
}
