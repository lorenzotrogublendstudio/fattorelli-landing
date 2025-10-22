import React from "react";
import "./Reviews.css";

const DATA = [
  {
    name: "Giulia",
    rating: 5,
    text:
      "Studio accogliente e servizio impeccabile! Mi hanno seguita con pazienza e chiarezza in ogni fase.",
    time: "2 settimane fa",
  },
  {
    name: "Marco",
    rating: 5,
    text:
      "Professionalità altissima e zero ansia: spiegazioni precise e mano delicatissima. Consigliatissimo.",
    time: "1 mese fa",
  },
  {
    name: "Sara",
    rating: 5,
    text:
      "Mi sono sentita subito a mio agio. Ambiente pulito e moderno, personale super gentile.",
    time: "3 mesi fa",
  },
];

function Stars({ value = 5 }) {
  const full = Math.round(value);
  return (
    <div className="rv-stars" aria-label={`${value} su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`rv-star ${i < full ? "on" : ""}`}
          aria-hidden="true"
        >
          <path d="M10 1.6l2.47 5.02 5.51.8-3.99 3.88.94 5.46L10 14.98 5.07 16.76l.94-5.46L2.02 7.42l5.51-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ onOpenModal }) {
  const reviews = [
    {
      name: "Giulia P.",
      text: "Il Dott. Fattorelli è sempre gentile e attento, mi ha messo a mio agio fin dal primo incontro. Studio pulito e accogliente!",
    },
    {
      name: "Marco R.",
      text: "Professionalità e precisione impeccabili. Finalmente uno studio dove senti che la cura del paziente viene prima di tutto.",
    },
    {
      name: "Elisa D.",
      text: "Ho risolto un problema che altri dentisti non riuscivano a trattare. Assolutamente consigliato!",
    },
  ];

  return (
    <section className="reviews section" id="recensioni">
      <div className="container">
        <h2 className="h2 reveal">Cosa dicono i nostri pazienti</h2>
        <p className="lead reveal">
          Le opinioni di chi si è affidato al nostro studio.
        </p>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="review-card reveal"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <p className="review-text">“{r.text}”</p>
              <p className="review-name">— {r.name}</p>
            </div>
          ))}
        </div>

        <div className="reviews-cta">
          <button
            type="button"
            className="btn"
            onClick={onOpenModal}   // 👈 apre la modale
          >
            Prenota una visita
          </button>
        </div>
      </div>
    </section>
  );
}