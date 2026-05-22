import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    { label: 'Home', path: '/' },
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
        position: 'fixed', 
        top: 0, 
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0.8rem 2rem',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
      }}>
        <div className="nav-container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'0.6rem', flexShrink: 0 }}>
            <img src="/logo.png" className="nav-logo-img" alt="Eagle Entertainment Logo" style={{ width: 50, height: 50, minWidth: 50, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
            <div className="nav-brand-text" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
              <div className="display-font" style={{ fontSize:'1.4rem', fontWeight:800, color: 'var(--text-main)', letterSpacing:'-0.02em', lineHeight:1 }}>Eagle</div>
              <div className="nav-brand-sub" style={{ fontSize:'0.65rem', letterSpacing:'0.15em', color:'var(--primary)', textTransform:'uppercase', fontWeight:600, marginTop: '4px' }}>Entertainment</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingBottom: '2px' }} className="nav-desktop">
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
                  background: isActive(l.path) ? 'var(--primary)' : 'transparent',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '0.35rem 0.75rem'
                }}
                onMouseEnter={e => {
                  if (!isActive(l.path)) {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(l.path)) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }
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
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <style>{`
        .nav-desktop::-webkit-scrollbar { display: none; }
        
        @media(max-width: 900px) {
          .nav-desktop {
            display: grid !important;
            grid-template-columns: repeat(3, auto);
            gap: 0.4rem 0.6rem !important;
            justify-content: end;
          }
          .nav-desktop a {
            text-align: center;
            font-size: 0.75rem !important;
          }
        }
        @media(max-width: 450px) {
          .nav-desktop {
            grid-template-columns: repeat(2, auto);
          }
          .nav-brand-text .display-font {
            font-size: 1.15rem !important;
          }
          .nav-brand-sub {
            font-size: 0.55rem !important;
          }
          .nav-logo-img {
            width: 42px !important;
            height: 42px !important;
            min-width: 42px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
