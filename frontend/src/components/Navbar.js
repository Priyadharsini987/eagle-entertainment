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
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Highlights', path: '/#highlights' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.1)' : 'none',
        padding: scrolled ? '0.7rem 0' : '1.2rem 0',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{ 
              width: 50, height: 50, 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '2px solid var(--primary)',
              background: 'url(/logo.png) center center no-repeat',
              backgroundSize: 'cover',
              boxShadow: 'var(--shadow-glow)'
            }} />
            <div>
              <div style={{ fontSize:'1.2rem', fontWeight:700, color:'#fff', letterSpacing:'-0.02em', lineHeight:1 }}>Eagle</div>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.4em', color:'var(--primary)', textTransform:'uppercase', fontWeight:600 }}>Entertainment</div>
            </div>
          </Link>

          <div style={{ display:'flex', alignItems:'center', gap:'2.5rem' }} className="nav-desktop">
            {links.map(l => (
              <Link key={l.path} to={l.path} style={{
                textDecoration:'none',
                fontSize:'0.85rem', fontWeight:600, letterSpacing:'0.03em',
                color: isActive(l.path) ? '#fff' : 'rgba(255,255,255,0.7)',
                transition:'var(--transition)',
                position: 'relative',
                padding: '0.5rem 0'
              }}>
                {l.label}
                <span style={{ 
                  position:'absolute', bottom:0, left:0, 
                  width: isActive(l.path) ? '100%' : '0%', 
                  height: 2, 
                  background:'var(--primary)',
                  transition: 'width 0.3s ease',
                  boxShadow: '0 0 10px var(--primary)'
                }} />
              </Link>
            ))}
            {user && (
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <Link to="/admin" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  background: 'rgba(201, 168, 76, 0.08)',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201, 168, 76, 0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(201, 168, 76, 0.08)'}
                >
                  ⚙️ Admin Portal
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248, 113, 113, 0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display:'none', background:'none', border:'none', cursor:'pointer',
            color:'#fff', fontSize:'1.5rem',
          }} className="nav-hamburger">{menuOpen ? '✕' : '☰'}</button>
        </div>

        {menuOpen && (
          <div style={{
            background:'var(--bg-surface)',
            borderTop:'1px solid var(--border)',
            padding:'2rem', display:'flex', flexDirection:'column', gap:'1.5rem',
            animation: 'fadeInUp 0.3s ease',
          }}>
            {links.map(l => (
              <Link key={l.path} to={l.path} style={{
                textDecoration:'none', color: isActive(l.path) ? 'var(--primary)' : '#fff',
                fontWeight:500, fontSize:'1.1rem',
              }}>{l.label}</Link>
            ))}
            {user && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '1.2rem', marginTop: '0.5rem' }}>
                <Link to="/admin" style={{ color:'var(--primary)', textDecoration:'none', fontWeight:600 }}>⚙️ Admin Portal</Link>
                <div onClick={() => { logout(); navigate('/'); }} style={{ color:'#f87171', cursor:'pointer', fontWeight:600 }}>🚪 Sign Out</div>
              </div>
            )}
          </div>
        )}
      </nav>
      <style>{`
        @media(max-width:900px){
          .nav-desktop{display:none!important;}
          .nav-hamburger{display:block!important;}
        }
      `}</style>
    </>
  );
};

export default Navbar;
