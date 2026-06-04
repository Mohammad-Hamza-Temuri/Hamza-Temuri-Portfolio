import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMapPin, FiMail } from 'react-icons/fi';
import TypewriterText from '../shared/TypewriterText.jsx';

const roles = ['Full Stack Developer', 'MERN Stack Expert', 'WordPress Developer', 'Shopify Developer'];

const floatAnim = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const Hero = ({ profile }) => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '90px',
        paddingBottom: '4rem',
      }}
    >
      {/* Background grid dots */}
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: '15%', right: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)', pointerEvents: 'none', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>
          {/* Left — Content */}
          <div style={{ maxWidth: '700px' }}>
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.35rem 0.9rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '9999px' }}>
                <div className="pulse-dot" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22c55e' }}>
                  Available for Freelance Projects
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.25rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: '0.75rem' }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Hamza Temuri</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', fontWeight: 700, marginBottom: '1.5rem', minHeight: '2.5rem', color: 'var(--text-primary)' }}
            >
              <TypewriterText phrases={roles} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '2rem' }}
            >
              WordPress & Shopify Developer with <strong style={{ color: 'var(--text-primary)' }}>3+ years of professional experience</strong> building
              custom, high-performance websites for international agencies and businesses.
              Currently working with agencies in Dubai & Canada.
            </motion.p>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <FiMapPin size={14} style={{ color: 'var(--accent)' }} /> Karachi, Pakistan
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <FiMail size={14} style={{ color: 'var(--accent)' }} /> hamzatemuri2001@gmail.com
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}
            >
              <button className="btn-primary" onClick={() => handleScroll('contact')} style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                Hire Me <FiArrowRight size={16} />
              </button>
              <button className="btn-secondary" onClick={() => handleScroll('projects')} style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                View Projects
              </button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                <FiDownload size={16} /> Resume
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}
            >
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Delivered' },
                { value: '5', label: 'Companies Worked' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'none' }}
            className="hero-right"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '300px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Profile photo placeholder */}
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>
                HT
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Muhammad Hamza Temuri</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Full Stack Developer</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['WordPress', 'Shopify', 'MERN', 'SEO'].map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(min-width:1024px) { .hero-right { display: block !important; } }`}</style>
    </section>
  );
};

export default Hero;
