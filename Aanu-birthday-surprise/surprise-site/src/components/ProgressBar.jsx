export default function ProgressBar({ value = 0, label = 'Progress' }) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress" aria-label={`${label}: ${safeValue}%`}>
      <div className="progress-label">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
