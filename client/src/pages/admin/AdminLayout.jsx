import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiFolder, FiBriefcase, FiAward, FiStar,
  FiUser, FiUpload, FiLogOut, FiMenu, FiX, FiMail, FiSun, FiMoon,
} from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore.js';
import { useThemeStore } from '../../store/themeStore.js';

const navItems = [
  { icon: FiGrid, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: FiFolder, label: 'Projects', path: '/admin/projects' },
  { icon: FiBriefcase, label: 'Experience', path: '/admin/experience' },
  { icon: FiAward, label: 'Certifications', path: '/admin/certifications' },
  { icon: FiStar, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: FiMail, label: 'Inquiries', path: '/admin/inquiries' },
  { icon: FiUser, label: 'Profile', path: '/admin/profile' },
  { icon: FiUpload, label: 'Resume', path: '/admin/resume' },
];

const SidebarContent = ({ collapsed, setCollapsed, setMobileOpen, theme, toggleTheme, onLogout }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Logo */}
    <div style={{ padding: collapsed ? '1.25rem 1rem' : '1.25rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
      {!collapsed && (
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          <span style={{ color: 'var(--accent)' }}>H</span>amza Admin
        </span>
      )}
      <button onClick={() => setCollapsed(!collapsed)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {collapsed ? <FiMenu size={14} /> : <FiX size={14} />}
      </button>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: '0.75rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
      {navItems.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={path}
          to={path}
          onClick={() => setMobileOpen(false)}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: collapsed ? '0.65rem' : '0.65rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
            background: isActive ? 'var(--accent-bg)' : 'transparent',
            border: `1px solid ${isActive ? 'var(--accent-border)' : 'transparent'}`,
            transition: 'all 0.2s ease',
            justifyContent: collapsed ? 'center' : 'flex-start',
            textDecoration: 'none',
          })}
        >
          <Icon size={16} />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>

    {/* Bottom */}
    <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <button onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: collapsed ? '0.65rem' : '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start', width: '100%' }}>
        {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
        {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
      </button>
      <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: collapsed ? '0.65rem' : '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.875rem', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start', width: '100%' }}>
        <FiLogOut size={16} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  </div>
);

const AdminLayout = () => {
  const { logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarWidth = collapsed ? '64px' : '220px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Desktop Sidebar */}
      <aside style={{ width: sidebarWidth, background: 'var(--bg-subtle)', borderRight: '1px solid var(--border-default)', transition: 'width 0.25s ease', flexShrink: 0, position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100, overflow: 'hidden' }} className="desktop-sidebar">
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ duration: 0.25 }} style={{ position: 'fixed', top: 0, left: 0, width: '240px', height: '100vh', background: 'var(--bg-subtle)', borderRight: '1px solid var(--border-default)', zIndex: 201 }}>
              <SidebarContent
                collapsed={false}
                setCollapsed={setCollapsed}
                setMobileOpen={setMobileOpen}
                theme={theme}
                toggleTheme={toggleTheme}
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: sidebarWidth, transition: 'margin-left 0.25s ease', minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Topbar */}
        <header style={{ height: '60px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem', position: 'sticky', top: 0, zIndex: 50 }}>
          <button onClick={() => setMobileOpen(true)} className="mobile-menu-btn" style={{ display: 'none', width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}>
            <FiMenu size={16} />
          </button>
          <div style={{ flex: 1 }} />
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8125rem' }}>
            View Portfolio ↗
          </a>
        </header>
        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media(max-width:768px) {
          .desktop-sidebar { display: none !important; }
          .admin-main { margin-left: 0 !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
