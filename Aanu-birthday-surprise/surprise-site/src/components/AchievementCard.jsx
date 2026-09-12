export default function AchievementCard({ badge = '★', title, description }) {
  return (
    <article className="achievement-card">
      <span className="achievement-badge">{badge}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
