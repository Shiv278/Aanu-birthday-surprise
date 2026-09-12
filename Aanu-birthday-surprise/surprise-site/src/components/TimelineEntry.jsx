export default function TimelineEntry({ date, title, children }) {
  return (
    <article className="timeline-entry">
      <time>{date}</time>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
