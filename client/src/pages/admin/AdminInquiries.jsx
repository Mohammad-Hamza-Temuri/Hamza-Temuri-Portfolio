import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiMail, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { contactService } from '../../services/contactService.js';

const statuses = ['all', 'unread', 'read', 'replied', 'archived'];

const AdminInquiries = () => {
  const qc = useQueryClient();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['inquiries', filter],
    queryFn: () => contactService.getAll(filter !== 'all' ? { status: filter } : {}).then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => contactService.updateStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inquiries'] }); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => contactService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inquiries'] }); setSelected(null); toast.success('Deleted'); },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Inquiries</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>All contact form submissions</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '0.35rem 0.85rem', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', background: filter === s ? 'var(--accent)' : 'var(--bg-subtle)', color: filter === s ? '#fff' : 'var(--text-secondary)', borderColor: filter === s ? 'var(--accent)' : 'var(--border-default)', transition: 'all 0.2s ease', textTransform: 'capitalize' }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1.25rem' }}>
        {/* List */}
        <div className="card" style={{ overflow: 'hidden' }}>
          {isLoading ? <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div> :
           !data?.length ? <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No inquiries found.</div> : (
            data.map((c, i) => (
              <motion.div key={c._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                onClick={() => { setSelected(c); updateMutation.mutate({ id: c._id, status: c.status === 'unread' ? 'read' : c.status }); }}
                style={{ padding: '1rem 1.25rem', cursor: 'pointer', borderBottom: i < data.length - 1 ? '1px solid var(--border-subtle)' : 'none', background: selected?._id === c._id ? 'var(--accent-bg)' : 'transparent', transition: 'background 0.15s ease' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      {c.status === 'unread' && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />}
                      <span style={{ fontWeight: c.status === 'unread' ? 700 : 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{c.name}</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.subject}</p>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-disabled)', flexShrink: 0 }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail */}
        {selected && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'start', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>{selected.subject}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Type', selected.projectType], ['Budget', selected.budget]].filter(([, v]) => v).map(([l, v]) => (
                <div key={l} style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', minWidth: '60px' }}>{l}:</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {selected.message}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.9rem' }}>
                <FiMail size={13} /> Reply
              </a>
              <select value={selected.status} onChange={(e) => { updateMutation.mutate({ id: selected._id, status: e.target.value }); setSelected({ ...selected, status: e.target.value }); }}
                className="input" style={{ width: 'auto', fontSize: '0.8125rem', padding: '0.5rem 0.75rem', cursor: 'pointer' }}>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
              <button onClick={() => { if (window.confirm('Delete this inquiry?')) deleteMutation.mutate(selected._id); }}
                style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'transparent', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiTrash2 size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
