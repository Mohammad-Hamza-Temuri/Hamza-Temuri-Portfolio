import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations.js';

const SectionHeader = ({ label, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';
  return (
    <motion.div
      {...fadeUp}
      style={{ textAlign: isCenter ? 'center' : 'left', marginBottom: '3.5rem' }}
    >
      {label && (
        <div style={{ display: 'flex', justifyContent: isCenter ? 'center' : 'flex-start', marginBottom: '1rem' }}>
          <span className="section-label">{label}</span>
        </div>
      )}
      <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: isCenter ? '560px' : '100%', margin: isCenter ? '0 auto' : '0', lineHeight: 1.7 }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
