import FloatingParticles from './FloatingParticles.jsx';

export default function AnimatedBackground({ isAccelerated = false }) {
  return (
    <div
      className={`animated-background ${isAccelerated ? 'animated-background--rush' : ''}`}
      aria-hidden="true"
    >
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="star-field" />
      <div className="sparkle-field">
        <span />
        <span />
        <span />
      </div>
      <div className="ambient-hearts">
        <span>♥</span>
        <span>♥</span>
      </div>
      <div className="ribbon ribbon-left" />
      <div className="ribbon ribbon-right" />
      <FloatingParticles />
    </div>
  );
}
