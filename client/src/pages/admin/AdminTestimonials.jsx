import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiStar, FiUpload, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../services/api.js';
import { profileService } from '../../services/profileService.js';

const lbl = (text) => (
  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
    {text}
  </label>
);

const StarPicker = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: '0.25rem' }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.15rem', color: n <= value ? '#f59e0b' : 'var(--border-strong)', transition: 'color 0.15s' }}
      >
        <FiStar size={20} style={{ fill: n <= value ? '#f59e0b' : 'none' }} />
      </button>
    ))}
  </div>
);

const TestimonialForm = ({ initial, onSave, onCancel, isSaving }) => {
  const [avatarPreview, setAvatarPreview] = useState(initial?.avatar?.url || '');
  const [avatarData, setAvatarData] = useState(initial?.avatar || null);
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(initial?.rating || 5);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: initial?.name || '',
      position: initial?.position || '',
      company: initial?.company || '',
      content: initial?.content || '',
      displayOrder: initial?.displayOrder ?? 0,
      isPublished: initial?.isPublished !== false,
    },
  });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await profileService.uploadImage(fd);
      setAvatarPreview(res.data.url);
      setAvatarData({ url: res.data.url, publicId: res.data.publicId });
    } catch {
      toast.error('Avatar upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    onSave({ ...data, rating, avatar: avatarData || initial?.avatar });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>
        {initial?._id ? 'Edit Testimonial' : 'Add Testimonial'}
      </h2>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>
          {avatarPreview
            ? <img src={avatarPreview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : '?'}
        </div>
        <label className="btn-ghost" style={{ cursor: 'pointer', fontSize: '0.8125rem', padding: '0.5rem 1rem' }}>
          <FiUpload size={13} /> {uploading ? 'Uploading…' : 'Upload Avatar'}
          <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          {lbl('Name *')}
          <input {...register('name')} required className="input" placeholder="e.g. John Smith" />
        </div>
        <div>
          {lbl('Position *')}
          <input {...register('position')} required className="input" placeholder="e.g. CEO" />
        </div>
        <div>
          {lbl('Company *')}
          <input {...register('company')} required className="input" placeholder="e.g. Acme Corp" />
        </div>
      </div>

      <div>
        {lbl('Testimonial *')}
        <textarea
          {...register('content')}
          required
          rows={4}
          className="input"
          placeholder="What did they say about working with you?"
          style={{ resize: 'vertical', lineHeight: 1.6 }}
        />
      </div>

      <div>
        {lbl('Rating')}
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'end' }}>
        <div>
          {lbl('Display Order')}
          <input {...register('displayOrder', { valueAsNumber: true })} type="number" className="input" />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)', paddingBottom: '0.75rem' }}>
          <input type="checkbox" {...register('isPublished')} /> Published (visible on site)
        </label>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button type="button" onClick={onCancel} className="btn-ghost" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
          <FiX size={14} /> Cancel
        </button>
        <button type="submit" disabled={isSaving || uploading} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem', opacity: isSaving ? 0.7 : 1 }}>
          <FiSave size={14} /> {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
};

const AdminTestimonials = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: () => api.get('/testimonials/admin/all').then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (body) =>
      editing?._id
        ? api.put(`/testimonials/admin/${editing._id}`, body)
        : api.post('/testimonials/admin', body),
    onSuccess: () => {
      qc.invalidateQueries(['admin-testimonials']);
      qc.invalidateQueries(['testimonials']);
      toast.success(editing?._id ? 'Testimonial updated' : 'Testimonial added');
      setEditing(null);
    },
    onError: () => toast.error('Failed to save'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/testimonials/admin/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(['admin-testimonials']);
      qc.invalidateQueries(['testimonials']);
      toast.success('Deleted');
    },
    onError: () => toast.error('Failed to delete'),
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete testimonial from "${name}"?`)) deleteMutation.mutate(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Testimonials</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{data?.length || 0} entries — only Published ones appear on site</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing({})} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
            <FiPlus size={14} /> Add Testimonial
          </button>
        )}
      </div>

      {editing && (
        <TestimonialForm
          initial={editing._id ? editing : undefined}
          onSave={(body) => saveMutation.mutate(body)}
          onCancel={() => setEditing(null)}
          isSaving={saveMutation.isPending}
        />
      )}

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: '72px', borderRadius: '10px' }} />)}
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {!data?.length ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FiMessageSquare size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
              <p>No testimonials yet. Add one to display them on the homepage.</p>
            </div>
          ) : (
            data.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: i < data.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)' }}>
                  {t.avatar?.url
                    ? <img src={t.avatar.url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : t.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{t.name}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.position} · {t.company}</span>
                    {!t.isPublished && (
                      <span style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', borderRadius: '9999px', background: 'var(--bg-muted)', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}>
                        Draft
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1px', marginTop: '0.2rem' }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FiStar key={n} size={11} style={{ color: n <= t.rating ? '#f59e0b' : 'var(--border-default)', fill: n <= t.rating ? '#f59e0b' : 'none' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                    {t.content}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <button
                    onClick={() => setEditing(t)}
                    style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', background: 'transparent', cursor: 'pointer' }}
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id, t.name)}
                    style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', background: 'transparent', cursor: 'pointer' }}
                  >
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

export default AdminTestimonials;
