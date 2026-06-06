import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import SectionHeader from '../shared/SectionHeader.jsx';
import { contactService } from '../../services/contactService.js';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, 'Please write at least 20 characters'),
});

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'hamzatemuri2001@gmail.com', href: 'mailto:hamzatemuri2001@gmail.com' },
  { icon: FiPhone, label: 'Phone / WhatsApp', value: '+92 336 8328661', href: 'tel:+923368328661' },
  { icon: FiMapPin, label: 'Location', value: 'Karachi, Pakistan', href: null },
];

const Contact = ({ profile }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await contactService.submit(data);
      toast.success("Message sent! I'll get back to you within 24 hours.");
      reset();
    } catch {
      toast.error('Something went wrong. Please email me directly.');
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Get In Touch"
          title="Let's Build Something Amazing Together"
          subtitle="Have a project in mind? Let's discuss how I can help you build it."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1.25rem' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.15rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >{value}</a>
                      ) : (
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Connect</h3>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="https://wa.me/923368328661" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem' }}>
                  <FaWhatsapp size={16} /> WhatsApp
                </a>
                {profile?.social?.linkedin && (
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem' }}>
                    <FiLinkedin size={16} />
                  </a>
                )}
                {profile?.social?.github && (
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem' }}>
                    <FiGithub size={16} />
                  </a>
                )}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
                Usually responds within 24 hours. Available for freelance projects and agency collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="card"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Full Name *</label>
                <input {...register('name')} placeholder="Your name" className={`input ${errors.name ? 'error' : ''}`} />
                {errors.name && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.name.message}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Email Address *</label>
                <input {...register('email')} placeholder="you@example.com" className={`input ${errors.email ? 'error' : ''}`} />
                {errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.email.message}</p>}
              </div>
            </div>

            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Subject *</label>
                <input {...register('subject')} placeholder="What do you need help with?" className={`input ${errors.subject ? 'error' : ''}`} />
                {errors.subject && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.subject.message}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Phone / WhatsApp <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional)</span></label>
                <input {...register('phone')} placeholder="+1 234 567 8900" className="input" />
              </div>
            </div>

            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Project Type</label>
                <select {...register('projectType')} className="input" style={{ cursor: 'pointer' }}>
                  <option value="">Select type</option>
                  <option>WordPress Website</option>
                  <option>Shopify Store</option>
                  <option>MERN Stack App</option>
                  <option>API Development</option>
                  <option>SEO / Performance</option>
                  <option>Website Maintenance</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Budget Range</label>
                <select {...register('budget')} className="input" style={{ cursor: 'pointer' }}>
                  <option value="">Select budget</option>
                  <option>Under $500</option>
                  <option>$500 – $1,000</option>
                  <option>$1,000 – $3,000</option>
                  <option>$3,000 – $5,000</option>
                  <option>$5,000+</option>
                  <option>Let's discuss</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Message *</label>
              <textarea {...register('message')} placeholder="Tell me about your project, goals, and timeline..." rows={5} className={`input ${errors.message ? 'error' : ''}`} style={{ resize: 'vertical', lineHeight: 1.6 }} />
              {errors.message && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
              <FiSend size={16} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
      <style>{`
        @media(max-width:768px) {
          #contact .container-custom > div { grid-template-columns: 1fr !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
