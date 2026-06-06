import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useThemeStore } from '../../store/themeStore.js';
import { navLinks } from '../../constants/navigation.js';
import { RESUME_URL } from '../../services/profileService.js';

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const resumeUrl = RESUME_URL;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const sectionSelector = (href) => href.replace(/^\//, '');

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate(href.startsWith('/') ? href : `/${href}`);
      return;
    }
    const el = document.querySelector(sectionSelector(href));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', height: '70px', gap: '2rem' }}>
          {/* Logo */}
          <Link to="/" style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', flexShrink: 0 }}>
            <span style={{ color: 'var(--accent)' }}>H</span>amza
            <span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: '0.25rem', flex: 1, justifyContent: 'center' }} className="hidden-mobile">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace(/^\/?#/, '');
              return (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--accent-bg)' : 'transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-muted)'; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', flexShrink: 0 }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{ width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-muted)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0 }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
              </motion.div>
            </button>

            {/* Resume */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost hidden-mobile"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.8125rem' }}
            >
              <FiDownload size={13} /> Resume
            </a>

            {/* Hire Me */}
            <a
              href="/#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/#contact'); }}
              className="btn-primary hidden-mobile"
              style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
            >
              Hire Me
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile"
              style={{ width: '38px', height: '38px', borderRadius: '8px', display: 'none', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-muted)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', cursor: 'pointer' }}
              aria-label="Mobile menu"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'var(--bg-elevated)',
              borderBottom: '1px solid var(--border-default)',
              padding: '1rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-bg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}>
                <FiDownload size={14} /> Resume
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}>
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
