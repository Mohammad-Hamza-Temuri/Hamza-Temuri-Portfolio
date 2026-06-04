import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFolder, FiMail, FiUser, FiPlus, FiClock } from 'react-icons/fi';
import api from '../../services/api.js';

const StatCard = ({ icon: Icon, label, value, sub, color, link }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
    className="card" style={{ padding: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} style={{ color }} />
      </div>
      {link && <Link to={link} style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>View →</Link>}
    </div>
    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{label}</div>
    {sub && <div style={{ fontSize: '0.8125rem', color: color, marginTop: '0.35rem', fontWeight: 600 }}>{sub}</div>}
  </motion.div>
);

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get('/admin/analytics').then((r) => r.data),
    staleTime: 60 * 1000,
  });

  if (isLoading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
      {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: '140px', borderRadius: '12px' }} />)}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Welcome back, Hamza. Here's an overview.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <StatCard icon={FiFolder} label="Total Projects" value={data?.projects?.total || 0} sub={`${data?.projects?.published || 0} published · ${data?.projects?.draft || 0} draft`} color="#6366f1" link="/admin/projects" />
        <StatCard icon={FiMail} label="Inquiries" value={data?.inquiries?.total || 0} sub={data?.inquiries?.unread ? `${data.inquiries.unread} unread` : 'All read'} color="#22c55e" link="/admin/inquiries" />
        <StatCard icon={FiUser} label="Experiences" value={data?.experiences || 0} color="#f59e0b" link="/admin/experience" />
        <StatCard icon={FiClock} label="Testimonials" value={data?.testimonials || 0} color="#ec4899" link="/admin/testimonials" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link to="/admin/projects/new" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.1rem' }}>
            <FiPlus size={14} /> New Project
          </Link>
          <Link to="/admin/inquiries" className="btn-secondary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.1rem' }}>
            <FiMail size={14} /> View Inquiries
          </Link>
          <Link to="/admin/profile" className="btn-ghost" style={{ fontSize: '0.875rem', padding: '0.6rem 1.1rem' }}>
            <FiUser size={14} /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Recent inquiries */}
      {data?.recentInquiries?.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Inquiries</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {data.recentInquiries.map((c, i) => (
              <div key={c._id} style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: i < data.recentInquiries.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{c.name}</span>
                    {c.status === 'unread' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.subject}</p>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-disabled)', flexShrink: 0 }}>
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
