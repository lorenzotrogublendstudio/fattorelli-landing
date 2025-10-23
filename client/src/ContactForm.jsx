import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', company: '' });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');

  // In dev puoi impostare VITE_CONTACT_URL, altrimenti usa contact.php accanto all’index.html
  const CONTACT_URL = import.meta.env.DEV
  ? '/api/contact'                                  // DEV: proxy Vite → Node (o cambia a '/contact.php' se proxate il PHP)
  : `${import.meta.env.BASE_URL}contact.php`;       // PROD: PHP su SiteGround // usa il proxy, niente CORS
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setOk(false);
    setError('');

    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company, // honeypot
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || (data?.errors?.join(', ') || `HTTP ${res.status}`));
      }

      setOk(true);
      setForm({ name: '', email: '', phone: '', message: '', company: '' });
    } catch (err) {
      setError(err.message || 'Errore di invio');
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot antispam */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={onChange}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', opacity: 0 }}
      />

      <div className="field">
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" value={form.name} onChange={onChange} required />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={form.email} onChange={onChange} required />
      </div>

      <div className="field">
        <label htmlFor="phone">Telefono</label>
        <input id="phone" name="phone" value={form.phone} onChange={onChange} />
      </div>

      <div className="field">
        <label htmlFor="message">Messaggio</label>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={onChange} required />
      </div>

      <button className="btn" type="submit" disabled={sending}>
        {sending ? 'Invio…' : 'Invia'}
      </button>

      {ok && <p className="form-ok">Messaggio inviato correttamente.</p>}
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};

export default ContactForm;