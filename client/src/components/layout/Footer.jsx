import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { navLinks } from '../../constants/navigation.js';

const services = ['MERN Stack Development', 'WordPress Development', 'Shopify Development', 'API Development', 'SEO Optimization', 'Performance Optimization'];

const Footer = ({ profile }) => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-default)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--accent)' }}>H</span>amza<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '240px' }}>
              Full Stack Developer building high-performance web solutions for international clients.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {profile?.social?.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-muted)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', transition: 'all 0.2s ease' }}>
                  <FiGithub size={16} />
                </a>
              )}
              {profile?.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-muted)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', transition: 'all 0.2s ease' }}>
                  <FiLinkedin size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="mailto:hamzatemuri2001@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <FiMail size={14} /> hamzatemuri2001@gmail.com
              </a>
              <a href="tel:+923368328661" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <FiPhone size={14} /> +92 336 8328661
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <FiMapPin size={14} /> Karachi, Pakistan
              </span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem', marginTop: '0.5rem', width: 'fit-content' }}>
                <FiDownload size={13} /> Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            © {year} Muhammad Hamza Temuri. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Built with React.js · Node.js · MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
