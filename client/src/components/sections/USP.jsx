import { motion } from 'framer-motion';
import { FiZap, FiSearch, FiLayers, FiTrendingUp, FiCode, FiLayout, FiLifeBuoy, FiClock } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import { staggerChild } from '../../utils/animations.js';

const usps = [
  { icon: FiZap, title: 'Performance-First Development', desc: 'Every project targets 90+ Lighthouse scores. Fast-loading sites reduce bounce rates and improve conversions.', color: '#f59e0b' },
  { icon: FiSearch, title: 'SEO Optimized by Default', desc: 'Clean HTML, structured data, meta tags, sitemaps — your site is built to rank from day one.', color: '#22c55e' },
  { icon: FiLayers, title: 'Scalable Architecture', desc: "Code structured for growth. Adding features later doesn't mean rewriting everything.", color: '#6366f1' },
  { icon: FiTrendingUp, title: 'Business-Oriented Thinking', desc: "I ask about your goals, not just your requirements. Sites built to convert, not just look good.", color: '#ec4899' },
  { icon: FiCode, title: 'Clean, Maintainable Code', desc: 'Well-structured, documented, and easy to hand off to any developer. No spaghetti code.', color: '#0ea5e9' },
  { icon: FiLayout, title: 'Modern UI/UX Standards', desc: 'Pixel-perfect implementations with attention to typography, spacing, and interaction design.', color: '#8b5cf6' },
  { icon: FiLifeBuoy, title: 'Long-Term Support', desc: "I don't disappear after launch. Ongoing maintenance, updates, and support available.", color: '#14b8a6' },
  { icon: FiClock, title: 'Fast Turnaround', desc: 'Efficient development process with regular updates. Deadlines are commitments, not estimates.', color: '#f97316' },
];

const USP = () => (
  <section className="section" style={{ background: 'var(--bg-subtle)' }}>
    <div className="container-custom">
      <SectionHeader
        label="Why Choose Me"
        title="What Sets My Work Apart"
        subtitle="I focus on outcomes, not just deliverables. Here's what you get when we work together."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {usps.map((usp, i) => {
          const Icon = usp.icon;
          return (
            <motion.div
              key={usp.title}
              {...staggerChild(i)}
              className="card"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${usp.color}15`, border: `1px solid ${usp.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} style={{ color: usp.color }} />
              </div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{usp.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{usp.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default USP;
