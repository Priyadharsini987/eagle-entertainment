import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';

// ---- Hero ----
const Hero = ({ stats }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600', tag: 'Luxury Weddings', title: 'Making Your', accent: 'Special Day Perfect', sub: 'Beautiful wedding planning with attention to every single detail.' },
    { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600', tag: 'Big Concerts', title: 'Amazing Live', accent: 'Music Shows', sub: 'Top-quality lighting and sound for concerts that people never forget.' },
    { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600', tag: 'Business Events', title: 'Professional', accent: 'Company Meetings', sub: 'Perfectly organized meetings, launches, and conferences for your brand.' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[currentSlide];

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 800, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Background Slides */}
      {slides.map((sl, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: i === currentSlide ? 1 : 0,
          transform: i === currentSlide ? 'scale(1.05)' : 'scale(1)',
          transitionProperty: 'opacity, transform',
        }}>
          <img src={sl.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.4) 50%, transparent 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15), transparent 50%)' }} />
        </div>
      ))}

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:750 }}>
          <div style={{ animation:'fadeInUp 0.8s ease' }}>
            <span className="section-label" style={{ color: 'var(--accent)' }}>{s.tag}</span>
            <h1 className="section-title" style={{ fontSize:'clamp(3.5rem, 8vw, 6rem)', marginBottom:'0.5rem', lineHeight:0.95 }}>
              {s.title}
            </h1>
            <h1 className="section-title" style={{ fontSize:'clamp(3.5rem, 8vw, 6rem)', color:'var(--primary)', fontStyle:'italic', lineHeight:1 }}>
              {s.accent}
            </h1>
          </div>

          <p style={{ color:'var(--text-muted)', fontSize:'1.2rem', lineHeight:1.8, maxWidth:550, margin:'2rem 0 3rem', animation:'fadeInUp 0.8s ease 0.2s both' }}>
            {s.sub}
          </p>

          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', animation:'fadeInUp 0.8s ease 0.4s both' }}>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/events" className="btn-outline">See Our Work</Link>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div style={{ position:'absolute', bottom:'3rem', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'1rem', zIndex:3 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCurrentSlide(i)} style={{
            width: i === currentSlide ? 40 : 10, height:4,
            borderRadius:2, cursor:'pointer',
            background: i === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
            transition:'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
  };

  return (
    <div style={{ marginBottom:'6rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2.5rem' }}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title" style={{ fontSize:'2.5rem', marginBottom:0 }}>{title} <span>{accent}</span></h2>
        </div>
        <div style={{ display:'flex', gap:'1rem' }}>
          <button onClick={() => scroll(-1)} className="btn-outline" style={{ width:50, height:50, padding:0, borderRadius:'50%' }}>←</button>
          <button onClick={() => scroll(1)} className="btn-outline" style={{ width:50, height:50, padding:0, borderRadius:'50%' }}>→</button>
        </div>
      </div>

      <div ref={scrollRef} style={{
        display:'flex', gap:'2rem', overflowX:'auto',
        paddingBottom:'1.5rem', scrollbarWidth:'none', msOverflowStyle:'none',
      }}>
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {events.length === 0 ? (
          <div className="glass-card" style={{ padding:'4rem', width:'100%', textAlign:'center', color:'var(--text-muted)' }}>
            We are planning new events soon. Check back later!
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
    { icon:'✨', title:'Luxury Weddings', desc:'We make your dream wedding come true, handling every single detail with care.' },
    { icon:'⚡', title:'Big Concerts & Shows', desc:'Great sound and lighting for big music shows and festivals that people love.' },
    { icon:'🤝', title:'Company Events', desc:'Perfectly organized meetings, launches, and events for your business.' },
    { icon:'🎨', title:'Beautiful Decor', desc:'We create amazing stage and hall decorations that look beautiful and unique.' },
  ];

  return (
    <section className="section" style={{ background:'var(--bg-surface)', position:'relative' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'5rem' }}>
          <span className="section-label">Our Expertise</span>
          <h2 className="section-title">Elevating Every <span>Moment</span></h2>
          <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto', fontSize:'1.1rem' }}>
            We combine great ideas with perfect planning to make every event special.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'2rem' }}>
          {services.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding:'3rem 2rem' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'1.5rem', filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))' }}>{s.icon}</div>
              <h3 className="display-font" style={{ fontSize:'1.6rem', color:'#fff', marginBottom:'1rem' }}>{s.title}</h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.8 }}>{s.desc}</p>
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
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="why-us-grid">
        <div style={{ position:'relative' }}>
          <div style={{
            position:'absolute', inset:'-20px', border:'1px solid var(--primary)',
            borderRadius: 'var(--radius-lg)', zIndex:0, opacity:0.2,
          }} />
          <img src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800" alt="Excellence"
            style={{ width:'100%', borderRadius:'var(--radius-lg)', position:'relative', zIndex:1 }} />
          <div className="glass-card" style={{
            position:'absolute', bottom:'-30px', right:'-30px',
            padding:'2rem', zIndex:2, textAlign:'center', minWidth:200
          }}>
            <div style={{ fontSize:'3rem', fontWeight:700, color:'var(--primary)', lineHeight:1 }}>12+</div>
            <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Years of Excellence</div>
          </div>
        </div>

        <div>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">Why Clients <span>Trust Us</span></h2>
          <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'2.5rem', fontSize:'1.1rem' }}>
            At Eagle Entertainment, we treat every event as our most important one. Our team has over 10 years of experience in planning, design, and great service.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
            {[
              'Top Quality Service',
              'Creative Design Team',
              'Great Guest Service',
              'Best Sound & Lighting'
            ].map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span style={{ color:'var(--primary)', fontWeight:900 }}>⚡</span>
                <span style={{ color:'#ccc', fontSize:'0.95rem', fontWeight:500 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'3rem' }}>
            <Link to="/about" className="btn-primary">About Us</Link>
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
    <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'5rem' }}>
          <span className="section-label">Happy Clients</span>
          <h2 className="section-title">What Our <span>Clients Say</span></h2>
        </div>

        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          {t && (
            <div key={active} className="glass-card" style={{ padding:'4rem 3rem', animation:'fadeInUp 0.8s ease' }}>
              <div style={{ fontSize:'4rem', color:'var(--primary)', opacity:0.3, lineHeight:1, marginBottom:'1rem', fontFamily:'serif' }}>"</div>
              <p className="display-font" style={{ fontSize:'clamp(1.4rem, 2.5vw, 2rem)', color:'#fff', fontStyle:'italic', lineHeight:1.5, marginBottom:'3rem' }}>
                {t.message}
              </p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1.5rem' }}>
                <img src={t.imageUrl} alt={t.clientName} style={{ width:70, height:70, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--primary)' }}
                  onError={e => { e.target.style.display='none'; }} />
                <div style={{ textAlign:'left' }}>
                  <div style={{ color:'#fff', fontWeight:600, fontSize:'1.1rem' }}>{t.clientName}</div>
                  <div style={{ color:'var(--text-muted)', fontSize:'0.85rem' }}>{t.clientRole}{t.company ? ` · ${t.company}` : ''}</div>
                </div>
              </div>
              <div style={{ marginTop:'1.5rem', color:'var(--primary-light)', fontSize:'1.2rem', letterSpacing:'4px' }}>{'★'.repeat(t.rating || 5)}</div>
            </div>
          )}

          {/* Nav dots */}
          <div style={{ display:'flex', justifyContent:'center', gap:'0.75rem', marginTop:'3rem' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 32 : 10, height:6, borderRadius:3,
                border:'none', cursor:'pointer',
                background: i === active ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                transition:'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
    padding:'8rem 0',
    background:'radial-gradient(circle at center, rgba(99, 102, 241, 0.1), transparent 70%), var(--bg-main)',
    borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
    textAlign:'center',
    position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600)', backgroundSize:'cover', opacity:0.03 }} />
    <div className="container" style={{ position:'relative', zIndex:1 }}>
      <span className="section-label">Contact Us</span>
      <h2 className="display-font" style={{ fontSize:'clamp(2.5rem, 5vw, 4.5rem)', color:'#fff', marginBottom:'1.5rem', lineHeight:1.1 }}>
        Let's Plan Your <span style={{ color:'var(--primary)', fontStyle:'italic' }}>Next Event</span>
      </h2>
      <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto 4rem', fontSize:'1.1rem', lineHeight:1.8 }}>
        Our team is ready to help you plan and run your next big event. Let's make it happen together.
      </p>
      <div style={{ display:'flex', gap:'2rem', justifyContent:'center', flexWrap:'wrap' }}>
        <Link to="/contact" className="btn-primary" style={{ padding:'1.25rem 3.5rem', fontSize:'1rem' }}>Contact Us</Link>
        <a href="tel:+919000011111" className="btn-outline" style={{ padding:'1.25rem 3rem', fontSize:'1rem' }}>Call Us</a>
      </div>
    </div>
  </section>
);

// ---- Main Home ----
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    publicApi.getUpcomingEvents().then(r => setUpcomingEvents(r.data)).catch(() => {});
    publicApi.getRecentEvents().then(r => setRecentEvents(r.data)).catch(() => {});
    publicApi.getTestimonials().then(r => setTestimonials(r.data)).catch(() => {});
    publicApi.getStats().then(r => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <Hero stats={stats} />
      <div style={{ background:'var(--bg-surface)', borderBottom:'1px solid var(--border)', padding:'3rem 0' }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'2rem' }}>
          {[
            { n: '500+', l: 'Events Managed' },
            { n: '10+', l: 'Years Experience' },
            { n: '100%', l: 'Happy Clients' },
            { n: '24/7', l: 'Premium Support' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div className="display-font" style={{ fontSize:'2.5rem', color:'var(--primary)', lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.2em', marginTop:'0.5rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <section className="section" style={{ paddingBottom:'3rem' }}>
        <div className="container">
          <EventsRow
            title="Upcoming" accent="Events"
            label="Don't Miss Out"
            events={upcomingEvents}
          />
          <EventsRow
            title="Recent" accent="Highlights"
            label="What We've Done"
            events={recentEvents}
          />
          <div style={{ textAlign:'center', marginTop:'1rem' }}>
            <Link to="/events" className="btn-outline">View All Events</Link>
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
