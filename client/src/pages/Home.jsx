import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { profileService } from '../services/profileService.js';
import Hero from '../components/sections/Hero.jsx';
import StatsBar from '../components/sections/StatsBar.jsx';
import About from '../components/sections/About.jsx';
import Services from '../components/sections/Services.jsx';
import USP from '../components/sections/USP.jsx';
import TechStack from '../components/sections/TechStack.jsx';
import Experience from '../components/sections/Experience.jsx';
import Projects from '../components/sections/Projects.jsx';
import Certifications from '../components/sections/Certifications.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import Contact from '../components/sections/Contact.jsx';

const Home = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.get().then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });
  const profile = data;

  return (
    <>
      <Helmet>
        <title>Muhammad Hamza Temuri — Full Stack Developer | WordPress & Shopify Expert</title>
        <meta name="description" content="WordPress & Shopify Developer with 3+ years of professional experience building custom, high-performance websites for international agencies. Based in Karachi, Pakistan." />
        <meta name="keywords" content="Muhammad Hamza Temuri, Full Stack Developer, WordPress Developer, Shopify Developer, MERN Stack, Pakistan, Karachi, Freelance Developer" />
        <meta property="og:title" content="Muhammad Hamza Temuri — Full Stack Developer" />
        <meta property="og:description" content="WordPress & Shopify Developer with 3+ years building production-grade web solutions for international agencies." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Muhammad Hamza Temuri",
          "jobTitle": "Full Stack Developer",
          "email": "hamzatemuri2001@gmail.com",
          "telephone": "+923368328661",
          "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" },
          "knowsAbout": ["WordPress", "Shopify", "React.js", "Node.js", "MERN Stack", "PHP", "JavaScript"]
        })}</script>
      </Helmet>
      <Hero profile={profile} />
      <StatsBar />
      <About />
      <Services />
      <USP />
      <TechStack />
      <Experience />
      <Projects />
      <Certifications />
      <Testimonials />
      <Contact profile={profile} />
    </>
  );
};

export default Home;
