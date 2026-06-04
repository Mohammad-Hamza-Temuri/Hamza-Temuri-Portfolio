import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { projectService } from '../../services/projectService.js';

const statusColor = { published: '#22c55e', draft: '#f59e0b' };

const AdminProjects = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => projectService.adminGetAll().then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => projectService.delete(id),
    onSuccess: () => { qc.invalidateQueries(['admin-projects']); toast.success('Project deleted'); },
    onError: () => toast.error('Failed to delete project'),
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) deleteMutation.mutate(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Projects</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{data?.length || 0} total projects</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary" style={{ fontSize: '0.875rem' }}>
          <FiPlus size={14} /> New Project
        </Link>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '10px' }} />)}
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {!data?.length ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FiPlus size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
              <p>No projects yet. Create your first project.</p>
            </div>
          ) : (
            data.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: i < data.length - 1 ? '1px solid var(--border-subtle)' : 'none', flexWrap: 'wrap' }}
              >
                {project.featuredImage?.url ? (
                  <img src={project.featuredImage.url} alt={project.title} style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '48px', height: '36px', borderRadius: '6px', background: 'var(--bg-muted)', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{project.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{project.category?.join(', ')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 600, background: `${statusColor[project.status] || '#6b6a85'}18`, color: statusColor[project.status] || 'var(--text-muted)', border: `1px solid ${statusColor[project.status] || '#6b6a85'}35` }}>
                    {project.status}
                  </span>
                  {project.isFeatured && <span className="badge">Featured</span>}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s ease' }}>
                      <FiEye size={13} />
                    </a>
                  )}
                  <Link to={`/admin/projects/${project._id}/edit`} style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s ease' }}>
                    <FiEdit2 size={13} />
                  </Link>
                  <button onClick={() => handleDelete(project._id, project.title)} style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
