import { useQuery } from '@tanstack/react-query';
import SectionHeader from '../shared/SectionHeader.jsx';
import TimelineItem from '../shared/TimelineItem.jsx';
import api from '../../services/api.js';

const fallbackExperiences = [
  {
    _id: '1', company: 'Oreezo Digital Agency', location: 'Dubai, UAE', position: 'Senior Web Developer', type: 'remote', startDate: '2026-04-01', isCurrent: true,
    responsibilities: [
      'Developed and maintained WordPress and Shopify websites',
      'Customized themes, plugins, and third-party integrations based on project requirements',
      'Built responsive and user-friendly website interfaces using HTML, CSS, and JavaScript',
      'Resolved technical issues, optimized website performance, and maintained site security',
      'Managed hosting, domains, DNS, and website maintenance tasks',
      'Delivered multiple projects within deadlines while ensuring quality and responsiveness',
    ],
  },
  {
    _id: '2', company: 'Potens Digital', location: 'Canada', position: 'Senior Web Developer', type: 'hybrid', startDate: '2025-09-01', endDate: '2026-04-01',
    responsibilities: [
      'Designed and developed custom WordPress websites and interactive website sections',
      'Developed and customized WordPress plugins based on business requirements',
      'Extended website functionality using PHP, JavaScript, and jQuery',
      'Contributed to Shopify store development, theme customization, and Liquid section creation',
      'Managed dynamic website features and implemented client-specific functionalities',
      'Identified and resolved website bugs, technical issues, and performance bottlenecks',
    ],
  },
  {
    _id: '3', company: '7Star Solutions', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2025-05-01', endDate: '2025-09-01',
    responsibilities: [
      'Developed custom WordPress websites using Elementor and theme customization',
      'Built responsive and SEO-friendly website interfaces',
      'Optimized website performance and cross-browser compatibility',
      'Implemented client requirements into clean and maintainable solutions',
      'Customized plugins and website functionalities based on project requirements',
    ],
  },
  {
    _id: '4', company: 'Byteify Technologies', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2024-08-01', endDate: '2025-04-01',
    responsibilities: [
      'Developed custom WordPress websites with theme and plugin customization',
      'Built responsive frontend interfaces using HTML, CSS, JavaScript, React.js, and Tailwind CSS',
      'Added dynamic functionalities using PHP, JavaScript, and custom code solutions',
      'Optimized website performance, fixed bugs, and maintained site functionality',
      'Improved workflow efficiency using AI-assisted development tools',
      'Collaborated with design and backend teams on production-ready solutions',
    ],
  },
  {
    _id: '5', company: 'Tech Teams', location: 'Karachi, Pakistan', position: 'Web Developer', type: 'onsite', startDate: '2023-08-01', endDate: '2024-02-01',
    responsibilities: [
      'Developed and maintained WordPress websites using Elementor and customizations',
      'Created responsive website layouts using HTML, CSS, and JavaScript in PHP & React.js',
      'Fixed website issues and improved performance and responsiveness',
      'Customized plugins and website functionalities based on project requirements',
      'Assisted in delivering scalable and user-friendly web solutions',
    ],
  },
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
