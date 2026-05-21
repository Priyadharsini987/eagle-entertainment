import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Disable scrolling when mobile menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const links = [
    { label: 'Events', path: '/events' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) {
      return location.hash === path.substring(1);
    }
    return location.pathname === path && location.hash === '';
  };

  const handleLinkClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      setMenuOpen(false);
      const targetId = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/' + path);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'var(--bg-card)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(223,178,89, 0.15)' : '1px solid transparent',
        padding: scrolled ? '0.8rem 0' : '1.5rem 0',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <img src="/logo.png" alt="Eagle Logo" style={{ width: 45, height: 45, objectFit: 'contain' }} />
            <div>
              <div className="display-font" style={{ fontSize:'1.4rem', fontWeight:800, color: 'var(--text-main)', letterSpacing:'-0.02em', lineHeight:1 }}>Eagle</div>
              <div style={{ fontSize:'0.65rem', letterSpacing:'0.15em', color:'var(--primary)', textTransform:'uppercase', fontWeight:600, marginTop: '4px' }}>Entertainment</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display:'flex', alignItems:'center', gap:'3rem' }} className="nav-desktop">
            {links.map(l => (
              <Link 
                key={l.path} 
                to={l.path} 
                onClick={(e) => handleLinkClick(e, l.path)}
                style={{
                  textDecoration:'none',
                  fontSize:'0.85rem', 
                  fontWeight: 600, 
                  letterSpacing:'0.02em',
                  color: isActive(l.path) ? '#fff' : 'var(--text-muted)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  padding: '0.5rem 0'
                }}
                onMouseEnter={e => {
                  if (!isActive(l.path)) e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  if (!isActive(l.path)) e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {l.label}
              </Link>
            ))}
            
            {user && (
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <Link to="/admin" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
                >
                  Admin
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '100px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburguer */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            style={{
              display:'none', 
              background: menuOpen ? 'var(--primary)' : 'rgba(223,178,89, 0.08)', 
              border:'1px solid rgba(223,178,89, 0.35)', 
              cursor:'pointer',
              color: menuOpen ? '#000' : '#fff', 
              fontSize:'0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '0.6rem 1.2rem',
              borderRadius: '100px',
              alignItems: 'center',
              gap: '0.5rem',
              outline: 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 1002
            }} 
            className="nav-hamburger"
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <div style={{
              width: 14,
              height: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <span style={{
                width: '100%', height: 1.5,
                background: menuOpen ? '#000' : '#fff',
                transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                transition: 'transform 0.3s ease'
              }} />
              <span style={{
                width: '100%', height: 1.5,
                background: menuOpen ? '#000' : '#fff',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s ease'
              }} />
              <span style={{
                width: '100%', height: 1.5,
                background: menuOpen ? '#000' : '#fff',
                transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                transition: 'transform 0.3s ease'
              }} />
            </div>
          </button>
        </div>

        {/* Mobile Overlay Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                height: '100vh',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(30px)',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                gap: '2.2rem'
              }}
            >
              {links.map((l, idx) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                >
                  <Link 
                    to={l.path} 
                    onClick={(e) => {
                      if (l.path.startsWith('/#')) {
                        handleLinkClick(e, l.path);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                    style={{
                      textDecoration:'none', 
                      color: isActive(l.path) ? 'var(--primary)' : '#fff',
                      fontWeight: 700, 
                      fontSize: '1.8rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.04em',
                      position: 'relative',
                      display: 'block',
                      textAlign: 'center',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + links.length * 0.05, duration: 0.5 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', maxWidth: '250px', marginTop: '1.5rem' }}
                >
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ width: '100%', fontSize: '0.8rem' }}>
                    ⚙️ Admin Portal
                  </Link>
                  <button onClick={() => { logout(); navigate('/'); setMenuOpen(false); }} className="btn-outline" style={{ width: '100%', fontSize: '0.8rem' }}>
                    🚪 Sign Out
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <style>{`
        @media(max-width:900px){
          .nav-desktop{display:none!important;}
          .nav-hamburger{display:inline-flex!important;}
        }
      `}</style>
    </>
  );
};

export default Navbar;
