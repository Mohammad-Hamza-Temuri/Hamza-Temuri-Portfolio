import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import { staggerChild } from '../../utils/animations.js';
import api from '../../services/api.js';

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} size={14} style={{ color: i < rating ? '#f59e0b' : 'var(--border-default)', fill: i < rating ? '#f59e0b' : 'none' }} />
    ))}
  </div>
);

const Testimonials = () => {
  const { data } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (!data?.length) return null;

  return (
    <section className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Testimonials"
          title="What Clients Say"
          subtitle="Real feedback from people I've had the pleasure of working with."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {data.map((t, i) => (
            <motion.div
              key={t._id}
              {...staggerChild(i)}
              className="card"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <Stars rating={t.rating || 5} />

              <blockquote style={{
                fontSize: '0.9375rem', color: 'var(--text-secondary)',
                lineHeight: 1.75, fontStyle: 'italic', flex: 1, margin: 0,
              }}>
                "{t.content}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--accent-bg)', border: '2px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: 'var(--accent)', fontSize: '0.875rem', overflow: 'hidden',
                }}>
                  {t.avatar?.url
                    ? <img src={t.avatar.url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : (t.name?.[0] ?? '?')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.position} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
