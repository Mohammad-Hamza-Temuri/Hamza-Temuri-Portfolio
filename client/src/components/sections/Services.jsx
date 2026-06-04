import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import { services } from '../../constants/services.js';
import { staggerChild } from '../../utils/animations.js';

const Services = () => (
  <section id="services" className="section" style={{ background: 'var(--bg-base)' }}>
    <div className="container-custom">
      <SectionHeader
        label="Services"
        title="What I Can Build For You"
        subtitle="From custom WordPress themes to full-stack MERN applications — every service is delivered with performance, SEO, and business outcomes in mind."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              {...staggerChild(i)}
              className="card"
              style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: `${service.color}15`, border: `1px solid ${service.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} style={{ color: service.color }} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>{service.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{service.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {service.benefits.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiCheck size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                {service.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
