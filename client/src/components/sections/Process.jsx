import { motion } from 'framer-motion';
import { FiCompass, FiGrid, FiTerminal, FiGlobe, FiCheck } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import { staggerChild } from '../../utils/animations.js';

const steps = [
  {
    number: '01',
    icon: FiCompass,
    title: 'Discovery',
    description: 'I start by understanding your goals, target audience, technical requirements, and timeline before anything is built.',
    deliverables: ['Requirements document', 'Tech stack recommendation', 'Project timeline', 'Cost estimate'],
    color: '#4f46e5',
  },
  {
    number: '02',
    icon: FiGrid,
    title: 'Design',
    description: 'UI/UX layout planning and design system setup so we align on look, feel, and user flow before a single line of code is written.',
    deliverables: ['Wireframes & mockups', 'Design system', 'Feedback rounds', 'Final sign-off'],
    color: '#7c3aed',
  },
  {
    number: '03',
    icon: FiTerminal,
    title: 'Development',
    description: 'Clean, performant, and scalable code delivered in stages with regular progress updates and a staging environment to review.',
    deliverables: ['Staging environment', 'Weekly updates', 'Code review', 'QA testing'],
    color: '#0891b2',
  },
  {
    number: '04',
    icon: FiGlobe,
    title: 'Launch & Support',
    description: 'Thorough testing, optimized deployment, and post-launch support to ensure everything runs smoothly from day one.',
    deliverables: ['Live deployment', 'Performance audit', 'Handover documentation', '30-day support'],
    color: '#059669',
  },
];

const Process = () => (
  <section id="process" className="section" style={{ background: 'var(--bg-subtle)' }}>
    <div className="container-custom">
      <SectionHeader
        label="How I Work"
        title="My Development Process"
        subtitle="A clear, structured workflow from first conversation to successful launch — no surprises, no guesswork."
      />

      <div
        className="process-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              {...staggerChild(i)}
              className="card"
              style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* Watermark step number */}
              <span style={{
                position: 'absolute', top: '0.75rem', right: '1rem',
                fontSize: '3.5rem', fontWeight: 900, lineHeight: 1,
                color: `${step.color}12`,
                userSelect: 'none', pointerEvents: 'none',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {step.number}
              </span>

              {/* Icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${step.color}15`, border: `1px solid ${step.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={22} style={{ color: step.color }} />
              </div>

              {/* Step label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: step.color,
                  padding: '0.15rem 0.5rem', borderRadius: '4px',
                  background: `${step.color}12`, border: `1px solid ${step.color}25`,
                }}>
                  Step {step.number}
                </span>
              </div>

              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '-0.25rem' }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {step.description}
              </p>

              {/* Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                {step.deliverables.map((d) => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiCheck size={12} style={{ color: step.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Process;
