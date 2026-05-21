import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-main)' }}>
      <div style={{ textAlign:'center' }}>
        <div className="display-font" style={{ fontSize:'2.5rem', color: 'var(--text-main)', letterSpacing:'0.2em', marginBottom:'1rem' }}>
          EAGLE <span style={{ color:'var(--primary)' }}>ENTERTAINMENT</span>
        </div>
        <div style={{ color:'var(--text-muted)', fontSize:'0.75rem', letterSpacing:'0.4em', textTransform:'uppercase' }}>Securely Loading</div>
      </div>
    </div>
  );
  if (!user || user.role !== 'ADMIN') return <Navigate to="/admin/login" replace />;
  return children;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <div className="mobile-bottom-bar">
      <Link to="/contact" className="btn-primary" style={{ padding:'0.75rem 2rem', fontSize:'0.75rem', width:'100%' }}>Book Your Event Now</Link>
    </div>
  </>
);

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
    <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
    <Route path="/events/:id" element={<PublicLayout><EventDetail /></PublicLayout>} />
    <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
    <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
    <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    } />

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
