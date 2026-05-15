import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border)', padding: '6rem 0 3rem', position:'relative', overflow:'hidden' }}>
      {/* Decorative gradient blur */}
      <div style={{ position:'absolute', bottom:0, right:0, width:'300px', height:'300px', background:'radial-gradient(circle, rgba(99, 102, 241, 0.05), transparent 70%)', zIndex:0 }} />
      
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
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
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:1.8, marginBottom:'2rem' }}>
              Tamil Nadu's premier event management agency based in Erode. From grand weddings to corporate galas, we deliver professional excellence all over the state.
            </p>
            <div style={{ display:'flex', gap:'1rem' }}>
              {['FB', 'IG', 'YT', 'LI'].map((s, i) => (
                <button key={i} className="btn-outline" style={{
                  width:40, height:40, padding:0, borderRadius:'10px',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.7rem', background:'none', cursor:'pointer'
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="display-font" style={{ fontSize:'1.25rem', color:'#fff', marginBottom:'2rem' }}>Quick Links</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                { label:'Our Events', path:'/events' }, 
                { label:'Photo Gallery', path:'/gallery' }, 
                { label:'Recent Highlights', path:'/#highlights' },
                { label:'About Us', path:'/about' }, 
                { label:'Contact Us', path:'/contact' },
                { label:'Admin Portal', path:'/admin/login' },
              ].map((l, i) => (
                <Link key={i} to={l.path} style={{
                  color:'var(--text-muted)', textDecoration:'none', fontSize:'0.9rem',
                  transition:'var(--transition)', display:'block',
                }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="display-font" style={{ fontSize:'1.25rem', color:'#fff', marginBottom:'2rem' }}>What We Do</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {['Luxury Wedding Planning', 'Company Event Production', 'Live Music & Concerts', 'Stage & Decor Design', 'Product Launch Events'].map((s, i) => (
                <div key={i} style={{ color:'var(--text-muted)', fontSize:'0.9rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ color:'var(--primary)', opacity:0.6 }}>•</span>{s}
                </div>
              ))}
            </div>
          </div>

          {/* Global HQ */}
          <div>
            <h4 className="display-font" style={{ fontSize:'1.25rem', color:'#fff', marginBottom:'2rem' }}>Our Office</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', marginBottom:'2rem' }}>
              {[
                { icon:'📍', val:'Erode, Tamil Nadu (Serving All Over TN)' },
                { icon:'✉️', val:'contact@eagleentertainment.com' },
                { icon:'📞', val:'+91 97902 41089' },
              ].map((c, i) => (
                <div key={i} style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                  <span style={{ fontSize:'1.2rem', opacity:0.8 }}>{c.icon}</span>
                  <div style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:1.5 }}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="display-font" style={{ fontSize:'1.25rem', color:'#fff', marginBottom:'2rem' }}>Get Updates</h4>
            <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', lineHeight:1.6, marginBottom:'1.5rem' }}>
              Subscribe to get the latest news and special offers from Eagle Entertainment.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} style={{ display:'flex', gap:'0.5rem' }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                style={{
                  flex:1, padding:'0.75rem 1rem', background:'rgba(255,255,255,0.03)',
                  border:'1px solid var(--border)', borderRadius:'4px', color:'#fff', fontSize:'0.85rem', outline:'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding:'0.75rem 1.25rem', fontSize:'0.75rem' }}>Join</button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:'2.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.5rem' }}>
          <p style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}>
            © {new Date().getFullYear()} Eagle Entertainment. Making every event perfect.
          </p>
          <div style={{ display:'flex', gap:'2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Executive Login'].map((t, i) => (
              t === 'Executive Login' ? (
                <Link key={i} to="/admin/login" style={{ color:'var(--primary)', fontSize:'0.8rem', textDecoration:'none', transition:'var(--transition)', fontWeight:700 }}
                onMouseEnter={e => e.currentTarget.style.color='var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--primary)'}
                >{t}</Link>
              ) : (
                <span key={i} style={{ color:'var(--text-muted)', fontSize:'0.8rem', cursor:'default' }}>{t}</span>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
