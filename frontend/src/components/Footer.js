import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer style={{ 
      background: 'linear-gradient(to bottom, #070707, #020202)', 
      borderTop: '1px solid var(--border)', 
      padding: '6rem 0 3rem', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Premium ambient light effect */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-50px', 
        right: '5%', 
        width: '450px', 
        height: '450px', 
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', 
        pointerEvents: 'none' 
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          
          {/* Brand & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ 
                width: 48, height: 48, 
                borderRadius: '50%', 
                overflow: 'hidden', 
                border: '2px solid var(--primary)',
                background: 'url(/logo.png) center center no-repeat',
                backgroundSize: 'cover',
                boxShadow: 'var(--shadow-glow)'
              }} />
              <div>
                <div className="display-font" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', lineHeight: 1.1 }}>Eagle</div>
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.35em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700, marginTop: '2px' }}>Entertainment</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
              Tamil Nadu's premier event management agency based in Erode. Designing and delivering extraordinary experiences all over the state.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
              {['FB', 'IG', 'YT', 'LI'].map((s, i) => (
                <a key={i} href="#/" style={{
                  width: 38, height: 38, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)',
                  border: '1px solid rgba(212, 175, 55, 0.15)', background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', textDecoration: 'none', transition: 'var(--transition)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.boxShadow = 'none'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.8rem', fontFamily: 'var(--font-main)' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Our Events', path: '/events' }, 
                { label: 'Photo Gallery', path: '/gallery' }, 
                { label: 'About Us', path: '/about' }, 
                { label: 'Contact Us', path: '/contact' },
              ].map((l, i) => (
                <Link key={i} to={l.path} style={{
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem',
                  transition: 'var(--transition-fast)', display: 'inline-block', width: 'fit-content'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Offerings */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.8rem', fontFamily: 'var(--font-main)' }}>Specialties</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {['Luxury Weddings', 'Corporate Galas', 'Concerts & Shows', 'Exhibition Stalls', 'Private Celebrations'].map((s, i) => (
                <div key={i} style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--primary)', opacity: 0.8, fontSize: '0.9rem' }}>✦</span>{s}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.8rem', fontFamily: 'var(--font-main)' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { icon: '📍', val: 'Erode, Tamil Nadu, India' },
                { icon: '✉️', val: 'contact@eagleentertainment.com' },
                { icon: '📞', val: '+91 97902 41089' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', opacity: 0.85 }}>{c.icon}</span>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter / Join */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.8rem', fontFamily: 'var(--font-main)' }}>Stay Connected</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Subscribe to get updates on upcoming events and premium packages.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                required 
                style={{
                  flex: 1, padding: '0.75rem 1rem', background: 'rgba(5,5,5,0.7)',
                  border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '100px', color: '#fff', fontSize: '0.82rem', outline: 'none',
                  transition: 'var(--transition)'
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.72rem', minWidth: '80px', borderRadius: '100px' }}>Join</button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          height: '1px', 
          background: 'linear-gradient(to right, rgba(212, 175, 55, 0), rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0))', 
          margin: '4rem 0 2.5rem' 
        }} />

        {/* Footer Bottom Row */}
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Eagle Entertainment</span>. All Rights Reserved. Erode, Tamil Nadu.
          </p>
          <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Privacy Policy</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Terms</span>
            {user ? (
              <Link to="/admin" style={{ 
                color: 'var(--primary)', 
                fontSize: '0.8rem', 
                textDecoration: 'none', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
              >
                ⚙️ Admin Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" style={{ 
                color: 'var(--primary)', 
                fontSize: '0.8rem', 
                textDecoration: 'none', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
              >
                🔐 Executive Access
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
          gap: 3.5rem;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.2rem;
        }
        @media(max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
          }
        }
        @media(max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
        @media(max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
