import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiUpload, FiDownload, FiFileText } from 'react-icons/fi';
import { profileService } from '../../services/profileService.js';

const AdminResume = () => {
  const [uploading, setUploading] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ['profile-admin'],
    queryFn: () => profileService.get().then((r) => r.data),
  });

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('resume', file);
      const res = await profileService.uploadResume(fd);
      await profileService.update({ resume: { url: res.data.url, publicId: res.data.publicId, uploadedAt: new Date() } });
      refetch();
      toast.success('Resume uploaded successfully');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Resume Management</h1>
      <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '16px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiFileText size={32} style={{ color: 'var(--accent)' }} />
        </div>
        {data?.resume?.url ? (
          <>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Current Resume</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Last updated: {data.resume.uploadedAt ? new Date(data.resume.uploadedAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={data.resume.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <FiDownload size={14} /> Download
              </a>
              <label className="btn-ghost" style={{ cursor: 'pointer' }}>
                <FiUpload size={14} /> Replace
                <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
              </label>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)' }}>No resume uploaded yet.</p>
            <label className="btn-primary" style={{ cursor: 'pointer' }}>
              <FiUpload size={14} /> {uploading ? 'Uploading...' : 'Upload Resume (PDF)'}
              <input type="file" accept=".pdf" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminResume;
