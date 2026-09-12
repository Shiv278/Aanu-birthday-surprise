import { motion } from 'framer-motion';

export default function PhotoModal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <motion.dialog
        className="photo-modal"
        open
        aria-label={title}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
        {children}
      </motion.dialog>
    </div>
  );
}
