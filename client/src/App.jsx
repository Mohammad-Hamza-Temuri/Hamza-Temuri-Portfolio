import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/themeStore.js';
import { useAuthStore } from './store/authStore.js';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import BackToTop from './components/layout/BackToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));
const CourtKonnect = lazy(() => import('./pages/CourtKonnect.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects.jsx'));
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm.jsx'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries.jsx'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile.jsx'));
const AdminResume = lazy(() => import('./pages/admin/AdminResume.jsx'));
const AdminExperience = lazy(() => import('./pages/admin/AdminExperience.jsx'));
const AdminCertifications = lazy(() => import('./pages/admin/AdminCertifications.jsx'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials.jsx'));

const Spinner = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--accent-bg)', borderTop: '3px solid var(--accent)', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicLayout = ({ children }) => (
  <>
    <ScrollProgress />
    <Navbar />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
    <Footer />
    <BackToTop />
  </>
);

const App = () => {
  const { initTheme } = useThemeStore();
  useEffect(() => { initTheme(); }, [initTheme]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            fontSize: '0.875rem',
            borderRadius: '10px',
          },
        }}
      />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/projects/court-konnect" element={<PublicLayout><CourtKonnect /></PublicLayout>} />
          <Route path="/projects/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="certifications" element={<AdminCertifications />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="resume" element={<AdminResume />} />
          </Route>
          <Route path="*" element={
            <PublicLayout>
              <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem' }}>404</h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
