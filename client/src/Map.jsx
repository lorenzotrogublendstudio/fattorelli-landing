import "./Map.css";

export default function Map() {
  const address = "Via Rossi Antondomenico, 11, 29122 Piacenza PC";
  const query = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section className="map-section">
      <div className="container">
        <h2 className="h2">Dove trovarci</h2>
        <p className="lead">
          Vieni a trovarci nel nostro studio a <strong>Piacenza</strong>.
        </p>

        <div className="map-wrapper">
          <iframe
            title="Studio Dentistico Dr. Fattorelli - Mappa"
            src={mapUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p className="map-link">
          📍{" "}
          <a
            href={`https://www.google.com/maps?q=${query}`}
            target="_blank"
            rel="noreferrer"
          >
            Apri su Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}
