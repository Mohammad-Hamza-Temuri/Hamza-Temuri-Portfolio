import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiEye, FiStar } from 'react-icons/fi';
import { staggerChild } from '../../utils/animations.js';

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.div
      {...staggerChild(index)}
      className="card"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}
    >
      {/* Image */}
      <div className="project-img-wrap">
        {project.featuredImage?.url ? (
          <img src={project.featuredImage.url} alt={project.title} />
        ) : (
          <div style={{ height: '220px', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No preview</span>
          </div>
        )}
        {project.isFeatured && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.6rem', background: 'var(--accent)', color: '#fff', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700 }}>
            <FiStar size={10} /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.category?.map((cat) => (
            <span key={cat} className="badge" style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {cat}
            </span>
          ))}
        </div>

        <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {project.title}
        </h3>

        {project.excerpt && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
            {project.excerpt}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
          {project.techStack?.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
          {project.techStack?.length > 4 && (
            <span className="tech-tag">+{project.techStack.length - 4}</span>
          )}
        </div>

        {(() => {
          const hasDetailPage = !project.category?.some((c) => c === 'wordpress' || c === 'shopify');
          return (
            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              {hasDetailPage && (
                <Link
                  to={`/projects/${project.slug}`}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  <FiEye size={14} /> View Details
                </Link>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={hasDetailPage ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  <FiExternalLink size={14} /> Visit
                </a>
              )}
            </div>
          );
        })()}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
