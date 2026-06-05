import { motion } from 'framer-motion';
import AnimatedCounter from '../shared/AnimatedCounter.jsx';

const stats = [
  { to: 3, suffix: '+', label: 'Years of Experience' },
  { to: 50, suffix: '+', label: 'Projects Completed' },
  { to: 5, suffix: '', label: 'Companies Worked With' },
  { to: 20, suffix: '+', label: 'Technologies Used' },
  { to: 100, suffix: '%', label: 'Client Satisfaction' },
];

const StatsBar = () => (
  <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)', padding: '3rem 0' }}>
    <div className="container-custom">
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <AnimatedCounter to={s.to} suffix={s.suffix} label={s.label} />
          </motion.div>
        ))}
      </div>
    </div>
    <style>{`@media(max-width:767px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 1.5rem !important; } }`}</style>
  </section>
);

export default StatsBar;
