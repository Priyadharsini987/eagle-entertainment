import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer style={{ 
      background: 'var(--bg-main)', 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      padding: '5rem 0 2rem', 
      position: 'relative'
    }}>
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div>
                <div className="display-font" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>Eagle</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600, marginTop: '4px' }}>Entertainment</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.5rem 0 1rem', maxWidth: '280px' }}>
              Crafting extraordinary luxury experiences and unforgettable events.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Twitter', 'Instagram', 'LinkedIn'].map((s, i) => (
                <a key={i} href="#/" style={{
                  fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'var(--transition)'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Our Events', path: '/events' }, 
                { label: 'Photo Gallery', path: '/gallery' }, 
                { label: 'About Us', path: '/about' }, 
                { label: 'Contact Us', path: '/contact' },
              ].map((l, i) => (
                <Link key={i} to={l.path} style={{
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem',
                  transition: 'var(--transition-fast)', display: 'inline-block'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Corporate Events', 'Luxury Weddings', 'Concerts', 'Exhibitions'].map((s, i) => (
                <div key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter / Join */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>Stay Updated</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Get the latest news on premium events.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                required 
                style={{
                  flex: 1, padding: '0.6rem 1rem', background: 'transparent',
                  border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none'
                }}
              />
              <button type="submit" style={{ 
                background: '#fff', color: '#000', padding: '0.6rem 1.25rem', 
                fontSize: '0.85rem', fontWeight: 600, borderRadius: '100px', border: 'none', cursor: 'pointer' 
              }}>Subscribe</button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          height: '1px', 
          background: 'rgba(255,255,255,0.05)', 
          margin: '4rem 0 2rem' 
        }} />

        {/* Footer Bottom Row */}
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} Eagle Entertainment. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Privacy Policy</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Terms of Service</span>
            {user ? (
              <Link to="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                Admin
              </Link>
            ) : (
              <Link to="/admin/login" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 4rem;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media(max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        @media(max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
