import React, { useState, useEffect, useRef } from 'react';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';

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
        padding:'6rem 0 4rem', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1600)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.1 }} />
        <div className="container" style={{ position:'relative' }}>
          <span className="section-label">Our Photos</span>
          <h1 className="section-title">Real Event <span>Gallery</span></h1>
          <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.8 }}>
            Take a look at some of the amazing events we have managed and the special moments we've captured.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'4rem 2rem' }}>
        {/* Filters */}
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'4rem', justifyContent:'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding:'0.8rem 2rem',
              background: filter === cat ? 'var(--primary)' : 'transparent',
              border: `1px solid ${filter === cat ? 'var(--primary)' : 'var(--border)'}`,
              color: filter === cat ? '#000' : '#fff',
              borderRadius:'2px', cursor:'pointer', fontSize:'0.7rem',
              fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase',
              transition:'var(--transition)',
            }}>{cat}</button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div style={{
          columns: '300px 4', columnGap:'1.5rem',
        }}>
          {filtered.map((img, i) => (
            <div key={img.id} className="glass-card" style={{
              marginBottom:'1.5rem', breakInside:'avoid',
              cursor:'pointer', overflow:'hidden', position:'relative',
              borderRadius:'var(--radius-md)',
            }}
            onClick={() => setLightbox(img)}
            >
              <img src={img.imageUrl} alt={img.title}
                style={{ width:'100%', display:'block', objectFit:'cover', transition:'var(--transition)' }}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'; }}
              />
              <div style={{
                position:'absolute', inset:0, background:'linear-gradient(to top, rgba(2, 6, 23, 0.8) 0%, transparent 50%)',
                opacity:0, transition:'opacity 0.3s', display:'flex', alignItems:'flex-end', padding:'2rem',
              }}
              className="gallery-overlay"
              onMouseEnter={e => e.currentTarget.style.opacity='1'}
              onMouseLeave={e => e.currentTarget.style.opacity='0'}
              >
                <div>
                  <div style={{ color:'#fff', fontFamily:'var(--font-display)', fontSize:'1.2rem', marginBottom:'0.25rem' }}>{img.title}</div>
                  <div style={{ color:'var(--primary-light)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>{img.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card" style={{ textAlign:'center', padding:'8rem 2rem', color:'var(--text-muted)' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1.5rem', opacity:0.1 }}>📷</div>
            <p>We are adding more photos to this category soon.</p>
          </div>
        )}
      </div>

      {/* Recent Highlights Section */}
      <section style={{ background:'var(--bg-surface)', padding:'6rem 0', borderTop:'1px solid var(--border)' }} id="highlights" ref={highlightsRef}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3rem' }}>
            <div>
              <span className="section-label">Real Moments</span>
              <h2 className="section-title" style={{ fontSize:'2.5rem', marginBottom:0 }}>Recent <span>Highlights</span></h2>
            </div>
            <button onClick={() => highlightsRef.current?.scrollBy({ left: 350, behavior:'smooth' })} className="btn-outline" style={{ display:'none' }}>Next</button>
          </div>
          
          <div style={{ display:'flex', gap:'2rem', overflowX:'auto', paddingBottom:'1.5rem', scrollbarWidth:'none' }}>
            <style>{`div::-webkit-scrollbar{display:none}`}</style>
            {recentEvents.length === 0 ? (
              <div className="glass-card" style={{ padding:'4rem', width:'100%', textAlign:'center', color:'var(--text-muted)' }}>
                We are adding our latest highlights soon.
              </div>
            ) : recentEvents.map(ev => (
              <div key={ev.id} style={{ minWidth:320, maxWidth:320, flexShrink:0 }}>
                <EventCard event={ev} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position:'fixed', inset:0, zIndex:9999,
          background:'rgba(2, 6, 23, 0.98)', backdropFilter:'blur(20px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:'2rem',
        }}>
          <button onClick={() => setLightbox(null)} style={{
            position:'absolute', top:'2rem', right:'2rem',
            background:'var(--glass)', border:'1px solid var(--glass-border)', color:'#fff', 
            width:50, height:50, borderRadius:'50%', fontSize:'1.2rem', cursor:'pointer',
          }}>✕</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:1100, width:'100%', animation:'fadeInUp 0.4s ease' }}>
            <img src={lightbox.imageUrl} alt={lightbox.title} style={{ width:'100%', borderRadius:'2px', maxHeight:'75vh', objectFit:'contain', boxShadow:'0 30px 60px rgba(0,0,0,0.5)' }} />
            <div style={{ marginTop:'2.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <h2 className="display-font" style={{ fontSize:'2.2rem', color:'#fff', marginBottom:'0.5rem' }}>{lightbox.title}</h2>
              <div style={{ color:'var(--primary)', fontSize:'0.7rem', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'2rem' }}>{lightbox.category}</div>
              <a href={lightbox.imageUrl} download target="_blank" rel="noreferrer" className="btn-outline" style={{ padding:'0.75rem 2.5rem', fontSize:'0.75rem' }}>
                Download High-Res
              </a>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .glass-card:hover .gallery-overlay { opacity: 1 !important; }
        .glass-card:hover img { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default Gallery;
