import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi, getImageUrl } from '../services/api';
import { useEvents } from '../context/EventContext';
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
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0.5) 60%, rgba(2, 6, 23, 0.8) 100%)' }} />
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
        style={{ position:'absolute', left:'1.5%', top:'50%', transform:'translateY(-50%)', zIndex:10, background:'rgba(15,23,42,0.3)', border:'1px solid rgba(0,0,0,0.1)', color:'var(--text-main)', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', backdropFilter:'blur(10px)', fontSize:'0.9rem', transition:'var(--transition-fast)' }}
        onMouseOver={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.6)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
      >
        &#10094;
      </button>
      <button 
        onClick={nextSlide}
        style={{ position:'absolute', right:'1.5%', top:'50%', transform:'translateY(-50%)', zIndex:10, background:'rgba(15,23,42,0.3)', border:'1px solid rgba(0,0,0,0.1)', color:'var(--text-main)', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', backdropFilter:'blur(10px)', fontSize:'0.9rem', transition:'var(--transition-fast)' }}
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
  return (
    <div style={{ marginBottom:'4.5rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2.5rem', flexWrap:'wrap', gap: '1.5rem' }}>
        <div>
          <span className="section-label">{label}</span>
          <h2 className="section-title" style={{ fontSize:'clamp(2rem, 4vw, 2.8rem)', marginBottom:0 }}>{title} <span>{accent}</span></h2>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
        style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'2.5rem',
      }}>
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
            style={{ width: '100%' }}
          >
            <EventCard event={ev} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// ---- Video Reel Section ----
const VideoReelSection = ({ videoUrl }) => {
  if (!videoUrl) return null; // Don't show section if no video URL is configured

  return (
    <section className="section" style={{ background:'var(--bg-surface)', borderBottom:'1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom:'3rem' }}>
          <span className="section-label">Experience the Magic</span>
          <h2 className="section-title">Our Best <span>Moments</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>Watch the highlights of our grandest events, from celebrity award shows to high-energy concerts.</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto', 
            aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(223,178,89,0.2)'
          }}
        >
          {/* Using a placeholder video or high-quality iframe embed */}
          <iframe 
            width="100%" 
            height="100%" 
            src={videoUrl} 
            title="Eagle Entertainment Promo Reel" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

// ---- Main Home ----
const Home = () => {
  const { upcomingEvents, recentEvents } = useEvents();
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    publicApi.getGallery().then(r => setGallery(Array.isArray(r.data) ? r.data.slice(0, 6) : [])).catch(() => {});
    publicApi.getTestimonials().then(r => setTestimonials(Array.isArray(r.data) ? r.data.slice(0, 3) : [])).catch(() => {});
    publicApi.getSettings().then(r => {
      const v = r.data?.find(s => s.settingKey === 'promo_video_url');
      if (v) setVideoUrl(v.settingValue);
      else setVideoUrl('https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1');
    }).catch(() => {
      setVideoUrl('https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1');
    });
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Scrolling Marquee Stats */}
      <div style={{ background:'var(--bg-card)', borderBottom:'1px solid var(--border)', padding:'2.5rem 0', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-content {
            display: flex;
            animation: marquee 20s linear infinite;
            gap: 8rem;
            padding-right: 8rem;
          }
          .marquee-item {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            text-align: center;
            align-items: center;
          }
        `}</style>
        <div className="marquee-content">
          {[...Array(4)].map((_, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {[
                { n: '5+', l: 'Years of Artistry' },
                { n: '100%', l: 'Satisfaction Index' },
                { n: '24/7', l: 'Dedicated Stewardship' },
              ].map((s, i) => (
                <div key={i} className="marquee-item">
                  <div style={{ fontSize:'2rem', fontWeight: 800, color:'var(--primary)', lineHeight:1, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>{s.n}</div>
                  <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.2em', fontWeight: 700 }}>{s.l}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <VideoReelSection videoUrl={videoUrl} />

      {/* Events Section */}
      <section className="section" style={{ paddingBottom:'3rem' }}>
        <div className="container">
          <EventsRow
            title="Upcoming" accent="Events"
            label="Don't Miss Out"
            events={upcomingEvents.slice(0, 3)}
          />
          <div id="highlights">
            <EventsRow
              title="Recent" accent="Events"
              label="Completed Masterpieces"
              events={recentEvents.slice(0, 3)}
            />
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign:'center', marginTop:'1.5rem' }}
          >
            <Link to="/events" className="btn-outline">Browse Full Catalogue</Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section Preview */}
      {gallery.length > 0 && (
        <section className="section" style={{ background:'var(--bg-card)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
          <div className="container">
            <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
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
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem', marginBottom:'2rem' }}
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
                  <img src={getImageUrl(g.imageUrl)} alt={g.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s ease' }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'; }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display:'flex', alignItems:'flex-end', padding:'1.5rem' }}>
                    <div>
                      <h4 style={{ color:'var(--text-main)', margin:0, fontFamily:'var(--font-display)' }}>{g.title}</h4>
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

      {/* Visionary Section */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)', borderBottom: testimonials.length > 0 ? 'none' : '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Visionary Behind <span>Eagle Entertainment</span></h2>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ flex: '1 1 300px', maxWidth: '450px' }}
            >
              <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(0,0,0,0.1)' }}>
                <img src="/arjun_raja.png" alt="Arjun Raja - CEO & Founder" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }} />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ flex: '1 1 300px', maxWidth: '600px' }}
            >
              <h3 className="display-font" style={{ fontSize:'2.2rem', color: '#111827', marginBottom:'0.5rem', fontWeight: 700 }}>Arjun Raja</h3>
              <div style={{ color:'var(--primary)', fontSize:'0.9rem', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'2rem' }}>
                CEO & Founder
              </div>
              <p style={{ color:'var(--text-muted)', fontSize:'1.1rem', lineHeight:1.8, marginBottom:'1.5rem' }}>
                With a profound passion for creating unforgettable experiences, Arjun Raja founded Eagle Entertainment to redefine the standards of event management in Tamil Nadu. His visionary approach and meticulous attention to detail have transformed countless concepts into spectacular realities.
              </p>
              <p style={{ color:'var(--text-muted)', fontSize:'1.1rem', lineHeight:1.8, marginBottom:'2.5rem' }}>
                Under his leadership, the agency has grown exponentially, setting new benchmarks in the industry and continually surpassing client expectations through innovation and excellence.
              </p>
              
              <Link to="/about" className="btn-outline">More About Us</Link>
            </motion.div>
          </div>
        </div>
      </section>

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
