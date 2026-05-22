import React, { useState, useEffect, useRef } from 'react';
import { publicApi, getImageUrl } from '../services/api';
import EventCard from '../components/EventCard';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [lightbox, setLightbox] = useState(null);
  const highlightsRef = useRef(null);

  useEffect(() => {
    publicApi.getGallery().then(r => setImages(r.data)).catch(() => {});
    publicApi.getRecentEvents().then(r => setRecentEvents(r.data)).catch(() => {});
  }, []);

  const categories = ['ALL', ...new Set(images.map(img => img.category))];
  const filtered = filter === 'ALL' ? images : images.filter(img => img.category === filter);

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      
      {/* Header */}
      <div style={{
        background:'var(--bg-surface)', borderBottom:'1px solid var(--border)',
        padding:'7rem 0 5rem', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1600)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.12 }} />
        <div className="container" style={{ position:'relative', zIndex: 1 }}>
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >Our Photos</motion.span>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >Real Event <span>Gallery</span></motion.h1>
          <motion.p 
            style={{ color:'var(--text-muted)', maxWidth:640, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.85 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Take a look at some of the amazing events we have managed and the special moments we've captured.
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ padding:'4rem 2.5rem' }}>
        
        {/* Filters */}
        <div style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap', marginBottom:'4.5rem', justifyContent:'center' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              style={{
                padding:'0.75rem 2rem',
                background: filter === cat ? 'var(--primary)' : 'rgba(255,255,255, 0.04)',
                border: `1px solid ${filter === cat ? 'var(--primary)' : 'rgba(255,255,255, 0.15)'}`,
                color: '#fff',
                borderRadius:'100px', 
                cursor:'pointer', 
                fontSize:'0.72rem',
                fontWeight:700, 
                letterSpacing:'0.15em', 
                textTransform:'uppercase',
                transition:'var(--transition)',
              }}
              onMouseEnter={e => {
                if (filter !== cat) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary-light)';
                }
              }}
              onMouseLeave={e => {
                if (filter !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255, 0.15)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Masonry-style grid with animation */}
        <motion.div 
          layout
          style={{
            columns: '320px 4', columnGap:'2rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div 
                layout
                key={img.id} 
                className="glass-card gallery-item" 
                style={{
                  marginBottom:'2rem', breakInside:'avoid',
                  cursor:'pointer', overflow:'hidden', position:'relative',
                  borderRadius:'var(--radius-md)',
                  border: '1px solid rgba(255,255,255, 0.08)'
                }}
                onClick={() => setLightbox(img)}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
              >
                <img src={getImageUrl(img.imageUrl)} alt={img.title}
                  style={{ width:'100%', display:'block', objectFit:'cover', transition:'var(--transition)' }}
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'; }}
                />
                
                {/* Hover overlay description */}
                <div style={{
                  position:'absolute', inset:0, 
                  background:'linear-gradient(to top, var(--bg-card) 0%, var(--bg-card) 60%, transparent 100%)',
                  opacity:0, transition:'opacity 0.4s ease', 
                  display:'flex', alignItems:'flex-end', padding:'2rem',
                }}
                className="gallery-overlay"
                >
                  <div style={{ transform: 'translateY(10px)', transition: 'transform 0.4s ease' }} className="gallery-overlay-text">
                    <div style={{ color: 'var(--text-main)', fontFamily:'var(--font-display)', fontSize:'1.35rem', marginBottom:'0.35rem', fontWeight: 600 }}>{img.title}</div>
                    <div style={{ color:'var(--primary-light)', fontSize:'0.7rem', fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase' }}>{img.category}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="glass-card" style={{ textAlign:'center', padding:'8rem 2rem', color:'var(--text-muted)' }}>
            <div style={{ fontSize:'4.5rem', marginBottom:'1.5rem', opacity:0.25 }}>📷</div>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.6rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No media found</h3>
            <p>We are adding more photos to this category soon.</p>
          </div>
        )}
      </div>

      {/* Recent Highlights Section */}
      <section style={{ background:'var(--bg-surface)', padding:'7.5rem 0', borderTop:'1px solid var(--border)' }} id="highlights" ref={highlightsRef}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3.5rem', flexWrap:'wrap', gap:'1.5rem' }}>
            <div>
              <span className="section-label">Real Moments</span>
              <h2 className="section-title" style={{ fontSize:'clamp(2rem, 4vw, 2.6rem)', marginBottom:0 }}>Recent <span>Highlights</span></h2>
            </div>
          </div>
          
          <div style={{ display:'flex', gap:'2.2rem', overflowX:'auto', paddingBottom:'2rem', scrollbarWidth:'none' }}>
            <style>{`div::-webkit-scrollbar{display:none}`}</style>
            {recentEvents.length === 0 ? (
              <div className="glass-card" style={{ padding:'5rem', width:'100%', textAlign:'center', color:'var(--text-muted)' }}>
                We are adding our latest highlights soon.
              </div>
            ) : recentEvents.map(ev => (
              <div key={ev.id} style={{ minWidth:350, maxWidth:350, flexShrink:0 }}>
                <EventCard event={ev} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)} 
            style={{
              position:'fixed', inset:0, zIndex:9999,
              background:'rgba(3, 3, 3, 0.98)', backdropFilter:'blur(30px)',
              display:'flex', alignItems:'center', justifyContent:'center',
              padding:'2.5rem',
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightbox(null)} 
              style={{
                position:'absolute', top:'2rem', right:'2rem',
                background:'rgba(255,255,255, 0.08)', 
                border:'1px solid rgba(255,255,255, 0.3)', 
                color: 'var(--text-main)', 
                width:50, height:50, borderRadius:'50%', fontSize:'1.2rem', cursor:'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'var(--transition)'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255, 0.3)'; e.currentTarget.style.background='rgba(255,255,255, 0.08)'; e.currentTarget.style.color='#fff'; }}
            >✕</button>
            
            {/* Modal Box */}
            <motion.div 
              onClick={e => e.stopPropagation()} 
              style={{ maxWidth:1100, width:'100%' }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src={getImageUrl(lightbox.imageUrl)} 
                alt={lightbox.title} 
                style={{ 
                  width:'100%', 
                  borderRadius:'var(--radius-sm)', 
                  maxHeight:'70vh', 
                  objectFit:'contain', 
                  boxShadow:'0 30px 65px var(--bg-card)',
                  border: '1px solid rgba(255,255,255, 0.15)'
                }} 
              />
              <div style={{ marginTop:'2.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center' }}>
                <h2 className="display-font" style={{ fontSize:'2.4rem', color: 'var(--text-main)', marginBottom:'0.5rem', fontWeight: 600 }}>{lightbox.title}</h2>
                <div style={{ color:'var(--primary)', fontSize:'0.75rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:'2.2rem' }}>{lightbox.category}</div>
                <a 
                  href={getImageUrl(lightbox.imageUrl)} 
                  download 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary" 
                  style={{ padding:'0.9rem 2.8rem', fontSize:'0.78rem' }}
                >
                  Download High-Res
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-item:hover .gallery-overlay { 
          opacity: 1 !important; 
        }
        .gallery-item:hover .gallery-overlay-text {
          transform: translateY(0) !important;
        }
        .gallery-item:hover img { 
          transform: scale(1.06); 
        }
      `}</style>
    </div>
  );
};

export default Gallery;
