import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { publicApi, getImageUrl } from '../services/api';
import EventCard from '../components/EventCard';
import { motion, AnimatePresence } from 'framer-motion';

// ---- Hero ----
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600', tag: 'Top Tier Events', title: 'Celebrity &', accent: 'Award Shows', sub: 'We manage top celebrities and organize grand award ceremonies that everyone remembers.' },
    { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600', tag: 'Live Music', title: 'Big Live', accent: 'Concerts', sub: 'We build amazing stages and provide the best sound systems for huge music concerts.' },
    { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600', tag: 'Business Events', title: 'Corporate', accent: 'Meetings & Launches', sub: 'From product launches to company parties, we handle your business events perfectly.' },
  ];

  const nextSlide = () => setCurrentSlide(p => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(nextSlide, 6500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, currentSlide]);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 750, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        {slides.map((sl, i) => i === currentSlide && (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', inset: 0, zIndex: 0
            }}
          >
            <img src={sl.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.6) 60%, rgba(2, 6, 23, 0.8) 100%)' }} />
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.25), transparent 55%)' }} />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:820 }}>
          <AnimatePresence mode="wait">
            {slides.map((sl, i) => i === currentSlide && (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Badge */}
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.6rem', 
                  background: 'rgba(99, 102, 241, 0.15)', 
                  border: '1px solid rgba(99, 102, 241, 0.4)', 
                  padding: '0.5rem 1.2rem', 
                  borderRadius: '100px', 
                  marginBottom: '2rem' 
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--primary-dark)' }}>{sl.tag}</span>
                </div>
                
                {/* Title */}
                <h1 className="display-font" style={{ fontSize:'clamp(2.6rem, 6.2vw, 4.8rem)', color: 'var(--text-main)', lineHeight:1.1, marginBottom:'1.8rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {sl.title} <span className="gold-text-shine" style={{ display: 'inline-block', fontStyle: 'italic', fontWeight: 400 }}>{sl.accent}</span>
                </h1>
                
                {/* Subtitle */}
                <p style={{ color:'var(--text-muted)', fontSize:'1.15rem', lineHeight:1.85, marginBottom:'3.5rem', maxWidth:620 }}>{sl.sub}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ display:'flex', gap:'1.8rem', flexWrap:'wrap' }}
          >
            <Link to="/contact" className="btn-primary">Initiate Project</Link>
            <Link to="/events" className="btn-outline">Explore Portfolio</Link>
          </motion.div>
        </div>
      </div>

      {/* Manual Navigation Arrows */}
      <button 
        onClick={prevSlide}
        style={{ position:'absolute', left:'1.5%', top:'50%', transform:'translateY(-50%)', zIndex:10, background:'rgba(15,23,42,0.3)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', backdropFilter:'blur(10px)', fontSize:'0.9rem', transition:'var(--transition-fast)' }}
        onMouseOver={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.6)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
      >
        &#10094;
      </button>
      <button 
        onClick={nextSlide}
        style={{ position:'absolute', right:'1.5%', top:'50%', transform:'translateY(-50%)', zIndex:10, background:'rgba(15,23,42,0.3)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', backdropFilter:'blur(10px)', fontSize:'0.9rem', transition:'var(--transition-fast)' }}
        onMouseOver={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.6)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
      >
        &#10095;
      </button>

      <div style={{ position:'absolute', bottom:'3.5rem', right:'5%', display:'flex', gap:'0.85rem', zIndex:3 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCurrentSlide(i)} style={{
            width: i === currentSlide ? 40 : 8, height:8,
            borderRadius:4, cursor:'pointer',
            background: i === currentSlide ? 'var(--primary)' : 'rgba(0,0,0,0.2)',
            border: i === currentSlide ? 'none' : '1px solid rgba(0,0,0,0.3)',
            transition:'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: i === currentSlide ? '0 0 10px rgba(99, 102, 241, 0.6)' : 'none'
          }} />
        ))}
      </div>
    </section>
  );
};

// ---- Horizontal Scroll Events Row ----
const EventsRow = ({ title, accent, events, label }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 370, behavior: 'smooth' });
  };

  return (
    <div style={{ marginBottom:'6.5rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3.5rem', flexWrap:'wrap', gap: '1.5rem' }}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title" style={{ fontSize:'clamp(2rem, 4vw, 2.8rem)', marginBottom:0 }}>{title} <span>{accent}</span></h2>
        </div>
        <div style={{ display:'flex', gap:'0.85rem' }}>
          <button onClick={() => scroll(-1)} className="btn-outline" style={{ width:50, height:50, padding:0, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '1.2rem' }}>←</button>
          <button onClick={() => scroll(1)} className="btn-outline" style={{ width:50, height:50, padding:0, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '1.2rem' }}>→</button>
        </div>
      </div>

      <motion.div 
        ref={scrollRef} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
        style={{
        display:'flex', gap:'2.2rem', overflowX:'auto',
        paddingBottom:'2rem', scrollbarWidth:'none', msOverflowStyle:'none',
      }}>
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {events.length === 0 ? (
          <div className="glass-card" style={{ padding:'6rem', width:'100%', textAlign:'center', color:'var(--text-muted)', borderStyle: 'dashed', borderColor: 'var(--border)' }}>
            Currently prepping future masterpieces. Reach out to schedule yours!
          </div>
        ) : events.map(ev => (
          <motion.div 
            key={ev.id} 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            style={{ minWidth:350, maxWidth:350, flexShrink:0 }}
          >
            <EventCard event={ev} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// ---- Main Home ----
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    publicApi.getUpcomingEvents().then(r => setUpcomingEvents(Array.isArray(r.data) ? r.data : [])).catch(() => {});
    publicApi.getRecentEvents().then(r => setRecentEvents(Array.isArray(r.data) ? r.data : [])).catch(() => {});
    publicApi.getGallery().then(r => setGallery(Array.isArray(r.data) ? r.data.slice(0, 6) : [])).catch(() => {});
    publicApi.getTestimonials().then(r => setTestimonials(Array.isArray(r.data) ? r.data.slice(0, 3) : [])).catch(() => {});
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Floating Counter stats */}
      <div style={{ background:'var(--bg-card)', borderBottom:'1px solid var(--border)', padding:'4.5rem 0' }}>
        <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px, 1fr))', gap:'3.5rem', textAlign:'center' }}>
          {[
            { n: '500+', l: 'Grand Scale Events' },
            { n: '10+', l: 'Years of Artistry' },
            { n: '100%', l: 'Satisfaction Index' },
            { n: '24/7', l: 'Dedicated Stewardship' },
          ].map((s, i) => (
            <motion.div 
              key={i} 
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div style={{ fontSize:'2.8rem', fontWeight: 800, color:'var(--primary)', lineHeight:1, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.25em', fontWeight: 700 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <section className="section" style={{ paddingBottom:'6rem' }}>
        <div className="container">
          <EventsRow
            title="Upcoming" accent="Events"
            label="Don't Miss Out"
            events={upcomingEvents}
          />
          <div id="highlights">
            <EventsRow
              title="Recent" accent="Events"
              label="Completed Masterpieces"
              events={recentEvents}
            />
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign:'center', marginTop:'2.5rem' }}
          >
            <Link to="/events" className="btn-outline">Browse Full Catalogue</Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section Preview */}
      {gallery.length > 0 && (
        <section className="section" style={{ background:'var(--bg-card)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'4rem' }}>
              <span className="section-label">A Glimpse of Magic</span>
              <h2 className="section-title">Explore Our <span>Gallery</span></h2>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem', marginBottom:'3.5rem' }}
            >
              {gallery.map(g => (
                <motion.div 
                  key={g.id} 
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                  }}
                  className="glass-card" style={{ height: 260, overflow:'hidden', position:'relative', borderRadius:'var(--radius-md)' }}
                >
                  <img src={getImageUrl(g.imageUrl)} alt={g.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s ease' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display:'flex', alignItems:'flex-end', padding:'1.5rem' }}>
                    <div>
                      <h4 style={{ color:'#fff', margin:0, fontFamily:'var(--font-display)' }}>{g.title}</h4>
                      <p style={{ color:'var(--primary)', fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.1em', margin:0, marginTop:'4px' }}>{g.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div style={{ textAlign:'center' }}>
              <Link to="/gallery" className="btn-outline">View Full Gallery</Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section Preview */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'4rem' }}>
              <span className="section-label">Client Voices</span>
              <h2 className="section-title">What They <span>Say</span></h2>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'2rem', marginBottom:'3.5rem' }}
            >
              {testimonials.map((t, i) => (
                <motion.div 
                  key={t.id} 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="glass-card" style={{ padding:'2.5rem', position:'relative' }}
                >
                  <div style={{ fontSize:'4rem', color:'var(--primary)', opacity:0.15, position:'absolute', top:20, right:30, fontFamily:'serif', lineHeight:1 }}>"</div>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.7, fontStyle:'italic', marginBottom:'2rem', position:'relative', zIndex:1 }}>"{t.message}"</p>
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                    {t.imageUrl ? (
                      <img src={getImageUrl(t.imageUrl)} alt={t.clientName} style={{ width:45, height:45, borderRadius:'50%', objectFit:'cover' }} />
                    ) : (
                      <div style={{ width:45, height:45, borderRadius:'50%', background:'rgba(223,178,89, 0.1)', border:'1px solid rgba(223,178,89, 0.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)', fontWeight:600 }}>
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 style={{ color:'var(--text-main)', margin:0, fontSize:'0.95rem' }}>{t.clientName}</h4>
                      <p style={{ color:'var(--primary)', margin:0, fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{t.clientRole}, {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
