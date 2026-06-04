import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader.jsx';
import { staggerChild } from '../../utils/animations.js';

const companies = [
  { name: 'Oreezo Digital Agency', location: 'Dubai, UAE', period: 'Apr 2026 – Present', type: 'Remote', color: '#6366f1', initials: 'OD', role: 'Senior Web Developer', isCurrent: true },
  { name: 'Potens Digital', location: 'Canada', period: 'Sep 2025 – Apr 2026', type: 'Hybrid', color: '#0ea5e9', initials: 'PD', role: 'Senior Web Developer' },
  { name: '7Star Solutions', location: 'Pakistan', period: 'May 2025 – Sep 2025', type: 'Onsite', color: '#f59e0b', initials: '7S', role: 'Web Developer' },
  { name: 'Byteify Technologies', location: 'Pakistan', period: 'Aug 2024 – Apr 2025', type: 'Onsite', color: '#22c55e', initials: 'BT', role: 'Web Developer' },
  { name: 'Tech Teams', location: 'Pakistan', period: 'Aug 2023 – Feb 2024', type: 'Onsite', color: '#ec4899', initials: 'TT', role: 'Web Developer' },
];

const Companies = () => (
  <section className="section" style={{ background: 'var(--bg-base)' }}>
    <div className="container-custom">
      <SectionHeader
        label="Professional Experience"
        title="Companies I've Worked With"
        subtitle="From local agencies to international clients — building a track record of delivering quality web solutions."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {companies.map((company, i) => (
          <motion.div
            key={company.name}
            {...staggerChild(i)}
            className="card"
            style={{ padding: '1.5rem', position: 'relative' }}
          >
            {company.isCurrent && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.2rem 0.6rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '9999px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#22c55e' }}>Current</span>
              </div>
            )}
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: `${company.color}18`, border: `1px solid ${company.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 800, fontSize: '0.875rem', color: company.color }}>
              {company.initials}
            </div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{company.name}</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem' }}>{company.role}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>{company.location}</span>
              <span>·</span>
              <span>{company.period}</span>
              <span>·</span>
              <span style={{ color: company.type === 'Remote' ? '#22c55e' : company.type === 'Hybrid' ? '#f59e0b' : 'var(--text-muted)' }}>{company.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Companies;
