import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import api from '../../services/api.js';

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} size={14} style={{ color: i < rating ? '#f59e0b' : 'var(--border-default)', fill: i < rating ? '#f59e0b' : 'none' }} />
    ))}
  </div>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const { data } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (!data?.length) return null;

  const prev = () => { setDir(-1); setIndex((i) => (i - 1 + data.length) % data.length); };
  const next = () => { setDir(1); setIndex((i) => (i + 1) % data.length); };
  const t = data[index];

  return (
    <section className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-custom">
        <SectionHeader label="Testimonials" title="What Clients Say" subtitle="Real feedback from people I've had the pleasure of working with." />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.35 }}
              className="card"
              style={{ padding: '2.5rem', textAlign: 'center' }}
            >
              <Stars rating={t.rating || 5} />
              <blockquote style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '1.5rem 0', fontStyle: 'italic' }}>
                "{t.content}"
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent)', fontSize: '0.875rem', overflow: 'hidden' }}>
                  {t.avatar?.url ? <img src={t.avatar.url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (t.name?.[0] ?? '?')}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.position} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button onClick={prev} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s ease' }}>
              <FiChevronLeft size={18} />
            </button>
            {data.map((t, i) => (
              <button key={t._id} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === index ? 'var(--accent)' : 'var(--border-strong)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s ease' }} />
            ))}
            <button onClick={next} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s ease' }}>
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
