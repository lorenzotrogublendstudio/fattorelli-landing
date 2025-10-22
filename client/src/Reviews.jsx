import './Reviews.css';
const Reviews = () => {
  const reviews = [
    { name: "Giulia", text: "Esperienza fantastica, il dottore è molto professionale!" },
    { name: "Marco", text: "Studio accogliente e servizio impeccabile." },
    { name: "Sara", text: "Mi sono sentita subito a mio agio, consigliatissimo!" },
  ];

  return (
    <section style={{ padding: '2rem', background: '#f9f9f9' }}>
      <h3>Cosa dicono i nostri pazienti</h3>
      {reviews.map((r, i) => (
        <blockquote key={i} style={{ margin: '1rem 0' }}>
          <p>"{r.text}"</p>
          <footer>- {r.name}</footer>
        </blockquote>
      ))}
    </section>
  );
};

export default Reviews;
