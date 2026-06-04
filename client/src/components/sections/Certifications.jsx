import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiExternalLink, FiAward } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader.jsx';
import { staggerChild } from '../../utils/animations.js';
import api from '../../services/api.js';

const fallback = [
  { _id: '1', title: 'CCNA: Introduction to Networks', issuer: 'Cisco', color: '#0ea5e9', desc: 'Networking fundamentals, IP addressing, and routing protocols.' },
  { _id: '2', title: 'MERN Stack Fundamentals', issuer: 'Online Platform', color: '#6366f1', desc: 'Full stack development with MongoDB, Express.js, React.js, and Node.js.' },
];

const Certifications = () => {
  const { data } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => api.get('/certifications').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const certs = data?.length ? data : fallback;

  return (
    <section id="certifications" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          subtitle="Validated technical credentials that complement hands-on professional experience."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
          {certs.map((cert, i) => (
            <motion.div
              key={cert._id}
              {...staggerChild(i)}
              className="card"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${cert.color || 'var(--accent)'}18`, border: `1px solid ${cert.color || 'var(--accent)'}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cert.image?.url
                  ? <img src={cert.image.url} alt={cert.title} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  : <FiAward size={28} style={{ color: cert.color || 'var(--accent)' }} />
                }
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{cert.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600 }}>{cert.issuer}</p>
              </div>
              {cert.desc && <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cert.desc}</p>}
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="badge" style={{ gap: '0.35rem' }}>
                  <FiExternalLink size={11} /> Verify Credential
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
