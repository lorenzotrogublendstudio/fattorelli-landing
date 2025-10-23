import React, { useEffect, useRef, useState } from "react";
import "./BookingModal.css";

const PHONE = "05231657502";

export default function BookingModal({ open, onClose }) {
  
  const dialogRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  // detect mobile on resize
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // lock body scroll + focus
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus
    const el = dialogRef.current?.querySelector("[data-autofocus]") || dialogRef.current;
    el && el.focus();

    // esc close
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
     const CONTACT_URL = import.meta.env.DEV
  ? '/api/contact'                                  // DEV: proxy Vite → Node (o cambia a '/contact.php' se proxate il PHP)
  : `${import.meta.env.BASE_URL}contact.php`; 
    e.preventDefault();
    try {
      setSending(true);
      setMsg(null);
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.errors?.[0]?.msg || "Errore invio");
      setMsg({ type: "ok", text: "Richiesta inviata! Ti ricontatteremo a breve." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setMsg({ type: "err", text: err.message || "Errore imprevisto" });
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div className="bm-overlay" onClick={onClose} aria-hidden="true">
      <div
        className={`bm-modal ${isMobile ? "bm-mobile" : "bm-desktop"}`}
        role="dialog"
        aria-modal="true"
        aria-label={isMobile ? "Chiama ora lo studio" : "Prenota una visita"}
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
        tabIndex={-1}
      >
        <button className="bm-close" onClick={onClose} aria-label="Chiudi modale">×</button>

        {/* MOBILE: CTA CHIAMA ORA */}
        {isMobile ? (
          <div className="bm-call">
            <div className="bm-badge">24/24</div>
            <h3 className="bm-title">Emergenza?<br />Chiama ora</h3>
            <a className="bm-callbtn" href={`tel:${PHONE}`}>CHIAMA {PHONE}</a>
            <p className="bm-note">Rispondiamo rapidamente e fissiamo un appuntamento.</p>
          </div>
        ) : (
          /* DESKTOP: FORM PRENOTAZIONE */
          <div className="bm-book">
            <h3 className="bm-title">Prenota una visita</h3>
            <p className="bm-sub">Compila il form: ti ricontattiamo in giornata.</p>

            <form onSubmit={onSubmit} className="bm-form">
              <div className="bm-row2">
                <input data-autofocus name="name" placeholder="Nome" value={form.name} onChange={onChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
              </div>
              <input name="phone" placeholder="Telefono (opzionale)" value={form.phone} onChange={onChange} />
              <textarea name="message" rows="4" placeholder="Messaggio" value={form.message} onChange={onChange} required />
              <button type="submit" disabled={sending} className={sending ? "is-loading" : ""}>
                {sending ? "Invio…" : "Invia richiesta"}
              </button>
              {msg && (
                <p className={`bm-msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
