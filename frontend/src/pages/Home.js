import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';

// ---- Hero with Background Video & Floating Booking Engine ----
const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventType: 'Wedding',
    date: '',
    guests: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to contact page with pre-filled state
    navigate('/contact', { state: formData });
  };

  return (
    <section style={{ 
      position: 'relative', 
      height: '100vh', 
      minHeight: '850px', 
      overflow: 'hidden', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      background: '#050505'
    }}>
      {/* Immersive Event Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.38
        }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-concert-audience-clapping-under-stage-lights-43251-large.mp4" type="video/mp4" />
      </video>

      {/* Modern gradient overlays for maximum contrast and depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(5,5,5,0.95) 90%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.4), rgba(5,5,5,0.9))', zIndex: 1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Centered Typography */}
        <div style={{ maxWidth: '900px', marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ letterSpacing: '0.3em', color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Tamil Nadu's Master Event Architects
          </span>
          <h1 className="display-font" style={{ 
            fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', 
            color: '#fff', 
            lineHeight: 1.1, 
            marginTop: '1.5rem', 
            fontWeight: 800,
            letterSpacing: '-0.02em'
          }}>
            Crafting Extraordinary <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #fff 30%, var(--primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Legendary Celebrations</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.8, maxWidth: '750px', margin: '1.5rem auto 0' }}>
            Based in Erode, orchestrating luxury weddings, high-energy festivals, and premium corporate experiences across South India.
          </p>
        </div>

        {/* Floating Glassmorphism Booking/Inquiry Engine */}
        <div className="glass-card" style={{ 
          width: '100%', 
          maxWidth: '850px', 
          padding: '2.5rem', 
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 15, 15, 0.65)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'fadeInUp 1s ease 0.3s both'
        }}>
          <form onSubmit={handleSearch} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) 180px', 
            gap: '1.5rem', 
            alignItems: 'end',
            textAlign: 'left'
          }} className="booking-form">
            
            <div>
              <label style={{ display: 'block', color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Event Category</label>
              <select 
                value={formData.eventType}
                onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                style={{
                  width: '100%', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer'
                }}
              >
                <option value="Wedding" style={{ background: '#111', color: '#fff' }}>💍 Luxury Wedding</option>
                <option value="Corporate" style={{ background: '#111', color: '#fff' }}>🏢 Corporate Event</option>
                <option value="Festival" style={{ background: '#111', color: '#fff' }}>⚡ Festival / Concert</option>
                <option value="Private" style={{ background: '#111', color: '#fff' }}>🎉 Private Celebration</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Desired Date</label>
              <input 
                type="date"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                style={{
                  width: '100%', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Expected Guests</label>
              <input 
                type="number" 
                placeholder="e.g. 200"
                required
                value={formData.guests}
                onChange={e => setFormData({ ...formData, guests: e.target.value })}
                style={{
                  width: '100%', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '1rem', width: '100%', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              Check Calendar
            </button>
          </form>
        </div>
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
    <div style={{ marginBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>{title} <span>{accent}</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => scroll(-1)} className="btn-outline" style={{ width: 44, height: 44, padding: 0, borderRadius: '50%', fontSize: '0.9rem' }}>←</button>
          <button onClick={() => scroll(1)} className="btn-outline" style={{ width: 44, height: 44, padding: 0, borderRadius: '50%', fontSize: '0.9rem' }}>→</button>
        </div>
      </div>

      <div ref={scrollRef} style={{
        display: 'flex', gap: '2rem', overflowX: 'auto',
        paddingBottom: '1.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {events.length === 0 ? (
          <div className="glass-card" style={{ padding: '4rem', width: '100%', textAlign: 'center', color: 'var(--text-muted)' }}>
            We are designing new custom concepts. Check back soon!
          </div>
        ) : events.map(ev => (
          <div key={ev.id} style={{ minWidth: 340, maxWidth: 340, flexShrink: 0 }}>
            <EventCard event={ev} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Asymmetric 3-Column Service Portfolio Grid ----
const ServiceGrid = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const specialties = [
    {
      title: 'Luxury Weddings & Galas',
      desc: 'Elegant bespoke decor, global logistics planning, and elite hospitality management.',
      caseStudy: '120+ Premium Erode & Coimbatore Destination Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      sizeClass: 'grid-item-tall',
      accentColor: 'rgba(212, 175, 55, 0.85)'
    },
    {
      title: 'Concerts & Mega Festivals',
      desc: 'Massive staging structures, state-of-the-art concert audio line-arrays, and crowd-control systems.',
      caseStudy: 'Eagle Mega Fest: 8,000+ Attendees under Stage Lighting',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      sizeClass: 'grid-item-wide',
      accentColor: 'rgba(239, 68, 68, 0.85)'
    },
    {
      title: 'Corporate Summits & Launches',
      desc: 'Professional branding integrations, high-resolution LED visual arrays, and smooth speaker management.',
      caseStudy: 'TechCon Erode: In-person and hybrid corporate launching execution',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      sizeClass: 'grid-item-regular',
      accentColor: 'rgba(59, 130, 246, 0.85)'
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-label">Tailored Production</span>
          <h2 className="section-title">Specialty <span>Portfolio</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 650, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Explore our specialized event production capabilities designed to scale to any expectation.
          </p>
        </div>

        <div className="asymmetric-portfolio-grid">
          {specialties.map((spec, i) => (
            <div 
              key={i} 
              className={`portfolio-card ${spec.sizeClass}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#111',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              {/* Crisp Oversized Image */}
              <img 
                src={spec.image} 
                alt={spec.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                  transform: hoveredIdx === i ? 'scale(1.08)' : 'scale(1)'
                }}
              />

              {/* Dynamic Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: hoveredIdx === i 
                  ? `linear-gradient(to top, rgba(5,5,5,0.95) 10%, ${spec.accentColor} 100%)`
                  : 'linear-gradient(to top, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.2) 80%)',
                transition: 'all 0.4s ease',
                zIndex: 1
              }} />

              {/* Text Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                zIndex: 2,
                transition: 'transform 0.4s ease',
                transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(15px)'
              }}>
                <h3 className="display-font" style={{ 
                  fontSize: '1.5rem', 
                  color: '#fff', 
                  marginBottom: '0.6rem',
                  fontWeight: 700 
                }}>{spec.title}</h3>
                
                <p style={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  fontSize: '0.9rem', 
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                  opacity: hoveredIdx === i ? 1 : 0.8,
                  transition: 'opacity 0.3s'
                }}>{spec.desc}</p>

                {/* Case Study Snippet Revealed on Hover */}
                <div style={{
                  maxHeight: hoveredIdx === i ? '80px' : '0px',
                  opacity: hoveredIdx === i ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  paddingTop: '0.8rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em' }}>Proven Excellence</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{spec.caseStudy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .asymmetric-portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 420px;
          gap: 2rem;
        }
        .grid-item-tall {
          grid-row: span 1;
        }
        .grid-item-wide {
          grid-column: span 2;
        }
        .grid-item-regular {
          grid-column: span 1;
        }
        @media (max-width: 991px) {
          .asymmetric-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .grid-item-wide {
            grid-column: span 2;
          }
        }
        @media (max-width: 650px) {
          .asymmetric-portfolio-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 350px;
          }
          .grid-item-wide {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};

// ---- Interactive Timeline & Schedule Component ----
const InteractiveSchedule = () => {
  const [activeTab, setActiveTab] = useState('wedding');

  const schedules = {
    wedding: [
      { time: '09:00 AM', title: 'Traditional Welcome & Breakfast Hosting', desc: 'Decorated floral entrance with classical instrumental music welcoming up to 800 attendees.' },
      { time: '11:30 AM', title: 'Auspicious Muhurtham Rituals', desc: 'Flawless coordinating of the holy ceremonies under custom glass pavilion staging.' },
      { time: '06:30 PM', title: 'Grand Evening Reception & Stage Entry', desc: 'Dramatic fog entrance, customized LED stage lighting, and professional MC performances.' },
      { time: '08:30 PM', title: 'Gourmet Banquet Service', desc: 'Multi-cuisine premium buffet service managed seamlessly by our catering crew.' }
    ],
    corporate: [
      { time: '08:30 AM', title: 'Delegate Registration & Digital Badges', desc: 'Sleek self-check-in tablet portals at the grand entryway.' },
      { time: '09:30 AM', title: 'Keynote & Launch Reveal', desc: 'Cinematic intro video playing on a giant P3 LED wall with crisp audio engineering.' },
      { time: '02:00 PM', title: 'Interactive Panel Debates', desc: 'Panel stage configuration with multiple cordless headset integrations.' },
      { time: '06:00 PM', title: 'Networking & Cocktail Lounge', desc: 'Ambient lounge setup featuring smooth jazz session performances.' }
    ],
    festival: [
      { time: '03:00 PM', title: 'Gates Open & Security Screening', desc: 'Multi-lane barricade controls ensuring rapid, safe delegate entrance.' },
      { time: '05:00 PM', title: 'Opening Acts & DJ Sets', desc: 'Introducing regional stars backed by high-intensity strobe lighting arrays.' },
      { time: '08:00 PM', title: 'Main Concert Showcase', desc: 'Peak audio decibels with synchronized vertical flame throwers and laser mapping.' },
      { time: '11:00 PM', title: 'Visual Fireworks Finale', desc: 'Coordinated light displays bringing the celebratory night to a dramatic close.' }
    ]
  };

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Operational Roadmap</span>
          <h2 className="section-title">Experience <span>Timeline</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto', fontSize: '1.05rem' }}>
            Select an event configuration to view how we structure key milestone flows.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '4.5rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'wedding', label: '💍 Luxury Wedding Flow' },
            { id: 'corporate', label: '🏢 Corporate Summit Flow' },
            { id: 'festival', label: '⚡ Mega Concert Flow' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={activeTab === t.id ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '0.8rem 1.6rem', fontSize: '0.85rem', borderRadius: '30px' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Clean Vertical Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Center Line */}
          <div style={{ 
            position: 'absolute', 
            left: '30px', 
            top: '8px', 
            bottom: '8px', 
            width: '2px', 
            background: 'linear-gradient(to bottom, var(--primary), rgba(201,168,76,0.1))'
          }} />

          {schedules[activeTab].map((item, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                gap: '2.5rem',
                marginBottom: '3rem',
                position: 'relative',
                animation: 'fadeInUp 0.6s ease'
              }}
            >
              {/* Timeline Indicator Dot */}
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '3px solid var(--bg-main)',
                boxShadow: '0 0 10px var(--primary)',
                flexShrink: 0,
                marginTop: '6px',
                zIndex: 2,
                marginLeft: '24px'
              }} />

              {/* Content Panel */}
              <div className="glass-card" style={{ 
                flex: 1, 
                padding: '2rem', 
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '8px'
              }}>
                <span style={{ 
                  color: 'var(--primary-light)', 
                  fontWeight: 700, 
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>{item.time}</span>
                <h4 className="display-font" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.8rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---- Social Proof Slider with Grayscale Corporate Logos ----
const SocialProofSlider = ({ testimonials }) => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  // Grayscale Corporate Partner Logos representing premium clients
  const partners = [
    { name: 'Tata', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120' },
    { name: 'Reliance', url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120' },
    { name: 'Infosys', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120' },
    { name: 'Wipro', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120' }
  ];

  if (!testimonials || !testimonials.length) return null;

  return (
    <section className="section" style={{ background: '#090909', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        
        {/* Large Typography Reviews Grid */}
        <div style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem' }}>
          <span className="section-label" style={{ color: 'var(--primary-light)' }}>Accolades</span>
          
          {t && (
            <div key={active} style={{ animation: 'fadeInUp 0.8s ease', marginTop: '2rem' }}>
              {/* Large Star Ratings */}
              <div style={{ color: 'var(--primary)', fontSize: '1.5rem', letterSpacing: '6px', marginBottom: '2rem' }}>
                {'★'.repeat(t.rating || 5)}
              </div>

              {/* Bold Large Review Text */}
              <blockquote className="display-font" style={{ 
                fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', 
                color: '#fff', 
                fontWeight: 300, 
                lineHeight: 1.5, 
                fontStyle: 'italic', 
                marginBottom: '3rem',
                border: 'none',
                padding: 0
              }}>
                "{t.message}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem' }}>
                <img 
                  src={t.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                  alt={t.clientName} 
                  style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'; }} 
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>{t.clientName}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.clientRole}{t.company ? ` · ${t.company}` : ''}</div>
                </div>
              </div>
            </div>
          )}

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', marginTop: '3.5rem' }}>
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)} 
                style={{
                  width: i === active ? 28 : 8, 
                  height: 6, 
                  borderRadius: 3,
                  border: 'none', 
                  cursor: 'pointer',
                  background: i === active ? 'var(--primary)' : 'rgba(255,255,255,0.12)',
                  transition: 'all 0.3s'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Grayscale Brand Logos */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          paddingTop: '4rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '0.75rem', 
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.25em',
            marginBottom: '2.5rem',
            fontWeight: 700
          }}>Trusted by Leading Corporations</div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '5rem', 
            flexWrap: 'wrap'
          }} className="logo-strip">
            {partners.map((p, i) => (
              <div key={i} style={{ 
                fontSize: '1.4rem', 
                fontWeight: 800, 
                color: 'var(--text-muted)', 
                opacity: 0.35, 
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.95'; e.currentTarget.style.color = 'var(--primary-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.35'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {p.name}
              </div>
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
    padding: '8rem 0',
    background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.07), transparent 70%), var(--bg-main)',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    textAlign: 'center',
    position: 'relative', 
    overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600)', backgroundSize: 'cover', opacity: 0.02, pointerEvents: 'none' }} />
    
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <span className="section-label">Connect</span>
      <h2 className="display-font" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 800 }}>
        Ready to Co-Create <br />
        <span style={{ color: 'var(--primary)' }}>Your Masterpiece?</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 3.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
        Reserve your event consultation with our design directors today. Let's make your concept unforgettable.
      </p>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/contact" className="btn-primary" style={{ padding: '1.1rem 3rem', fontSize: '0.9rem', fontWeight: 700 }}>Book Your Consultation</Link>
        <Link to="/events" className="btn-outline" style={{ padding: '1.1rem 2.5rem', fontSize: '0.9rem', fontWeight: 700 }}>Explore Events</Link>
      </div>
    </div>
  </section>
);

const DEFAULT_TESTIMONIALS = [
  {
    clientName: 'Sanjay Kumar',
    clientRole: 'VP of Marketing',
    company: 'TCS Coimbatore',
    message: 'Eagle Entertainment executed our product launch with ultimate perfection. The sound setups, LED mapping walls, and smooth transition management were world-class.',
    rating: 5
  },
  {
    clientName: 'Meera Arjun',
    clientRole: 'Bride',
    company: 'Erode',
    message: 'The team made our wedding dream a gorgeous reality. From the entry styling to the stage coordination, it was absolutely stunning and stress-free.',
    rating: 5
  },
  {
    clientName: 'Dr. Vivek Raman',
    clientRole: 'Organizing Committee Chair',
    company: 'IMA Conference',
    message: 'Professionalism, reliability, and top-tier guest management. We had over 1,200 delegates and every phase went flawlessly.',
    rating: 5
  }
];

// ---- Main Home ----
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    publicApi.getUpcomingEvents().then(r => setUpcomingEvents(r.data)).catch(() => {});
    publicApi.getRecentEvents().then(r => setRecentEvents(r.data)).catch(() => {});
    
    // Fetch testimonials, default if none are returned
    publicApi.getTestimonials()
      .then(r => {
        if (r.data && r.data.length > 0) {
          setTestimonials(r.data);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      })
      .catch(() => {
        setTestimonials(DEFAULT_TESTIMONIALS);
      });
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Stats Counter Bar */}
      <div style={{ background: '#0a0a0a', borderBottom: '1px solid var(--border)', padding: '3.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2.5rem' }}>
          {[
            { n: '500+', l: 'Events Orchestrated' },
            { n: '10+', l: 'Years of Artistry' },
            { n: '100%', l: 'Satisfaction Rate' },
            { n: '24/7', l: 'Dedicated Concierge' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div className="display-font" style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.22em', marginTop: '0.6rem', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Rows Section */}
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <EventsRow
            title="Upcoming" 
            accent="Showcases"
            label="Reserve Your Spot"
            events={upcomingEvents}
          />
          <div id="highlights">
            <EventsRow
              title="Recent" 
              accent="Masterpieces"
              label="Proven Success"
              events={recentEvents}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/events" className="btn-outline" style={{ padding: '0.9rem 2.2rem', fontSize: '0.85rem' }}>View Event Catalog</Link>
          </div>
        </div>
      </section>

      <ServiceGrid />
      <InteractiveSchedule />
      <SocialProofSlider testimonials={testimonials} />
      <CTA />
    </div>
  );
};

export default Home;
