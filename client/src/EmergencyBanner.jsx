// EmergencyBanner.jsx
export default function EmergencyBanner(){
  return (
    <div className="banner" role="status" aria-live="polite">
      <span className="badge-24">24/24</span>
      <span className="banner-text">ASSISTENZA DENTISTICA</span>
      <a className="banner-call" href="tel:05231657502" aria-label="Chiama lo studio 0523 1657502">
        Chiama 0523 1657502
      </a>
    </div>
  );
}
