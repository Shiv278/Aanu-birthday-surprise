import { motion } from 'framer-motion';

export default function Button({ children, disabled = false, onClick }) {
  return (
    <motion.button
      className="button"
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ y: 4, scale: 0.965 }}
      animate={disabled ? { scale: [1, 0.98, 1.03], y: [0, 3, -2] } : { scale: 1, y: 0 }}
      transition={{ duration: 0.44, ease: 'easeOut' }}
    >
      <span>{children}</span>
    </motion.button>
  );
}
