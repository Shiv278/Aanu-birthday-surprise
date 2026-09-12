import { motion } from 'framer-motion';

const particles = [
  { x: '8%', y: '18%', size: 5, delay: 0.1 },
  { x: '18%', y: '72%', size: 8, delay: 0.8 },
  { x: '31%', y: '28%', size: 4, delay: 1.4 },
  { x: '48%', y: '82%', size: 6, delay: 0.4 },
  { x: '67%', y: '16%', size: 5, delay: 1.1 },
  { x: '82%', y: '54%', size: 9, delay: 0.2 },
  { x: '92%', y: '24%', size: 4, delay: 1.8 },
];

export default function FloatingParticles() {
  return (
    <div className="particles">
      {particles.map((particle) => (
        <motion.span
          className="particle"
          key={`${particle.x}-${particle.y}`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [-8, 10, -8], opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 4.8,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
