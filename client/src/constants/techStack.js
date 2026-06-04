import {
  SiHtml5, SiCss, SiJavascript, SiJquery, SiBootstrap, SiTailwindcss,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiSupabase, SiFirebase,
  SiWordpress, SiShopify, SiGit, SiGithub, SiFigma, SiCloudinary,
} from 'react-icons/si';
import { FaServer } from 'react-icons/fa';
import { FiTerminal, FiCode } from 'react-icons/fi';

export const techCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'jQuery', Icon: SiJquery, color: '#0769AD' },
      { name: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', Icon: SiExpress, color: '#888888' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    items: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    id: 'cms',
    label: 'CMS',
    items: [
      { name: 'WordPress', Icon: SiWordpress, color: '#21759B' },
      { name: 'Shopify', Icon: SiShopify, color: '#96BF48' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#6e40c9' },
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
      { name: 'Cloudinary', Icon: SiCloudinary, color: '#3448C5' },
      { name: 'REST APIs', Icon: FaServer, color: '#6366f1' },
      { name: 'Claude Code', Icon: FiTerminal, color: '#CC785C' },
      { name: 'Vibe Code', Icon: FiCode, color: '#0ea5e9' },
    ],
  },
];
