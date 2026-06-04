import { SiReact, SiWordpress, SiShopify, SiNodedotjs } from 'react-icons/si';
import { MdSpeed } from 'react-icons/md';
import { FiServer } from 'react-icons/fi';

export const services = [
  {
    id: 'mern',
    title: 'MERN Stack Development',
    icon: SiReact,
    color: '#61DAFB',
    description: 'Full-stack web applications built with MongoDB, Express.js, React.js, and Node.js. Scalable, maintainable, and production-ready.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    benefits: ['Custom SaaS platforms', 'Real-time applications', 'REST APIs', 'Role-based access control'],
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    icon: SiWordpress,
    color: '#21759B',
    description: 'Custom WordPress themes and plugins built from scratch. High-performance, SEO-optimized, and tailored to your brand.',
    tech: ['PHP', 'WordPress', 'Elementor', 'ACF', 'WooCommerce', 'Custom Post Types'],
    benefits: ['Custom theme development', 'Plugin development', 'Performance optimization', 'Security hardening'],
  },
  {
    id: 'shopify',
    title: 'Shopify Development',
    icon: SiShopify,
    color: '#96BF48',
    description: 'Conversion-optimized Shopify stores with custom Liquid themes, app integrations, and performance tuning.',
    tech: ['Liquid', 'Shopify CLI', 'JavaScript', 'CSS', 'Shopify Apps'],
    benefits: ['Custom theme development', 'Liquid templating', 'App integrations', 'Checkout optimization'],
  },
  {
    id: 'api',
    title: 'API Development',
    icon: SiNodedotjs,
    color: '#339933',
    description: 'RESTful APIs built with Node.js and Express.js. Secure, documented, and built for scale.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST', 'Postman'],
    benefits: ['RESTful architecture', 'JWT authentication', 'Rate limiting', 'API documentation'],
  },
  {
    id: 'hosting',
    title: 'Hosting & Domain Management',
    icon: FiServer,
    color: '#6366f1',
    description: 'End-to-end hosting setup, domain configuration, and ongoing server management across all major platforms — so your site stays fast, secure, and online.',
    tech: ['SiteGround', 'Hostinger', 'Namecheap', 'GoDaddy', 'Hoster.pk', 'cPanel'],
    benefits: ['Hosting setup & migration', 'Domain & DNS configuration', 'SSL certificate setup', 'Ongoing server management'],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    icon: MdSpeed,
    color: '#f59e0b',
    description: 'Diagnose and fix slow websites. Target 90+ Lighthouse scores with image optimization, caching, and code splitting.',
    tech: ['Lighthouse', 'GTmetrix', 'WebP', 'Lazy Loading', 'CDN', 'Caching'],
    benefits: ['90+ Lighthouse score', 'Image optimization', 'Caching strategies', 'Core Web Vitals'],
  },
];
