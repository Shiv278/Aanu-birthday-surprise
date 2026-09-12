export default function PhotoCard({ image, variant = 0, onClick }) {
  return (
    <button className={`photo-card photo-card--${variant}`} type="button" onClick={onClick}>
      <span className="photo-card-frame">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </span>
      <span className="photo-card-title">{image.title}</span>
      <span className="photo-card-caption">{image.date}</span>
    </button>
  );
}
