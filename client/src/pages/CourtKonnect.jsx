import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowLeft, FiLayers, FiShield, FiUsers, FiBarChart2, FiStar } from 'react-icons/fi';

const techStack = ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'REST API', 'Mongoose'];

const dashboards = [
  { icon: FiUsers, title: 'User Dashboard', color: '#6366f1', desc: 'Court browsing, booking, payment flow, booking history, profile management, and ratings system.' },
  { icon: FiLayers, title: 'Owner Dashboard', color: '#22c55e', desc: 'Court management, availability settings, booking approvals, earnings analytics, and staff management.' },
  { icon: FiShield, title: 'Staff Dashboard', color: '#f59e0b', desc: 'Check-in management, booking verification, court maintenance logging, and daily schedule view.' },
  { icon: FiStar, title: 'Super Admin', color: '#ec4899', desc: 'Platform-wide analytics, owner approvals, dispute resolution, subscription management, and system configuration.' },
];

const features = [
  'Role-based authentication with JWT',
  'Multi-role access control (User, Owner, Staff, Admin)',
  'Full booking lifecycle management',
  'Real-time court availability calendar',
  'Automated notifications system',
  'Ratings & reviews for courts and owners',
  'Analytics dashboards per role',
  'Staff scheduling & management',
  'Secure payment flow integration',
  'Mobile-responsive across all dashboards',
];

const challenges = [
  { title: 'Multi-tenant Architecture', desc: 'Designing a system where multiple court owners each have isolated data while sharing a single database required careful schema design with ownership-based query filtering.' },
  { title: 'Booking Conflict Prevention', desc: 'Preventing double-bookings under concurrent requests required atomic MongoDB operations and time-slot validation on both client and server sides.' },
  { title: 'Role-Based UI Rendering', desc: 'A single React app serving 4 completely different UX contexts required a clean routing architecture with role-aware protected routes and context-based conditional rendering.' },
  { title: 'Real-time Updates', desc: 'Booking status changes needed to reflect across dashboards without page refreshes, solved with polling and state management strategies.' },
];

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const CourtKonnect = () => (
  <>
    <Helmet>
      <title>Court Konnect — SaaS Case Study | Muhammad Hamza Temuri</title>
      <meta name="description" content="A detailed case study of Court Konnect — a production-grade MERN Stack SaaS platform for indoor sports court booking and facility management." />
    </Helmet>

    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/#projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <FiArrowLeft size={14} /> Back to Projects
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge">MERN Stack</span>
            <span className="badge">SaaS</span>
            <span className="badge">Case Study</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }}>
              ★ Featured Project
            </span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.25rem', lineHeight: 1.05 }}>
            Court <span className="gradient-text">Konnect</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.75, marginBottom: '2rem' }}>
            A production-grade MERN Stack SaaS platform designed to streamline indoor sports court booking and facility management — with 4 distinct role-based dashboards.
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            {[{ label: 'Role', value: 'Lead Developer' }, { label: 'Stack', value: 'MERN + JWT' }, { label: 'Type', value: 'SaaS Platform' }, { label: 'Status', value: 'Production-Ready' }].map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{m.label}</div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-custom" style={{ padding: '4rem 1.5rem' }}>
        {/* Business Problem */}
        <FadeUp>
          <section style={{ marginBottom: '4rem', maxWidth: '760px' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>The Problem</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Sports Facilities Had No Scalable Digital Solution</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              <p>Indoor sports courts — badminton, squash, futsal — have traditionally been managed through phone calls, WhatsApp groups, and handwritten logs. This creates double-bookings, revenue leakage, poor staff coordination, and zero visibility into business performance.</p>
              <p>Court owners had no way to track utilization rates, manage multiple staff members, or give customers a self-service booking experience. The existing tools in the market were either too generic, too expensive, or poorly designed for the local market.</p>
            </div>
          </section>
        </FadeUp>

        {/* Solution */}
        <FadeUp delay={0.1}>
          <section style={{ marginBottom: '4rem', padding: '2rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '16px', maxWidth: '760px' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>The Solution</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>A Purpose-Built SaaS Platform with 4 Dashboards</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Court Konnect was designed as a multi-tenant SaaS platform where any sports facility owner can register, list their courts, and start accepting bookings immediately — while having full control over pricing, availability, staff, and analytics through a dedicated dashboard. Users get a clean booking experience, staff get a streamlined management interface, and admins get full platform oversight.
            </p>
          </section>
        </FadeUp>

        {/* Dashboards */}
        <FadeUp delay={0.1}>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '2rem' }}>Dashboard Architecture</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {dashboards.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="card" style={{ padding: '1.75rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${d.color}18`, border: `1px solid ${d.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon size={22} style={{ color: d.color }} />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{d.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeUp>

        {/* Features */}
        <FadeUp delay={0.1}>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Platform Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
              {features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                  <FiCheck size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* Tech Stack */}
        <FadeUp delay={0.1}>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Technology Stack</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {techStack.map((t) => (
                <span key={t} className="tech-tag" style={{ fontSize: '0.9rem', padding: '0.45rem 0.9rem' }}>{t}</span>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* Challenges */}
        <FadeUp delay={0.1}>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Technical Challenges & Solutions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '760px' }}>
              {challenges.map((c, i) => (
                <div key={c.title} className="card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent)' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>
                    {i + 1}. {c.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* Future Roadmap */}
        <FadeUp delay={0.1}>
          <section style={{ marginBottom: '4rem', padding: '2rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', borderRadius: '16px', maxWidth: '760px' }}>
            <FiBarChart2 size={24} style={{ color: 'var(--accent)', marginBottom: '0.75rem' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Future Roadmap</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Payment gateway integration (Stripe / local gateways)', 'Mobile app (React Native)', 'Court recommendation engine', 'Multi-sport support expansion', 'White-label SaaS offering for franchise operators'].map((r) => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{r}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* CTA */}
        <FadeUp>
          <section style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Interested in Building Something Similar?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>I can architect and build production-grade SaaS platforms, custom web applications, and full-stack solutions.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/#contact" className="btn-primary">Let's Talk</Link>
              <Link to="/#projects" className="btn-ghost">View More Projects</Link>
            </div>
          </section>
        </FadeUp>
      </div>
    </main>
  </>
);

export default CourtKonnect;
