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
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.15), transparent 55%)' }} />
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
                  background: 'rgba(212, 175, 55, 0.08)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  padding: '0.5rem 1.2rem', 
                  borderRadius: '100px', 
                  marginBottom: '2rem' 
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--primary-light)' }}>{sl.tag}</span>
                </div>
                
                {/* Title */}
                <h1 className="display-font" style={{ fontSize:'clamp(2.6rem, 6.2vw, 4.8rem)', color:'#fff', lineHeight:1.1, marginBottom:'1.8rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
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

// ---- Services ----
const Services = () => {
  const services = [
    { icon:'⚜️', title:'Luxury Weddings', desc:'Exquisite destination planning, personalized theme sets, and master execution for your special day.' },
    { icon:'⚡', title:'Concerts & Festivals', desc:'World-class stadium sound design, custom automated lighting matrices, and crowd dynamics management.' },
    { icon:'💼', title:'Corporate Production', desc:'Elevating brand value with seamless launch presentations, annual meets, and VIP hospitality services.' },
    { icon:'🎭', title:'Thematic Set Decor', desc:'Custom scenic designs, spatial layouts, and architectural floristry tailored to each event.' },
  ];

  return (
    <section className="section" style={{ background:'linear-gradient(to bottom, #050505, #0a0a0a)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'6.5rem' }}>
          <span className="section-label">Our Capabilities</span>
          <h2 className="section-title">Elevating Every <span>Milestone</span></h2>
          <p style={{ color:'var(--text-muted)', maxWidth:640, margin:'0 auto', fontSize:'1.1rem', lineHeight: 1.85 }}>
            Blending creative innovation with meticulous operational engineering to build breathtaking experiences.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px, 1fr))', gap:'2.5rem' }}>
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              className="glass-card" 
              style={{ padding:'4.5rem 2.8rem', display:'flex', flexDirection:'column', gap: '1.4rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div style={{ 
                fontSize:'2.8rem', color: 'var(--primary)',
                filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.25))' 
              }}>{s.icon}</div>
              <h3 className="display-font" style={{ fontSize:'1.55rem', color:'#fff', margin: 0, fontWeight: 600 }}>{s.title}</h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.92rem', lineHeight:1.75, margin: 0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---- Why Us ----
const WhyUs = () => (
  <section className="section">
    <div className="container">
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'6rem', alignItems:'center' }} className="why-us-grid">
        <motion.div 
          style={{ position:'relative' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            position:'absolute', inset:'-15px', border:'1px solid var(--primary)',
            borderRadius: 'var(--radius-lg)', zIndex:0, opacity:0.12,
          }} />
          <img src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800" alt="Excellence"
            style={{ width:'100%', borderRadius:'var(--radius-lg)', position:'relative', zIndex:1, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9)' }} />
          
          <div className="glass-card" style={{
            position:'absolute', bottom:'-20px', right:'-20px',
            padding:'2rem 2.5rem', zIndex:2, minWidth:230,
            border: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{ fontSize:'3.8rem', fontWeight:700, color:'var(--primary)', lineHeight:1, fontFamily: 'var(--font-display)' }}>10+</div>
            <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.22em', fontWeight: 800, marginTop: '0.5rem' }}>Years of Grandeur</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="section-label">Unrivaled Standard</span>
          <h2 className="section-title">Why Elite Clients <span>Choose Us</span></h2>
          <p style={{ color:'var(--text-muted)', lineHeight:1.85, marginBottom:'3rem', fontSize:'1.08rem' }}>
            At Eagle Entertainment, we believe an event is more than a gathering—it is a live narrative. We manage full-scale planning with Erode hospitality and global design standards.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginBottom: '1rem' }}>
            {[
              'Bespoke Thematic Aesthetics',
              'Immersive Audiovisual Systems',
              'End-to-End Vendor Curation',
              'Precision Timeline Supervision'
            ].map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
                <span style={{ color:'var(--primary)', fontWeight:800, fontSize: '0.9rem' }}>✦</span>
                <span style={{ color:'#e2e2e7', fontSize:'0.95rem', fontWeight:600 }}>{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ---- Testimonials ----
const Testimonials = ({ testimonials }) => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  if (!testimonials.length) return null;

  return (
    <section className="section" style={{ background:'linear-gradient(to bottom, #0a0a0a, #050505)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'6.5rem' }}>
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Client <span>Perspectives</span></h2>
        </div>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center' }}>
          <AnimatePresence mode="wait">
            {t && (
              <motion.div 
                key={active} 
                className="glass-card" 
                style={{ padding:'5.5rem 4.5rem', position: 'relative' }}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ fontSize:'5.5rem', color:'var(--primary)', opacity:0.18, lineHeight:1, marginBottom:'0.5rem', fontFamily:'var(--font-display)', position:'absolute', top:'2.5rem', left:'4rem' }}>“</div>
                <p className="display-font" style={{ fontSize:'clamp(1.4rem, 2.4vw, 2rem)', color:'#fff', fontStyle:'italic', lineHeight:1.65, marginBottom:'3.5rem', position:'relative', zIndex: 1 }}>
                  {t.message}
                </p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1.4rem' }}>
                  <img 
                    src={t.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                    alt={t.clientName} 
                    style={{ width:66, height:66, borderRadius:'50%', objectFit:'cover', border:'2px solid var(--primary)', boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' }}
                    onError={e => { e.target.style.display='none'; }} 
                  />
                  <div style={{ textAlign:'left' }}>
                    <div style={{ color:'#fff', fontWeight:700, fontSize:'1.15rem' }}>{t.clientName}</div>
                    <div style={{ color:'var(--text-muted)', fontSize:'0.82rem', marginTop: '0.2rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.clientRole}{t.company ? ` · ${t.company}` : ''}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display:'flex', justifyContent:'center', gap:'0.85rem', marginTop:'3.5rem' }}>
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)} 
                style={{
                  width: i === active ? 32 : 8, height:8, borderRadius:4,
                  border:'none', cursor:'pointer',
                  background: i === active ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
                  transition:'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: i === active ? '0 0 8px var(--primary)' : 'none'
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- CTA ----
const CTA = () => (
  <section style={{
    padding:'10rem 0',
    background:'radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, transparent 65%), #030303',
    borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
    textAlign:'center',
    position: 'relative', overflow: 'hidden'
  }}>
    <div className="container" style={{ position:'relative', zIndex:1 }}>
      <span className="section-label">Collaboration</span>
      <h2 className="display-font" style={{ fontSize:'clamp(2.6rem, 5.5vw, 4.8rem)', color:'#fff', marginBottom:'2rem', lineHeight:1.15, fontWeight: 700 }}>
        Let's Plan Your <span className="gold-text-shine" style={{ fontStyle:'italic', fontWeight: 400 }}>Next Milestone</span>
      </h2>
      <p style={{ color:'var(--text-muted)', maxWidth:580, margin:'0 auto 4.5rem', fontSize:'1.1rem', lineHeight:1.85 }}>
        Connect with our creative consulting team to map out your celebration concept, budget parameters, and technical staging.
      </p>
      <div style={{ display:'flex', gap:'1.8rem', justifyContent:'center', flexWrap:'wrap' }}>
        <Link to="/contact" className="btn-primary">Initiate Brief</Link>
        <a href="tel:+919790241089" className="btn-outline">Consult Operations</a>
      </div>
    </div>
  </section>
);

// ---- Main Home ----
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    publicApi.getUpcomingEvents().then(r => setUpcomingEvents(r.data)).catch(() => {});
    publicApi.getRecentEvents().then(r => setRecentEvents(r.data)).catch(() => {});
    publicApi.getTestimonials().then(r => setTestimonials(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Floating Counter stats */}
      <div style={{ background:'rgba(5, 5, 5, 0.95)', borderBottom:'1px solid var(--border)', padding:'4.5rem 0' }}>
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

      <Services />
      <WhyUs />
      <Testimonials testimonials={testimonials} />
      <CTA />
      
      <style>{`
        @media(max-width:900px){
          .why-us-grid{grid-template-columns:1fr!important; gap:4rem!important;}
        }
      `}</style>
    </div>
  );
};

export default Home;
