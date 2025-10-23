import "./Map.css";

export default function Map() {
  const offices = [
    {
      city: "Piacenza",
      address: "Via Rossi Antondomenico, 11, 29122 Piacenza PC",
    },
    {
      city: "Pianello Val Tidone",
      address: "Via Roma, 41, 29010 Pianello Val Tidone PC",
    },
  ];

  return (
    <section className="map-section">
      <div className="container">
        <h2 className="h2">Dove trovarci</h2>
        <p className="lead">
          Vieni a trovarci nelle nostre sedi di <strong>Piacenza</strong> e{" "}
          <strong>Pianello Val Tidone</strong>.
        </p>

        <div className="maps-grid">
          {offices.map(({ city, address }) => {
            const query = encodeURIComponent(address);
            const mapUrl = `https://www.google.com/maps?q=${query}&output=embed`;

            return (
              <div className="map-card" key={city}>
                <h3>{city}</h3>
                <p className="map-address">{address}</p>
                <div className="map-wrapper">
                  <iframe
                    title={`Studio Dentistico Dr. Fattorelli - ${city}`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}