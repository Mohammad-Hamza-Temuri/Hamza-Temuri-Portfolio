import { useQuery } from '@tanstack/react-query';
import SectionHeader from '../shared/SectionHeader.jsx';
import TimelineItem from '../shared/TimelineItem.jsx';
import api from '../../services/api.js';

const fallbackExperiences = [
  { _id: '1', company: 'Oreezo Digital Agency', location: 'Dubai, UAE', position: 'Senior Web Developer', type: 'remote', startDate: '2026-04-01', isCurrent: true, responsibilities: ['WordPress Development', 'Shopify Development', 'Custom Themes & Plugins', 'Performance Optimization', 'Hosting & DNS Management', 'Security Improvements', 'Website Maintenance'] },
  { _id: '2', company: 'Potens Digital', location: 'Canada', position: 'Senior Web Developer', type: 'hybrid', startDate: '2025-09-01', endDate: '2026-04-01', responsibilities: ['Custom WordPress Websites', 'Plugin Development', 'Shopify Theme Customization', 'Liquid Development', 'PHP Development', 'Client Requirement Implementations', 'Website Optimization'] },
  { _id: '3', company: '7Star Solutions', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2025-05-01', endDate: '2025-09-01', responsibilities: ['WordPress Development', 'Elementor', 'SEO-Friendly Websites', 'Performance Optimization', 'Plugin Customization'] },
  { _id: '4', company: 'Byteify Technologies', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2024-08-01', endDate: '2025-04-01', responsibilities: ['React.js Development', 'Tailwind CSS', 'WordPress Development', 'Frontend Development', 'PHP Development', 'Website Optimization'] },
  { _id: '5', company: 'Tech Teams', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2023-08-01', endDate: '2024-02-01', responsibilities: ['WordPress Development', 'React.js', 'HTML/CSS/JavaScript', 'Performance Optimization', 'Plugin Customization'] },
];

const Experience = () => {
  const { data } = useQuery({
    queryKey: ['experience'],
    queryFn: () => api.get('/experience').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const experiences = data?.length ? data : fallbackExperiences;

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Work History"
          title="Professional Experience"
          subtitle="3+ years working with agencies and companies across Pakistan, Canada, and Dubai."
        />
        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp._id} experience={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
