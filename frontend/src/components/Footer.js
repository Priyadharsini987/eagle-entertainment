import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer style={{ 
      background: 'linear-gradient(to bottom, #070707, #0b0b0b)', 
      borderTop: '1px solid rgba(201,168,76,0.12)', 
      padding: '5rem 0 2.5rem', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Premium ambient light effect */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        right: '10%', 
        width: '350px', 
        height: '350px', 
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.05), transparent 70%)', 
        pointerEvents: 'none' 
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          {/* Brand & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>Eagle</div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>Entertainment</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
              Tamil Nadu's premier event management agency based in Erode. Designing and delivering extraordinary experiences all over the state.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              {['FB', 'IG', 'YT', 'LI'].map((s, i) => (
                <a key={i} href="#/" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Our Events', path: '/events' }, 
                { label: 'Photo Gallery', path: '/gallery' }, 
                { label: 'About Us', path: '/about' }, 
                { label: 'Contact Us', path: '/contact' },
              ].map((l, i) => (
                <Link key={i} to={l.path} style={{
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem',
                  transition: 'color 0.2s ease', display: 'inline-block', width: 'fit-content'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Offerings */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Specialties</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Luxury Weddings', 'Corporate Galas', 'Concerts & Shows', 'Exhibition Stalls', 'Private Celebrations'].map((s, i) => (
                <div key={i} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', opacity: 0.6 }}>•</span>{s}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', val: 'Erode, Tamil Nadu, India' },
                { icon: '✉️', val: 'contact@eagleentertainment.com' },
                { icon: '📞', val: '+91 97902 41089' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', opacity: 0.7 }}>{c.icon}</span>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter / Join */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Stay Connected</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Subscribe to get updates on upcoming events and premium packages.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} style={{ display: 'flex', gap: '0.35rem' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                required 
                style={{
                  flex: 1, padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem' }}>Join</button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          height: '1px', 
          background: 'linear-gradient(to right, rgba(201,168,76,0), rgba(201,168,76,0.15), rgba(201,168,76,0))', 
          margin: '3rem 0 2rem' 
        }} />

        {/* Footer Bottom Row */}
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
            © {new Date().getFullYear()} Eagle Entertainment. All Rights Reserved. Erode, Tamil Nadu.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Privacy Policy</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Terms</span>
            {user ? (
              <Link to="/admin" style={{ 
                color: 'var(--primary)', 
                fontSize: '0.78rem', 
                textDecoration: 'none', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
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
                fontSize: '0.78rem', 
                textDecoration: 'none', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
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
          gap: 2.5rem;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media(max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }
        @media(max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
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
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
