import React, { useState } from 'react';
import './ContactForm.css';
const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Qui metti la funzione handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('../../contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message, phone: '', company: '' }) // {name,email,phone,message, company: "" (honeypot vuoto)}
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
         <input
        name="company"
        autoComplete="off"
        tabIndex="-1"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
        onChange={() => {}}
      />
      <div>
        <label>Nome</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Messaggio</label>
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
        />
      </div>

      <button type="submit">Invia</button>
    </form>
  );
};

export default ContactForm;
