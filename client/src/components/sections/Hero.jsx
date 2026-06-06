import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMapPin, FiMail } from 'react-icons/fi';
import TypewriterText from '../shared/TypewriterText.jsx';
import myImage from '../../assets/my-image.png';

const roles = ['MERN Stack Developer', 'WordPress Developer', 'Shopify Developer'];

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

      {/* Gradient orbs — slow float animation */}
      <motion.div
        animate={{ y: [0, -24, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '15%', right: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)', pointerEvents: 'none', opacity: 0.8 }}
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ position: 'absolute', bottom: '20%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>

          {/* Left — Content */}
          <div style={{ maxWidth: '700px' }}>
            {/* Mobile avatar — circular photo shown only below 1024px, above headline */}
            <motion.div
              className="hero-avatar-mobile"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'none', justifyContent: 'center', marginBottom: '1.75rem' }}
            >
              <div style={{
                width: '130px', height: '130px', borderRadius: '50%',
                overflow: 'hidden', border: '3px solid var(--accent-border)',
                boxShadow: '0 0 0 6px var(--accent-bg), var(--shadow-lg)',
                flexShrink: 0,
              }}>
                <img src={myImage} alt="Muhammad Hamza Temuri" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
            </motion.div>

            {/* Availability */}
            {profile?.isAvailable !== false && (
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
            )}

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
              className="hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
            >
              <button className="btn-primary" onClick={() => handleScroll('contact')} style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                Hire Me <FiArrowRight size={16} />
              </button>
              <button className="btn-secondary" onClick={() => handleScroll('projects')} style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                View Projects
              </button>
              <a href={profile?.resume?.url || '/resume.pdf'} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                <FiDownload size={16} /> Resume
              </a>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'none' }}
            className="hero-right"
          >
            <div style={{ position: 'relative' }}>
              {/* Accent glow behind image */}
              <div style={{ position: 'absolute', inset: '-12px', borderRadius: '32px', background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)', opacity: 0.15, zIndex: 0 }} />

              {/* Photo frame */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: '320px',
                height: '400px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid var(--accent-border)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px var(--border-default)',
              }}>
                <img
                  src={myImage}
                  alt="Muhammad Hamza Temuri"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                />
              </div>

              {/* Floating badge */}
              <div style={{
                position: 'absolute',
                bottom: '-1rem',
                left: '-1rem',
                zIndex: 2,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '0.6rem 1rem',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <div className="pulse-dot" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22c55e', whiteSpace: 'nowrap' }}>Open to Work</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <style>{`
        @media(min-width:1024px) { .hero-right { display: block !important; } }
        @media(max-width:767px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .hero-btns { flex-wrap: nowrap !important; gap: 0.5rem !important; }
          .hero-btns .btn-primary, .hero-btns .btn-secondary, .hero-btns .btn-ghost {
            padding: 0.7rem 1rem !important; font-size: 0.8125rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
