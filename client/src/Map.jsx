import './Map.css';
const Map = () => (
  <div style={{ textAlign: 'center', margin: '2rem 0' }}>
    <h3>Dove trovarci</h3>
    <iframe
      title="Mappa Studio Dentistico"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...etc"
      width="100%"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
);

export default Map;
