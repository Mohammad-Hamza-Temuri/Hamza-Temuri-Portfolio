import { useState, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiBriefcase, FiFileText, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../services/api.js';

const toDateInput = (val) => (val ? new Date(val).toISOString().split('T')[0] : '');

const typeColors = { remote: '#6366f1', hybrid: '#0ea5e9', onsite: '#22c55e' };

const label = (text) => (
  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
    {text}
  </label>
);

const ExperienceForm = ({ initial, onSave, onCancel, isSaving, onLetterUpload, isUploadingLetter }) => {
  const [responsibilities, setResponsibilities] = useState(initial?.responsibilities || []);
  const [respInput, setRespInput] = useState('');
  const [letterMeta, setLetterMeta] = useState(initial?.letter?.uploadedAt ? initial.letter : null);
  const letterInputRef = useRef(null);

  const handleLetterChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const result = await onLetterUpload(file);
    if (result) setLetterMeta(result);
  };
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      company: initial?.company || '',
      position: initial?.position || '',
      location: initial?.location || '',
      type: initial?.type || 'onsite',
      startDate: toDateInput(initial?.startDate),
      endDate: toDateInput(initial?.endDate),
      isCurrent: initial?.isCurrent || false,
      companyUrl: initial?.companyUrl || '',
      displayOrder: initial?.displayOrder ?? 0,
      isPublished: initial?.isPublished !== false,
    },
  });
  const isCurrent = watch('isCurrent');

  const addResp = () => {
    const v = respInput.trim();
    if (v && !responsibilities.includes(v)) setResponsibilities((p) => [...p, v]);
    setRespInput('');
  };
  const removeResp = (r) => setResponsibilities((p) => p.filter((x) => x !== r));

  const onSubmit = (data) => {
    if (data.isCurrent) data.endDate = undefined;
    onSave({ ...data, responsibilities });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        {initial?._id ? 'Edit Experience' : 'Add Experience'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          {label('Company *')}
          <input {...register('company')} required className="input" placeholder="e.g. Acme Corp" />
        </div>
        <div>
          {label('Position *')}
          <input {...register('position')} required className="input" placeholder="e.g. Senior Developer" />
        </div>
        <div>
          {label('Location *')}
          <input {...register('location')} required className="input" placeholder="e.g. Dubai, UAE" />
        </div>
        <div>
          {label('Type')}
          <select {...register('type')} className="input">
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>
        <div>
          {label('Start Date *')}
          <input {...register('startDate')} required type="date" className="input" />
        </div>
        <div>
          {label('End Date')}
          <input
            {...register('endDate')}
            type="date"
            className="input"
            disabled={isCurrent}
            style={{ opacity: isCurrent ? 0.4 : 1 }}
          />
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <input type="checkbox" {...register('isCurrent')} /> Currently working here
      </label>

      <div>
        {label('Company URL')}
        <input {...register('companyUrl')} className="input" placeholder="https://..." />
      </div>

      <div>
        {label('Responsibilities')}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            value={respInput}
            onChange={(e) => setRespInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResp())}
            className="input"
            placeholder="e.g. Built REST APIs — press Enter to add"
            style={{ flex: 1 }}
          />
          <button type="button" onClick={addResp} className="btn-ghost" style={{ flexShrink: 0, padding: '0.65rem 1rem' }}>
            Add
          </button>
        </div>
        {responsibilities.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {responsibilities.map((r) => (
              <span key={r} className="badge" style={{ gap: '0.4rem' }}>
                {r}
                <button
                  type="button"
                  onClick={() => removeResp(r)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1, fontSize: '1em', display: 'flex', alignItems: 'center' }}
                >
                  <FiX size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'end' }}>
        <div>
          {label('Display Order')}
          <input {...register('displayOrder', { valueAsNumber: true })} type="number" className="input" />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)', paddingBottom: '0.75rem' }}>
          <input type="checkbox" {...register('isPublished')} /> Published
        </label>
      </div>

      {initial?._id && (
        <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          {label('Experience Letter')}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {letterMeta?.uploadedAt ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <FiFileText size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                <span style={{ color: '#22c55e', fontWeight: 600 }}>Uploaded</span>
                <span style={{ color: 'var(--text-muted)' }}>
                  · {letterMeta.filename || 'experience-letter'} · {new Date(letterMeta.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            ) : (
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No letter uploaded yet</span>
            )}
            <input
              ref={letterInputRef}
              type="file"
              accept=".pdf,image/*"
              style={{ display: 'none' }}
              onChange={handleLetterChange}
            />
            <button
              type="button"
              onClick={() => letterInputRef.current?.click()}
              disabled={isUploadingLetter}
              className="btn-ghost"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.8125rem', opacity: isUploadingLetter ? 0.6 : 1 }}
            >
              <FiUpload size={13} />
              {isUploadingLetter ? 'Uploading…' : letterMeta?.uploadedAt ? 'Replace Letter' : 'Upload Letter'}
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button type="button" onClick={onCancel} className="btn-ghost" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
          <FiX size={14} /> Cancel
        </button>
        <button type="submit" disabled={isSaving} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem', opacity: isSaving ? 0.7 : 1 }}>
          <FiSave size={14} /> {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
};

const AdminExperience = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [uploadingLetter, setUploadingLetter] = useState(null);
  const fileInputRef = useRef(null);
  const pendingUploadId = useRef(null);

  const handleLetterClick = (id) => {
    pendingUploadId.current = id;
    fileInputRef.current?.click();
  };

  const handleLetterFile = async (e) => {
    const file = e.target.files?.[0];
    const id = pendingUploadId.current;
    e.target.value = '';
    if (!file || !id) return;
    setUploadingLetter(id);
    try {
      const fd = new FormData();
      fd.append('letter', file);
      await api.post(`/experience/admin/${id}/letter`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      qc.invalidateQueries(['admin-experience']);
      toast.success('Letter uploaded');
    } catch { toast.error('Upload failed'); }
    finally { setUploadingLetter(null); }
  };

  const handleLetterFromForm = useCallback(async (file) => {
    if (!editing?._id) return null;
    setUploadingLetter(editing._id);
    try {
      const fd = new FormData();
      fd.append('letter', file);
      const res = await api.post(`/experience/admin/${editing._id}/letter`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      qc.invalidateQueries(['admin-experience']);
      toast.success('Letter uploaded');
      return res.data?.data ?? null;
    } catch { toast.error('Upload failed'); return null; }
    finally { setUploadingLetter(null); }
  }, [editing, qc]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-experience'],
    queryFn: () => api.get('/experience/admin/all').then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (body) =>
      editing?._id
        ? api.put(`/experience/admin/${editing._id}`, body)
        : api.post('/experience/admin', body),
    onSuccess: () => {
      qc.invalidateQueries(['admin-experience']);
      qc.invalidateQueries(['experience']);
      toast.success(editing?._id ? 'Experience updated' : 'Experience added');
      setEditing(null);
    },
    onError: () => toast.error('Failed to save'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/experience/admin/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(['admin-experience']);
      qc.invalidateQueries(['experience']);
      toast.success('Deleted');
    },
    onError: () => toast.error('Failed to delete'),
  });

  const handleDelete = (id, company) => {
    if (window.confirm(`Delete experience at "${company}"?`)) deleteMutation.mutate(id);
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,image/*"
        style={{ display: 'none' }}
        onChange={handleLetterFile}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Experience</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{data?.length || 0} entries</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing({})} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
            <FiPlus size={14} /> Add Experience
          </button>
        )}
      </div>

      {editing && (
        <ExperienceForm
          initial={editing._id ? editing : undefined}
          onSave={(body) => saveMutation.mutate(body)}
          onCancel={() => setEditing(null)}
          isSaving={saveMutation.isPending}
          onLetterUpload={handleLetterFromForm}
          isUploadingLetter={uploadingLetter === editing._id}
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
              <FiBriefcase size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
              <p>No experience entries yet.</p>
            </div>
          ) : (
            data.map((exp, i) => (
              <motion.div
                key={exp._id}
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
                  background: editing?._id === exp._id ? 'var(--accent-bg)' : 'transparent',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{exp.company}</span>
                    <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.55rem', borderRadius: '9999px', fontWeight: 600, background: `${typeColors[exp.type]}18`, color: typeColors[exp.type], border: `1px solid ${typeColors[exp.type]}35`, textTransform: 'capitalize' }}>
                      {exp.type}
                    </span>
                    {!exp.isPublished && (
                      <span style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', borderRadius: '9999px', background: 'var(--bg-muted)', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }}>
                        Draft
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{exp.position}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate)} · {exp.location}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, alignItems: 'center' }}>
                  {exp.letter?.uploadedAt && (
                    <span title="Experience letter uploaded" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      Letter ✓
                    </span>
                  )}
                  <button
                    onClick={() => handleLetterClick(exp._id)}
                    disabled={uploadingLetter === exp._id}
                    title={exp.letter?.uploadedAt ? 'Replace experience letter' : 'Upload experience letter'}
                    style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: exp.letter?.uploadedAt ? '#22c55e' : 'var(--text-muted)', background: 'transparent', cursor: 'pointer', opacity: uploadingLetter === exp._id ? 0.5 : 1 }}
                  >
                    {uploadingLetter === exp._id ? <FiUpload size={12} /> : <FiFileText size={13} />}
                  </button>
                  <button
                    onClick={() => setEditing(exp)}
                    style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', background: 'transparent', cursor: 'pointer' }}
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id, exp.company)}
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

export default AdminExperience;
