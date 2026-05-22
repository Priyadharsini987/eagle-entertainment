import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer style={{ 
      background: 'var(--bg-main)', 
      borderTop: '1px solid var(--border)', 
      padding: '5rem 0 2rem', 
      position: 'relative'
    }}>
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="footer-grid"
        >
          
          {/* Brand & Socials */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src="/logo.png" alt="Eagle Entertainment Logo" style={{ width: 65, height: 65, minWidth: 65, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
              <div>
                <div className="display-font" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1 }}>Eagle</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600, marginTop: '4px' }}>Entertainment</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.5rem 0 1rem', maxWidth: '280px' }}>
              Crafting extraordinary luxury experiences and unforgettable events.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://wa.me/919790241089" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition)' }} onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.15)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="https://instagram.com/eagle_entertainment__" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition)' }} onMouseEnter={e => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.15)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links & Services */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} style={{ display: 'flex', gap: '3rem' }}>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem' }}>Explore</h4>
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

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem' }}>Services</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Corporate Events', 'Luxury Weddings', 'Concerts', 'Exhibitions'].map((s, i) => (
                  <div key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(99,102,241,0.1)', borderRadius: '50%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Mobile</div>
                  <a href="tel:+919790241089" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-main)'}>+91 9790241089</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(99,102,241,0.1)', borderRadius: '50%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Email</div>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=eagleentertainment.events@gmail.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-main)'}>eagleentertainment.events@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(99,102,241,0.1)', borderRadius: '50%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Instagram</div>
                  <a href="https://instagram.com/eagle_entertainment__" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-main)'}>@eagle_entertainment_</a>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          style={{ 
          height: '1px', 
          background: 'var(--border)', 
          margin: '4rem 0 2rem',
          transformOrigin: 'center'
        }} />

        {/* Footer Bottom Row */}
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} Eagle Entertainment. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

            {user ? (
              <Link to="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                Admin
              </Link>
            ) : (
              <Link to="/admin/login" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                Executive Login
              </Link>
            )}
          </div>
        </div>

        {/* Developer Credits */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.05)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          Website by <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Priya</span> &nbsp;|&nbsp; Contact: <a href="tel:+917010072474" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-fast)' }} onMouseEnter={e => e.target.style.color='var(--primary)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>+91 7010072474</a>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 2fr 2fr;
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
