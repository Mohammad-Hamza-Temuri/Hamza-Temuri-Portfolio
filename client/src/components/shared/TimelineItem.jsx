import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { staggerChild } from '../../utils/animations.js';

const formatDate = (date) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const typeLabel = { remote: 'Remote', hybrid: 'Hybrid', onsite: 'Onsite' };
const typeColor = { remote: '#22c55e', hybrid: '#f59e0b', onsite: '#6366f1' };

const TimelineItem = ({ experience, index, isLast }) => {
  return (
    <motion.div
      {...staggerChild(index)}
      style={{ position: 'relative', paddingLeft: '3.5rem', paddingBottom: isLast ? 0 : '2.5rem' }}
    >
      {/* Dot */}
      <div style={{
        position: 'absolute', left: 0, top: '0.2rem',
        width: '40px', height: '40px', borderRadius: '50%',
        background: 'var(--accent-bg)', border: '2px solid var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {experience.position}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 600 }}>
              {experience.company}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiCalendar size={12} />
              {formatDate(experience.startDate)} – {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'var(--bg-muted)', color: 'var(--text-muted)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <FiMapPin size={10} /> {experience.location}
              </span>
              {experience.type && (
                <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: `${typeColor[experience.type]}18`, color: typeColor[experience.type], border: `1px solid ${typeColor[experience.type]}40` }}>
                  {typeLabel[experience.type]}
                </span>
              )}
            </div>
          </div>
        </div>
        {experience.responsibilities?.length > 0 && (
          <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {experience.responsibilities.map((r, i) => (
              <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem;
