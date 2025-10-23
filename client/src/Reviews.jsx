import React from "react";
import "./Reviews.css";
import "./SliderOverride.css"; // se già usato altrove puoi rimuovere questa importazione

const GOOGLE_REVIEWS = [
  {
    name: "Michela Gobbi",
    rating: 5,
    time: "1 mese fa",
    text:
      "Studio molto accogliente. Il dottore è una persona davvero professionale, molto gentile e ti mette subito a tuo agio. Consigliatissimo!",
  },
  {
    name: "Cinzia Bogliaccino",
    rating: 5,
    time: "6 mesi fa",
    text:
      "Consiglio vivamente lo studio Fattorelli. Il dottore è molto attento al paziente, scrupoloso e preciso. Ambiente pulito con strumenti all’avanguardia.",
  },
  {
    name: "Sara Piga",
    rating: 5,
    time: "7 mesi fa",
    text:
      "Studio dentistico eccellente. Il dottore è gentile e rassicurante, visita molto accurata e molta attenzione per il comfort del paziente.",
  },
  {
    name: "Alessandra Filippi",
    rating: 5,
    time: "7 mesi fa",
    text:
      "Professionalità, gentilezza e grande disponibilità. Mi sono sentita subito in ottime mani e il risultato è stato perfetto. Grazie di cuore!",
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
  return (
    <section className="reviews section" id="recensioni">
      <div className="container">
        <div className="reviews-card">
          <div className="reviews-header">
            <div>
              <h2 className="reviews-title">Cosa dicono i nostri pazienti</h2>
              <p className="reviews-lead">
                Alcune recensioni reali raccolte su <strong>Google</strong>.
              </p>
            </div>
            <div className="google-badge" aria-label="Valutazione Google">
              <div className="badge-logo" aria-hidden="true">
                <span className="g">G</span>
              </div>
              <div>
                <div className="badge-score">
                  5.0 <Stars value={5} />
                </div>
                <span className="badge-caption">Recensioni verificate</span>
              </div>
            </div>
          </div>

          <div className="reviews-slider">
            <div className="reviews-track">
              {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, idx) => (
                <article className="review-card" key={`rv-${idx}`}>
                  <header className="review-head">
                    <div className="rv-id">
                      <p className="rv-name">{review.name}</p>
                      <span className="rv-time">{review.time}</span>
                    </div>
                    <Stars value={review.rating} />
                  </header>
                  <p className="review-text">“{review.text}”</p>
                </article>
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </section>  
    );
}