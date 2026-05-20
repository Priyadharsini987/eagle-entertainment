import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';

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
      {slides.map((sl, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, transition: 'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: i === currentSlide ? 1 : 0,
          transform: i === currentSlide ? 'scale(1.03)' : 'scale(1)',
          transitionProperty: 'opacity, transform',
          zIndex: 0
        }}>
          <img src={sl.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(3, 3, 3, 0.9) 0%, rgba(3, 3, 3, 0.5) 60%, rgba(3, 3, 3, 0.8) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 10% 50%, rgba(201, 168, 76, 0.12), transparent 50%)' }} />
        </div>
      ))}

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:780 }}>
          {slides.map((sl, i) => i === currentSlide && (
            <div key={i} style={{ animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201, 168, 76, 0.08)', border: '1px solid rgba(201, 168, 76, 0.25)', padding: '0.4rem 1rem', borderRadius: '100px', marginBottom: '1.5rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--primary-light)' }}>{sl.tag}</span>
              </div>
              <h1 className="display-font" style={{ fontSize:'clamp(2.5rem, 6vw, 4.6rem)', color:'#fff', lineHeight:1.1, marginBottom:'1.8rem', fontWeight: 700 }}>
                {sl.title} <span style={{ color:'var(--primary)', fontStyle: 'italic', fontWeight: 400 }}>{sl.accent}</span>
              </h1>
              <p style={{ color:'var(--text-muted)', fontSize:'1.1rem', lineHeight:1.8, marginBottom:'3rem', maxWidth:600 }}>{sl.sub}</p>
            </div>
          ))}

          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', animation:'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}>
            <Link to="/contact" className="btn-primary">Initiate Project</Link>
            <Link to="/events" className="btn-outline">Explore Portfolio</Link>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div style={{ position:'absolute', bottom:'3rem', right:'5%', display:'flex', gap:'0.75rem', zIndex:3 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCurrentSlide(i)} style={{
            width: i === currentSlide ? 36 : 8, height:8,
            borderRadius:4, cursor:'pointer',
            background: i === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(0,0,0,0.5)',
            transition:'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <div style={{ marginBottom:'6rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3rem' }}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title" style={{ fontSize:'2.5rem', marginBottom:0 }}>{title} <span>{accent}</span></h2>
        </div>
        <div style={{ display:'flex', gap:'0.75rem' }}>
          <button onClick={() => scroll(-1)} className="btn-outline" style={{ width:48, height:48, padding:0, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '1rem' }}>←</button>
          <button onClick={() => scroll(1)} className="btn-outline" style={{ width:48, height:48, padding:0, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '1rem' }}>→</button>
        </div>
      </div>

      <div ref={scrollRef} style={{
        display:'flex', gap:'2rem', overflowX:'auto',
        paddingBottom:'1.5rem', scrollbarWidth:'none', msOverflowStyle:'none',
      }}>
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {events.length === 0 ? (
          <div className="glass-card" style={{ padding:'5rem', width:'100%', textAlign:'center', color:'var(--text-muted)', borderStyle: 'dashed' }}>
            Currently prepping future masterpieces. Reach out to schedule yours!
          </div>
        ) : events.map(ev => (
          <div key={ev.id} style={{ minWidth:340, maxWidth:340, flexShrink:0 }}>
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
    <section className="section" style={{ background:'linear-gradient(to bottom, #030303, #070707)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'6rem' }}>
          <span className="section-label">Our Capabilities</span>
          <h2 className="section-title">Elevating Every <span>Milestone</span></h2>
          <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto', fontSize:'1.05rem', lineHeight: 1.8 }}>
            Blending creative innovation with meticulous operational engineering to build breathtaking experiences.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'2rem' }}>
          {services.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding:'4rem 2.5rem', display:'flex', flexDirection:'column', gap: '1.2rem' }}>
              <div style={{ 
                fontSize:'2.5rem', color: 'var(--primary)',
                filter: 'drop-shadow(0 0 10px rgba(201, 168, 76, 0.2))' 
              }}>{s.icon}</div>
              <h3 className="display-font" style={{ fontSize:'1.45rem', color:'#fff', margin: 0 }}>{s.title}</h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', lineHeight:1.7, margin: 0 }}>{s.desc}</p>
            </div>
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
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'5rem', alignItems:'center' }} className="why-us-grid">
        <div style={{ position:'relative' }}>
          <div style={{
            position:'absolute', inset:'-15px', border:'1px solid var(--primary)',
            borderRadius: 'var(--radius-lg)', zIndex:0, opacity:0.1,
          }} />
          <img src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800" alt="Excellence"
            style={{ width:'100%', borderRadius:'var(--radius-lg)', position:'relative', zIndex:1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }} />
          <div className="glass-card" style={{
            position:'absolute', bottom:'-20px', right:'-20px',
            padding:'1.8rem 2.2rem', zIndex:2, minWidth:210,
            border: '1px solid rgba(201, 168, 76, 0.2)'
          }}>
            <div style={{ fontSize:'3.5rem', fontWeight:700, color:'var(--primary)', lineHeight:1, fontFamily: 'var(--font-display)' }}>10+</div>
            <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.2em', fontWeight: 800, marginTop: '0.4rem' }}>Years of Grandeur</div>
          </div>
        </div>

        <div>
          <span className="section-label">Unrivaled Standard</span>
          <h2 className="section-title">Why Elite Clients <span>Choose Us</span></h2>
          <p style={{ color:'var(--text-muted)', lineHeight:1.8, marginBottom:'2.5rem', fontSize:'1.02rem' }}>
            At Eagle Entertainment, we believe an event is more than a gathering—it is a live narrative. We manage full-scale planning with Erode hospitality and global design standards.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom: '1rem' }}>
            {[
              'Bespoke Thematic Aesthetics',
              'Immersive Audiovisual Systems',
              'End-to-End Vendor Curation',
              'Precision Timeline Supervision'
            ].map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span style={{ color:'var(--primary)', fontWeight:700, fontSize: '0.8rem' }}>✦</span>
                <span style={{ color:'#e2e2e7', fontSize:'0.9rem', fontWeight:500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
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
    <section className="section" style={{ background:'linear-gradient(to bottom, #070707, #030303)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'6rem' }}>
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Client <span>Perspectives</span></h2>
        </div>

        <div style={{ maxWidth:850, margin:'0 auto', textAlign:'center' }}>
          {t && (
            <div key={active} className="glass-card" style={{ padding:'5rem 4rem', animation:'fadeInUp 0.8s ease' }}>
              <div style={{ fontSize:'4rem', color:'var(--primary)', opacity:0.15, lineHeight:1, marginBottom:'1rem', fontFamily:'var(--font-display)' }}>“</div>
              <p className="display-font" style={{ fontSize:'clamp(1.3rem, 2.2vw, 1.8rem)', color:'#fff', fontStyle:'italic', lineHeight:1.6, marginBottom:'3rem' }}>
                {t.message}
              </p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1.2rem' }}>
                <img src={t.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} alt={t.clientName} style={{ width:60, height:60, borderRadius:'50%', objectFit:'cover', border:'2px solid var(--primary)' }}
                  onError={e => { e.target.style.display='none'; }} />
                <div style={{ textAlign:'left' }}>
                  <div style={{ color:'#fff', fontWeight:600, fontSize:'1.05rem' }}>{t.clientName}</div>
                  <div style={{ color:'var(--text-muted)', fontSize:'0.8rem', marginTop: '0.15rem' }}>{t.clientRole}{t.company ? ` · ${t.company}` : ''}</div>
                </div>
              </div>
            </div>
          )}

          {/* Dots */}
          <div style={{ display:'flex', justifyContent:'center', gap:'0.75rem', marginTop:'3rem' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 28 : 8, height:8, borderRadius:4,
                border:'none', cursor:'pointer',
                background: i === active ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                transition:'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }} />
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
    padding:'9rem 0',
    background:'radial-gradient(circle at center, rgba(201, 168, 76, 0.08), transparent 70%), #020202',
    borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
    textAlign:'center',
    position: 'relative', overflow: 'hidden'
  }}>
    <div className="container" style={{ position:'relative', zIndex:1 }}>
      <span className="section-label">Collaboration</span>
      <h2 className="display-font" style={{ fontSize:'clamp(2.4rem, 5vw, 4.4rem)', color:'#fff', marginBottom:'1.8rem', lineHeight:1.15 }}>
        Let's Plan Your <span style={{ color:'var(--primary)', fontStyle:'italic', fontWeight: 400 }}>Next Milestone</span>
      </h2>
      <p style={{ color:'var(--text-muted)', maxWidth:550, margin:'0 auto 4rem', fontSize:'1.05rem', lineHeight:1.8 }}>
        Connect with our creative consulting team to map out your celebration concept, budget parameters, and technical staging.
      </p>
      <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
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
      <div style={{ background:'rgba(5, 5, 5, 0.9)', borderBottom:'1px solid var(--border)', padding:'4rem 0' }}>
        <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'3rem', textAlign:'center' }}>
          {[
            { n: '500+', l: 'Grand Scale Events' },
            { n: '10+', l: 'Years of Artistry' },
            { n: '100%', l: 'Satisfaction Index' },
            { n: '24/7', l: 'Dedicated Stewardship' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontSize:'2.6rem', fontWeight: 700, color:'var(--primary)', lineHeight:1, fontFamily: 'var(--font-display)' }}>{s.n}</div>
              <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.25em', fontWeight: 700 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <section className="section" style={{ paddingBottom:'5rem' }}>
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
          <div style={{ textAlign:'center', marginTop:'2rem' }}>
            <Link to="/events" className="btn-outline">Browse Full Catalogue</Link>
          </div>
        </div>
      </section>

      <Services />
      <WhyUs />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </div>
  );
};

export default Home;
