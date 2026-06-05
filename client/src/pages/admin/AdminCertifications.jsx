import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiAward, FiUpload, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../services/api.js';
import { profileService } from '../../services/profileService.js';

const toDateInput = (val) => (val ? new Date(val).toISOString().split('T')[0] : '');

const lbl = (text) => (
  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
    {text}
  </label>
);

const CertForm = ({ initial, onSave, onCancel, isSaving }) => {
  const [imagePreview, setImagePreview] = useState(initial?.image?.url || '');
  const [imageData, setImageData] = useState(initial?.image || null);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: initial?.title || '',
      issuer: initial?.issuer || '',
      issueDate: toDateInput(initial?.issueDate),
      credentialId: initial?.credentialId || '',
      credentialUrl: initial?.credentialUrl || '',
      displayOrder: initial?.displayOrder ?? 0,
      isPublished: initial?.isPublished !== false,
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await profileService.uploadImage(fd);
      setImagePreview(res.data.url);
      setImageData({ url: res.data.url, publicId: res.data.publicId });
    } catch (err) {
      console.error('Image upload failed:', err);
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    onSave({ ...data, image: imageData || initial?.image });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>
        {initial?._id ? 'Edit Certification' : 'Add Certification'}
      </h2>

      {/* Image upload */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
          {imagePreview
            ? <img src={imagePreview} alt="cert" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            : <FiAward size={24} style={{ color: 'var(--accent)' }} />}
        </div>
        <label className="btn-ghost" style={{ cursor: 'pointer', fontSize: '0.8125rem', padding: '0.5rem 1rem' }}>
          <FiUpload size={13} /> {uploading ? 'Uploading…' : 'Upload Logo'}
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          {lbl('Title *')}
          <input {...register('title')} required className="input" placeholder="e.g. AWS Certified Developer" />
        </div>
        <div>
          {lbl('Issuer *')}
          <input {...register('issuer')} required className="input" placeholder="e.g. Amazon Web Services" />
        </div>
        <div>
          {lbl('Issue Date')}
          <input {...register('issueDate')} type="date" className="input" />
        </div>
        <div>
          {lbl('Credential ID')}
          <input {...register('credentialId')} className="input" placeholder="Optional" />
        </div>
      </div>

      <div>
        {lbl('Credential URL')}
        <input {...register('credentialUrl')} className="input" placeholder="https://..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'end' }}>
        <div>
          {lbl('Display Order')}
          <input {...register('displayOrder', { valueAsNumber: true })} type="number" className="input" />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)', paddingBottom: '0.75rem' }}>
          <input type="checkbox" {...register('isPublished')} /> Published
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

const AdminCertifications = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-certifications'],
    queryFn: () => api.get('/certifications/admin/all').then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (body) =>
      editing?._id
        ? api.put(`/certifications/admin/${editing._id}`, body)
        : api.post('/certifications/admin', body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-certifications'] });
      qc.invalidateQueries({ queryKey: ['certifications'] });
      toast.success(editing?._id ? 'Certification updated' : 'Certification added');
      setEditing(null);
    },
    onError: () => toast.error('Failed to save'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/certifications/admin/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-certifications'] });
      qc.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Deleted');
    },
    onError: () => toast.error('Failed to delete'),
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) deleteMutation.mutate(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Certifications</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{data?.length || 0} entries</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing({})} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
            <FiPlus size={14} /> Add Certification
          </button>
        )}
      </div>

      {editing && (
        <CertForm
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
              <FiAward size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
              <p>No certifications yet.</p>
            </div>
          ) : (
            data.map((cert, i) => (
              <motion.div
                key={cert._id}
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
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  {cert.image?.url
                    ? <img src={cert.image.url} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    : <FiAward size={18} style={{ color: 'var(--accent)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{cert.title}</span>
                    {!cert.isPublished && (
                      <span style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', borderRadius: '9999px', background: 'var(--bg-muted)', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}>
                        Draft
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    {cert.issuer}
                    {cert.issueDate && ` · ${new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                    >
                      <FiExternalLink size={13} />
                    </a>
                  )}
                  <button
                    onClick={() => setEditing(cert)}
                    style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', background: 'transparent', cursor: 'pointer' }}
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id, cert.title)}
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

export default AdminCertifications;
