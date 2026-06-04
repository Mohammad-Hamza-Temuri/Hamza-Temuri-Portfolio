import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { projectService } from '../services/projectService.js';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectService.getBySlug(slug).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="skeleton" style={{ width: '800px', height: '600px', borderRadius: '16px' }} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center', padding: '120px 2rem 4rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Project Not Found</h2>
        <Link to="/" className="btn-primary">← Back to Portfolio</Link>
      </div>
    );
  }

  const project = data;

  return (
    <>
      <Helmet>
        <title>{project.title} — Muhammad Hamza Temuri</title>
        <meta name="description" content={project.excerpt} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.excerpt} />
        {project.featuredImage?.url && <meta property="og:image" content={project.featuredImage.url} />}
      </Helmet>

      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        {/* Hero Banner */}
        <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)', padding: '4rem 0 3rem' }}>
          <div className="container-custom">
            <Link to="/#projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <FiArrowLeft size={14} /> Back to Projects
            </Link>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {project.category?.map((c) => <span key={c} className="badge" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem' }}>{c}</span>)}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1rem' }}>{project.title}</h1>
            {project.excerpt && <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '1.5rem' }}>{project.excerpt}</p>}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FiExternalLink size={15} /> Visit Project
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FiGithub size={15} /> View Code
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {project.featuredImage?.url && (
          <section style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-default)', overflow: 'hidden', maxHeight: '500px' }}>
            <img src={project.featuredImage.url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </section>
        )}

        {/* Content */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container-custom">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', alignItems: 'start' }}>
              {/* Main content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {project.description && (
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Project Overview</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{project.description}</p>
                  </div>
                )}
                {project.problem && (
                  <div className="card" style={{ padding: '1.5rem', borderLeft: '3px solid #ef4444' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem' }}>The Problem</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="card" style={{ padding: '1.5rem', borderLeft: '3px solid #22c55e' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.5rem' }}>The Solution</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{project.solution}</p>
                  </div>
                )}
                {project.features?.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Key Features</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                      {project.features.map((f) => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FiCheck size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {project.challenges && (
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Technical Challenges</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{project.challenges}</p>
                  </div>
                )}
                {project.results && (
                  <div className="card" style={{ padding: '1.5rem', background: 'var(--accent-bg)', borderColor: 'var(--accent-border)' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>Results & Impact</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{project.results}</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '100px' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Tech Stack</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.techStack?.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Category</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.category?.map((c) => <span key={c} className="badge">{c}</span>)}
                  </div>
                </div>
                {(project.projectUrl || project.githubUrl) && (
                  <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center' }}>
                        <FiExternalLink size={14} /> Visit Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ justifyContent: 'center' }}>
                        <FiGithub size={14} /> View Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <style>{`@media(max-width:768px){ main .container-custom > div { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

export default ProjectDetail;
