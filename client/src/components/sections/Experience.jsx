import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCalendar, FiChevronDown, FiFileText, FiX } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import { staggerChild } from '../../utils/animations.js';
import api from '../../services/api.js';
import { getLetterUrl } from '../../services/profileService.js';
import oreezoLogo from '../../assets/Oreezo-logo.webp';
import potensLogo from '../../assets/Potens-logo.webp';
import byteifyLogo from '../../assets/Byteify-technologies-logo.webp';
import sevenStarLogo from '../../assets/7-star-solutions.webp';
import techTeamsLogo from '../../assets/Tech-Team-logo.webp';

const companyLogos = {
  'Oreezo Digital Agency': oreezoLogo,
  'Potens Digital': potensLogo,
  '7Star Solutions': sevenStarLogo,
  'Byteify Technologies': byteifyLogo,
  'Tech Team': techTeamsLogo,
};

const typeLabel = { remote: 'Remote', hybrid: 'Hybrid', onsite: 'Onsite' };
const typeColor = { remote: '#22c55e', hybrid: '#f59e0b', onsite: '#6366f1' };

const formatDate = (date) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const fallbackExperiences = [
  {
    _id: '1', company: 'Oreezo Digital Agency', location: 'Dubai, UAE', position: 'Senior Web Developer', type: 'remote', startDate: '2026-04-01', isCurrent: true,
    responsibilities: [
      'Developed and maintained WordPress and Shopify websites',
      'Customized themes, plugins, and third-party integrations based on project requirements',
      'Built responsive and user-friendly website interfaces using HTML, CSS, and JavaScript',
      'Resolved technical issues, optimized website performance, and maintained site security',
      'Managed hosting, domains, DNS, and website maintenance tasks',
      'Delivered multiple projects within deadlines while ensuring quality and responsiveness',
    ],
  },
  {
    _id: '2', company: 'Potens Digital', location: 'Canada', position: 'Senior Web Developer', type: 'hybrid', startDate: '2025-09-01', endDate: '2026-04-01',
    responsibilities: [
      'Designed and developed custom WordPress websites and interactive website sections',
      'Developed and customized WordPress plugins based on business requirements',
      'Extended website functionality using PHP, JavaScript, and jQuery',
      'Contributed to Shopify store development, theme customization, and Liquid section creation',
      'Managed dynamic website features and implemented client-specific functionalities',
      'Identified and resolved website bugs, technical issues, and performance bottlenecks',
    ],
  },
  {
    _id: '3', company: '7Star Solutions', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2025-05-01', endDate: '2025-09-01',
    responsibilities: [
      'Developed custom WordPress websites using Elementor and theme customization',
      'Built responsive and SEO-friendly website interfaces',
      'Optimized website performance and cross-browser compatibility',
      'Implemented client requirements into clean and maintainable solutions',
      'Customized plugins and website functionalities based on project requirements',
    ],
  },
  {
    _id: '4', company: 'Byteify Technologies', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2024-08-01', endDate: '2025-04-01',
    responsibilities: [
      'Developed custom WordPress websites with theme and plugin customization',
      'Built responsive frontend interfaces using HTML, CSS, JavaScript, React.js, and Tailwind CSS',
      'Added dynamic functionalities using PHP, JavaScript, and custom code solutions',
      'Optimized website performance, fixed bugs, and maintained site functionality',
      'Improved workflow efficiency using AI-assisted development tools',
      'Collaborated with design and backend teams on production-ready solutions',
    ],
  },
  {
    _id: '5', company: 'Tech Teams', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2023-08-01', endDate: '2024-02-01',
    responsibilities: [
      'Developed and maintained WordPress websites using Elementor and customizations',
      'Created responsive website layouts using HTML, CSS, and JavaScript in PHP & React.js',
      'Fixed website issues and improved performance and responsiveness',
      'Customized plugins and website functionalities based on project requirements',
      'Assisted in delivering scalable and user-friendly web solutions',
    ],
  },
];

const LetterModal = ({ experience, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ width: '100%', maxWidth: '860px', height: '90vh', background: 'var(--bg-elevated)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FiFileText size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
              Experience Letter — {experience.company}
            </span>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <FiX size={16} />
          </button>
        </div>
        <iframe
          src={getLetterUrl(experience._id)}
          title={`${experience.company} experience letter`}
          style={{ flex: 1, border: 'none', width: '100%', background: '#fff' }}
        />
      </motion.div>
    </div>
  );
};

const AccordionCard = ({ experience, index, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [letterOpen, setLetterOpen] = useState(false);
  const color = typeColor[experience.type] ?? 'var(--accent)';
  const logo = companyLogos[experience.company];
  const initials = experience.company.split(' ').slice(0, 2).map((w) => w[0]).join('');

  return (
    <motion.div {...staggerChild(index)} className="card" style={{ overflow: 'hidden' }}>
      {/* Clickable header */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', padding: '1.5rem', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem', textAlign: 'left',
        }}
      >
        {/* Left: position + company */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {experience.position}
            </h3>
            {experience.isCurrent && (
              <span style={{
                fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px',
                background: 'rgba(34,197,94,0.1)', color: '#22c55e',
                border: '1px solid rgba(34,197,94,0.3)', fontWeight: 700,
              }}>
                Current
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--accent)', fontWeight: 600, margin: 0 }}>
            {experience.company}
          </p>
        </div>

        {/* Meta: date / location / type — hidden on mobile */}
        <div className="exp-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
            <FiCalendar size={12} />
            {formatDate(experience.startDate)} – {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
          </span>
          <span style={{
            fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px',
            background: 'var(--bg-muted)', color: 'var(--text-muted)',
            border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap',
          }}>
            <FiMapPin size={10} /> {experience.location}
          </span>
          {experience.type && (
            <span style={{
              fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px',
              background: `${color}18`, color, border: `1px solid ${color}40`, whiteSpace: 'nowrap',
            }}>
              {typeLabel[experience.type]}
            </span>
          )}
        </div>

        {/* Chevron — always visible so expand state is clear on all screen sizes */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <FiChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expandable responsibilities */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div className="exp-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {experience.responsibilities?.map((r, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {r}
                    </li>
                  ))}
                </ul>

                {/* Company logo + letter button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '180px', height: '120px',
                    borderRadius: '10px', border: '1px solid var(--border-default)',
                    background: 'var(--bg-elevated)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '14px', overflow: 'hidden',
                  }}>
                    {logo ? (
                      <img
                        src={logo}
                        alt={experience.company}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                      />
                    ) : (
                      <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                        {initials}
                      </span>
                    )}
                  </div>
                  {experience.letter?.uploadedAt && (
                    <button
                      onClick={() => setLetterOpen(true)}
                      style={{
                        width: '180px', padding: '0.5rem 0.75rem',
                        borderRadius: '8px', border: '1px solid var(--accent-border)',
                        background: 'var(--accent-bg)', color: 'var(--accent)',
                        cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                      }}
                    >
                      <FiFileText size={13} /> View Letter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    <AnimatePresence>
      {letterOpen && <LetterModal experience={experience} onClose={() => setLetterOpen(false)} />}
    </AnimatePresence>
  );
};

const Experience = () => {
  const { data } = useQuery({
    queryKey: ['experience'],
    queryFn: () => api.get('/experience').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const experiences = data?.length ? data : fallbackExperiences;

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Work History"
          title="Professional Experience"
          subtitle="3+ years working with agencies and companies across Pakistan, Canada, and Dubai."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {experiences.map((exp, i) => (
            <AccordionCard
              key={exp._id}
              experience={exp}
              index={i}
              defaultOpen={exp.isCurrent || i === 0}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:640px) {
          .exp-meta { display: none !important; }
          .exp-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
