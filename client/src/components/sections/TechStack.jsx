import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader.jsx';
import { techCategories } from '../../constants/techStack.js';

const TechStack = () => {
  const [active, setActive] = useState('frontend');
  const category = techCategories.find((c) => c.id === active);

  return (
    <section className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Tech Stack"
          title="Technologies I Work With"
          subtitle="A curated set of modern tools and frameworks I use to build fast, scalable, and maintainable web applications."
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '8px', fontSize: '0.875rem',
                fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s ease',
                background: active === cat.id ? 'var(--accent)' : 'var(--bg-subtle)',
                color: active === cat.id ? '#fff' : 'var(--text-secondary)',
                borderColor: active === cat.id ? 'var(--accent)' : 'var(--border-default)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}
          >
            {category?.items.map((tech, i) => {
              const Icon = tech.Icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                  className="card"
                  style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${tech.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} style={{ color: tech.color }} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;
