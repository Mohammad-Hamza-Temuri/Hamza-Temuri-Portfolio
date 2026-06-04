import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../shared/SectionHeader.jsx';
import ProjectCard from '../shared/ProjectCard.jsx';
import { projectService } from '../../services/projectService.js';
import { fadeUp } from '../../utils/animations.js';

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'mern', label: 'MERN' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'shopify', label: 'Shopify' },
];

const PAGE_SIZE = 6;

const courtKonnect = {
  _id: 'ck',
  title: 'Court Konnect',
  slug: 'court-konnect',
  category: ['mern', 'saas'],
  excerpt: 'A production-grade MERN Stack SaaS platform for indoor sports court booking and facility management with multi-role dashboards.',
  techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
  isFeatured: true,
  isCaseStudy: true,
  featuredImage: { url: '' },
  projectUrl: '',
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getAll().then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const allProjects = data?.length ? data : [courtKonnect];
  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category?.includes(activeFilter));
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Portfolio"
          title="Featured Projects"
          subtitle="A selection of projects that demonstrate my skills across MERN Stack, WordPress, and Shopify development."
        />

        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '8px', fontSize: '0.875rem',
                fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s ease',
                background: activeFilter === f.id ? 'var(--accent)' : 'var(--bg-subtle)',
                color: activeFilter === f.id ? '#fff' : 'var(--text-secondary)',
                borderColor: activeFilter === f.id ? 'var(--accent)' : 'var(--border-default)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: '400px', borderRadius: '12px' }} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}
            >
              {filtered.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  No projects in this category yet.
                </div>
              ) : (
                visible.map((project, i) => (
                  <ProjectCard key={project._id} project={project} index={i} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', marginTop: '2.5rem' }}
          >
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="btn-secondary"
              style={{ padding: '0.75rem 2.5rem', fontSize: '0.9375rem' }}
            >
              Load More
            </button>
          </motion.div>
        )}

        {/* Court Konnect CTA */}
        <motion.div
          {...fadeUp}
          style={{ marginTop: '3rem', textAlign: 'center', padding: '2.5rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '16px' }}
        >
          <div className="badge" style={{ marginBottom: '1rem' }}>Featured Case Study</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Court Konnect — Full SaaS Case Study</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Read the complete architectural breakdown of a production-grade sports facility management SaaS platform.
          </p>
          <Link to="/projects/court-konnect" className="btn-primary">Read the Case Study →</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
