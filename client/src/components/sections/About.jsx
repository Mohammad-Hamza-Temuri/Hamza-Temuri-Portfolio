import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { slideInLeft, slideInRight } from '../../utils/animations.js';

const strengths = [
  'Custom WordPress & Shopify solutions for real businesses',
  'Full MERN Stack applications from concept to deployment',
  'Performance-first development — 90+ Lighthouse scores',
  'SEO-optimized code that ranks and converts',
  'International agency experience (Dubai & Canada)',
  'Clean, maintainable code with long-term support',
];

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
  <section id="about" className="section" style={{ background: 'var(--bg-subtle)', overflow: 'hidden' }}>
    <div className="container-custom">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <motion.div {...slideInLeft(isMobile)}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <span className="section-label">About Me</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            I Build Websites That<br />
            <span className="gradient-text">Work for Your Business</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.75 }}>
            <p>I'm Muhammad Hamza Temuri, a Full Stack Developer from Karachi, Pakistan with 3+ years of hands-on experience building production-grade web solutions for businesses and agencies worldwide.</p>
            <p>My journey started with WordPress development, quickly expanded into custom PHP, Shopify theme customization with Liquid, and eventually full-stack development with the MERN stack. I've worked in local agencies, hybrid setups, and fully remote positions with clients in Canada and Dubai.</p>
            <p>What makes me different isn't just my technical skills — it's my <strong style={{ color: 'var(--text-primary)' }}>business-first mindset</strong>. Every website I build is optimized for performance, SEO, and conversion.</p>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem' }}>
            <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Work With Me <FiArrowRight size={15} />
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">View Resume</a>
          </div>
        </motion.div>

        <motion.div {...slideInRight(isMobile)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Education</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>BS Computer Science</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sir Syed University of Engineering & Technology</p>
              </div>
              <span className="badge">2022 – 2026</span>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>What I Deliver</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {strengths.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
                    <FiCheck size={11} style={{ color: 'var(--accent)' }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <style>{`@media(max-width:768px){ #about .container-custom > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
  </section>
  );
};

export default About;
