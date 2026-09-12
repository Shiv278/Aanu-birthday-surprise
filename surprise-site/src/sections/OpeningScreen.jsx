import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import { openingCopy } from '../data/siteContent.js';

const lineVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 2.85 + index * 0.34, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function OpeningScreen({ isEntering = false, onEnter }) {
  return (
    <motion.div
      className="opening-screen"
      animate={
        isEntering
          ? { opacity: 0, scale: 1.08, filter: 'blur(10px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        className="game-chip"
        initial={{ opacity: 0, y: -12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.28, duration: 0.6 }}
      >
        <span className="chip-dot" />
        Friendship unlocked on {openingCopy.eyebrow}
      </motion.div>

      <motion.div
        className="opening-card"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.08, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="card-pin" aria-hidden="true" />
        <span className="heart-float heart-one" aria-hidden="true">
          ♥
        </span>
        <span className="heart-float heart-two" aria-hidden="true">
          ♥
        </span>

        <motion.p
          className="story-title"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.45, duration: 0.85 }}
        >
          {openingCopy.title}
        </motion.p>

        <div className="greeting-stack" aria-label="Hey, Mumfali">
          {openingCopy.greeting.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 1 + index * 0.46,
                duration: 0.82,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="peanut-mascot"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.82, duration: 0.72, ease: 'backOut' }}
        >
          <span className="peanut-glow" />
          <span className="peanut-body">🥜</span>
          <span className="peanut-spark peanut-spark-one">✦</span>
          <span className="peanut-spark peanut-spark-two">✧</span>
        </motion.div>

        <motion.p
          className="intro"
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 2.28, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          {openingCopy.intro}
        </motion.p>

        <div className="opening-lines">
          {openingCopy.lines.map((line, index) => (
            <motion.p key={line} custom={index} variants={lineVariants} initial="hidden" animate="visible">
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="opening-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.85, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button disabled={isEntering} onClick={onEnter}>
          {openingCopy.cta}
        </Button>
      </motion.div>
    </motion.div>
  );
}
