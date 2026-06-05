import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiSave, FiUpload, FiLock } from 'react-icons/fi';
import { profileService } from '../../services/profileService.js';
import api from '../../services/api.js';

const AdminProfile = () => {
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data } = useQuery({
    queryKey: ['profile-admin'],
    queryFn: () => profileService.get().then((r) => r.data),
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const avatarPreview = uploadedAvatarUrl ?? data?.avatar?.url ?? '';

  const mutation = useMutation({
    mutationFn: (d) => profileService.update(d),
    onSuccess: () => toast.success('Profile updated'),
    onError: () => toast.error('Failed to update profile'),
  });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await profileService.uploadImage(fd);
      setUploadedAvatarUrl(res.data.url);
      mutation.mutate({ avatar: { url: res.data.url, publicId: res.data.publicId } });
    } catch (err) { console.error('Upload failed:', err); toast.error('Upload failed'); }
  };

  const onSubmit = (d) => mutation.mutate(d);

  const { register: regPw, handleSubmit: handlePw, reset: resetPw, formState: { errors: pwErrors } } = useForm();

  const pwMutation = useMutation({
    mutationFn: (d) => api.put('/auth/change-password', d),
    onSuccess: () => { toast.success('Password updated'); resetPw(); },
    onError: (err) => toast.error(err.message || 'Failed to update password'),
  });

  return (
    <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Profile Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Avatar */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-bg)', border: '2px solid var(--accent-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)', flexShrink: 0 }}>
            {avatarPreview ? <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'HT'}
          </div>
          <label className="btn-ghost" style={{ cursor: 'pointer', fontSize: '0.875rem' }}>
            <FiUpload size={14} /> Upload Photo
            <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Basic info */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Basic Information</h2>
          {[['Name', 'name'], ['Tagline', 'tagline'], ['Email', 'email'], ['Phone', 'phone'], ['Location', 'location']].map(([label, name]) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{label}</label>
              <input {...register(name)} className="input" />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Bio</label>
            <textarea {...register('bio')} rows={4} className="input" style={{ resize: 'vertical' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" {...register('isAvailable')} /> Available for freelance projects
          </label>
        </div>

        {/* Social */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Social Links</h2>
          {[['LinkedIn', 'social.linkedin'], ['GitHub', 'social.github'], ['Twitter', 'social.twitter'], ['Upwork', 'social.upwork'], ['Fiverr', 'social.fiverr']].map(([label, name]) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{label} URL</label>
              <input {...register(name)} className="input" placeholder="https://..." />
            </div>
          ))}
        </div>

        <button type="submit" disabled={mutation.isPending} className="btn-primary" style={{ width: 'fit-content', opacity: mutation.isPending ? 0.7 : 1 }}>
          <FiSave size={15} /> {mutation.isPending ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePw((d) => pwMutation.mutate(d))} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Change Password</h2>
          {[['Current Password', 'currentPassword'], ['New Password', 'newPassword'], ['Confirm New Password', 'confirmPassword']].map(([label, name]) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{label}</label>
              <input
                type="password"
                {...regPw(name, {
                  required: `${label} is required`,
                  ...(name === 'newPassword' && { minLength: { value: 8, message: 'Minimum 8 characters' } }),
                  ...(name === 'confirmPassword' && { validate: (v, vals) => v === vals.newPassword || 'Passwords do not match' }),
                })}
                className="input"
              />
              {pwErrors[name] && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{pwErrors[name].message}</p>}
            </div>
          ))}
        </div>
        <button type="submit" disabled={pwMutation.isPending} className="btn-primary" style={{ width: 'fit-content', opacity: pwMutation.isPending ? 0.7 : 1 }}>
          <FiLock size={15} /> {pwMutation.isPending ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
