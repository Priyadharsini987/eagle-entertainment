import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';
import { motion, AnimatePresence } from 'framer-motion';

// ---- Hero ----
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600', tag: 'Bespoke Celebrations', title: 'Designing Your', accent: 'Dream Wedding', sub: 'Crafting luxury destination weddings and thematic celebrations across Tamil Nadu with unmatched artistic precision.' },
    { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600', tag: 'Elite Concert Production', title: 'Sensational Live', accent: 'Music & Concerts', sub: 'State-of-the-art concert staging, sound, and visual engineering that creates unforgettable stadium experiences.' },
    { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600', tag: 'Signature Corporate Galas', title: 'Distinguished', accent: 'Company Events', sub: 'Flawless execution of brand launches, corporate galas, and VIP corporate experiences.' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

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
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(3, 3, 3, 0.92) 0%, rgba(3, 3, 3, 0.55) 60%, rgba(3, 3, 3, 0.85) 100%)' }} />
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 15% 50%, rgba(255,105,180, 0.15), transparent 55%)' }} />
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
                  background: 'rgba(255,105,180, 0.08)', 
                  border: '1px solid rgba(255,105,180, 0.3)', 
                  padding: '0.5rem 1.2rem', 
                  borderRadius: '100px', 
                  marginBottom: '2rem' 
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--primary-light)' }}>{sl.tag}</span>
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

      {/* Slide Navigation Dots */}
      <div style={{ position:'absolute', bottom:'3.5rem', right:'5%', display:'flex', gap:'0.85rem', zIndex:3 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCurrentSlide(i)} style={{
            width: i === currentSlide ? 40 : 8, height:8,
            borderRadius:4, cursor:'pointer',
            background: i === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(0,0,0,0.6)',
            transition:'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: i === currentSlide ? '0 0 10px var(--primary)' : 'none'
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

      <div ref={scrollRef} style={{
        display:'flex', gap:'2.2rem', overflowX:'auto',
        paddingBottom:'2rem', scrollbarWidth:'none', msOverflowStyle:'none',
      }}>
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {events.length === 0 ? (
          <div className="glass-card" style={{ padding:'6rem', width:'100%', textAlign:'center', color:'var(--text-muted)', borderStyle: 'dashed', borderColor: 'var(--border)' }}>
            Currently prepping future masterpieces. Reach out to schedule yours!
          </div>
        ) : events.map(ev => (
          <div key={ev.id} style={{ minWidth:350, maxWidth:350, flexShrink:0 }}>
            <EventCard event={ev} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Main Home ----
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    publicApi.getUpcomingEvents().then(r => setUpcomingEvents(r.data)).catch(() => {});
    publicApi.getRecentEvents().then(r => setRecentEvents(r.data)).catch(() => {});
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
            title="Curated" accent="Experiences"
            label="Don't Miss Out"
            events={upcomingEvents}
          />
          <div id="highlights">
            <EventsRow
              title="Recent" accent="Highlights"
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
    </div>
  );
};

export default Home;
