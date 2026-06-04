import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiUpload, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { projectService } from '../../services/projectService.js';
import { profileService } from '../../services/profileService.js';

const CATEGORIES = ['mern', 'wordpress', 'shopify', 'custom', 'saas'];

const ProjectForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [featuredImagePreview, setFeaturedImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: { category: [], techStack: [], features: [], status: 'draft', isFeatured: false, isCaseStudy: false },
  });

  const techStack = watch('techStack') || [];
  const features = watch('features') || [];
  const categories = watch('category') || [];
  const excerptLen = (watch('excerpt') || '').length;

  const { data: existingProject } = useQuery({
    queryKey: ['project-form', id],
    queryFn: () => projectService.adminGetAll().then((r) => r.data?.find((p) => p._id === id)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existingProject) {
      reset(existingProject);
      setFeaturedImagePreview(existingProject.featuredImage?.url || '');
    }
  }, [existingProject, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? projectService.update(id, data) : projectService.create(data),
    onSuccess: () => {
      qc.invalidateQueries(['admin-projects']);
      toast.success(isEdit ? 'Project updated' : 'Project created');
      navigate('/admin/projects');
    },
    onError: (err) => toast.error(err.message || 'Failed to save project'),
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await profileService.uploadImage(formData);
      setValue('featuredImage', { url: res.data.url, publicId: res.data.publicId });
      setFeaturedImagePreview(res.data.url);
      toast.success('Image uploaded');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setValue('techStack', [...techStack, techInput.trim()]);
      setTechInput('');
    }
  };
  const removeTech = (t) => setValue('techStack', techStack.filter((x) => x !== t));

  const addFeature = () => {
    if (featureInput.trim()) {
      setValue('features', [...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };
  const removeFeature = (f) => setValue('features', features.filter((x) => x !== f));

  const toggleCategory = (cat) => {
    setValue('category', categories.includes(cat) ? categories.filter((c) => c !== cat) : [...categories, cat]);
  };

  const onSubmit = (data) => mutation.mutate(data);

  const field = (label, name, opts = {}) => (
    <div>
      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{label}</label>
      <input {...register(name, opts)} className="input" />
      {errors[name] && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors[name].message}</p>}
    </div>
  );

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/admin/projects')} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiArrowLeft size={15} />
        </button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{isEdit ? 'Edit Project' : 'New Project'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Basic */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Basic Information</h2>
          {field('Project Title *', 'title', { required: 'Title is required' })}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Excerpt</label>
              <span style={{ fontSize: '0.75rem', color: excerptLen > 180 ? '#ef4444' : excerptLen > 140 ? '#f59e0b' : 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                {excerptLen} / 200
              </span>
            </div>
            <textarea
              {...register('excerpt')}
              maxLength={200}
              rows={2}
              className="input"
              placeholder="Short description shown on project cards and meta tags."
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {field('Project URL', 'projectUrl')}
            {field('GitHub URL', 'githubUrl')}
          </div>

          {/* Status & toggles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Status</label>
              <select {...register('status')} className="input" style={{ width: 'auto', cursor: 'pointer' }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" {...register('isFeatured')} /> Featured
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" {...register('isCaseStudy')} /> Case Study
            </label>
          </div>
        </div>

        {/* Categories */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                style={{ padding: '0.35rem 0.85rem', borderRadius: '8px', border: '1px solid', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', background: categories.includes(cat) ? 'var(--accent)' : 'var(--bg-subtle)', color: categories.includes(cat) ? '#fff' : 'var(--text-secondary)', borderColor: categories.includes(cat) ? 'var(--accent)' : 'var(--border-default)', transition: 'all 0.2s ease' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Content</h2>
          {['description', 'problem', 'solution', 'challenges', 'results'].map((name) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'capitalize' }}>{name}</label>
              <textarea {...register(name)} rows={3} className="input" style={{ resize: 'vertical' }} />
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Tech Stack</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="e.g. React.js" className="input" style={{ flex: 1 }} />
            <button type="button" onClick={addTech} className="btn-secondary" style={{ flexShrink: 0, padding: '0.6rem 1rem' }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {techStack.map((t) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.8125rem', background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                {t}
                <button type="button" onClick={() => removeTech(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', display: 'flex', padding: 0 }}>
                  <FiX size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Features</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="e.g. Role-based authentication" className="input" style={{ flex: 1 }} />
            <button type="button" onClick={addFeature} className="btn-secondary" style={{ flexShrink: 0, padding: '0.6rem 1rem' }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {features.map((f) => (
              <div key={f} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'var(--bg-subtle)', borderRadius: '6px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {f}
                <button type="button" onClick={() => removeFeature(f)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                  <FiX size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Featured Image</h2>
          {featuredImagePreview ? (
            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
              <img src={featuredImagePreview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
              <button type="button" onClick={() => { setValue('featuredImage', { url: '', publicId: '' }); setFeaturedImagePreview(''); }} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiX size={13} />
              </button>
            </div>
          ) : (
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '2rem', border: '2px dashed var(--border-default)', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-default)'}
            >
              <FiUpload size={24} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{uploading ? 'Uploading...' : 'Click to upload image'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>
          )}
        </div>

        {/* Save */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" disabled={mutation.isPending} className="btn-primary" style={{ padding: '0.75rem 2rem', opacity: mutation.isPending ? 0.7 : 1 }}>
            <FiSave size={15} /> {mutation.isPending ? 'Saving...' : 'Save Project'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="btn-ghost" style={{ padding: '0.75rem 1.5rem' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
