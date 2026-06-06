import {
  SiHtml5, SiCss, SiJavascript, SiJquery, SiBootstrap, SiTailwindcss,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiSupabase, SiFirebase,
  SiWordpress, SiShopify, SiGithub, SiFigma, SiCloudinary,
  SiOpenai, SiTrello, SiSlack, SiGoogledrive,
  SiVercel, SiRailway, SiRender,
} from 'react-icons/si';
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
      { name: 'GitHub', Icon: SiGithub, color: '#6e40c9' },
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
      { name: 'Cloudinary', Icon: SiCloudinary, color: '#3448C5' },
      { name: 'ChatGPT', Icon: SiOpenai, color: '#10a37f' },
      { name: 'Trello', Icon: SiTrello, color: '#0052CC' },
      { name: 'Slack', Icon: SiSlack, color: '#4A154B' },
      { name: 'Google Drive', Icon: SiGoogledrive, color: '#1FA463' },
      { name: 'Vercel', Icon: SiVercel, color: '#888888' },
      { name: 'Railway', Icon: SiRailway, color: '#7C3AED' },
      { name: 'Render', Icon: SiRender, color: '#46E3B7' },
      { name: 'Claude Code', Icon: FiTerminal, color: '#CC785C' },
      { name: 'Vibe Code', Icon: FiCode, color: '#0ea5e9' },
    ],
  },
];
