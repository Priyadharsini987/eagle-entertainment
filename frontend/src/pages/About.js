import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi, getImageUrl } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [team, setTeam] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    publicApi.getTeam().then(res => setTeam(Array.isArray(res.data) ? res.data : [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (team.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % team.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [team.length]);

  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % team.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + team.length) % team.length);

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      
      {/* Hero Header */}
      <div style={{
        background:'var(--bg-surface)', borderBottom:'1px solid var(--border)',
        padding:'8rem 0 6rem', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600)', backgroundSize:'cover', opacity:0.12 }} />
        <div className="container" style={{ position:'relative', zIndex: 1, textAlign:'center' }}>
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >Our Legacy</motion.span>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >About <span>Eagle Entertainment</span></motion.h1>
          <motion.p 
            style={{ color:'var(--text-muted)', maxWidth:740, margin:'0 auto', fontSize:'1.12rem', lineHeight:1.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Over 5+ years of mastery in transforming events into legendary experiences. From our base in Erode, we serve the entire state of Tamil Nadu with unmatched passion and precision.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="about-grid">
            <motion.div 
              className="glass-card" 
              style={{ padding:'1rem', borderRadius:'var(--radius-lg)', border: '1px solid rgba(255,255,255, 0.15)' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700" alt="Our Story"
                style={{ width:'100%', borderRadius:'var(--radius-md)', display:'block', boxShadow: '0 20px 45px var(--bg-card)' }}
                onError={e => e.target.style.display='none'} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="section-label">Who We Are</span>
              <h2 className="section-title" style={{ marginBottom:'2rem' }}>We Create <span>Amazing</span> Memories</h2>
              <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'1.5rem', fontSize:'1.02rem' }}>
                Founded in Erode, Eagle Entertainment started with a singular vision: to elevate every celebration into an extraordinary masterpiece. Over the past 5+ years, we have evolved into Tamil Nadu's premier event management agency, renowned for our innovative concepts and flawless execution.
              </p>
              <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'3.5rem', fontSize:'1.02rem' }}>
                Whether it's a corporate gala in Chennai, a prestigious award ceremony in Madurai, or a grand product launch in our home city of Erode, we bring professional excellence to every corner of the state. Our dedicated team works tirelessly to ensure your vision is realized with a touch of elegance and grandeur.
              </p>
              <Link to="/contact" className="btn-primary">Initiate Collaboration</Link>
            </motion.div>
          </div>
        </div>
      </section>





      {/* Team Leaders */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'6rem' }}>
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet Our <span>Leaders</span></h2>
          </div>
          
          <div style={{ position:'relative', maxWidth: 600, margin:'0 auto' }}>
            {team.length > 0 ? (
              <div style={{ position: 'relative', minHeight: '420px' }}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card"
                    style={{
                      textAlign:'center', padding:'3.5rem 2.2rem',
                      position:'absolute', width: '100%',
                      border: '1px solid rgba(255,255,255, 0.12)'
                    }}
                  >
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'var(--primary)' }} />
                    <img 
                      src={getImageUrl(team[currentIndex].imageUrl || team[currentIndex].img)} 
                      alt={team[currentIndex].name} 
                      style={{ width:130, height:130, borderRadius:'50%', objectFit:'cover', border:'4px solid var(--border)', marginBottom:'2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.6)' }}
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300'; }} 
                    />
                    <h3 className="display-font" style={{ fontSize:'1.6rem', color: 'var(--text-main)', marginBottom:'0.5rem', fontWeight: 600 }}>{team[currentIndex].name}</h3>
                    <div style={{ color:'var(--primary-light)', fontSize:'0.75rem', fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'1.8rem' }}>
                      {team[currentIndex].role}
                    </div>
                    <p style={{ color:'var(--text-muted)', fontSize:'0.92rem', lineHeight:1.75 }}>{team[currentIndex].bio}</p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                {team.length > 1 && (
                  <>
                    <button onClick={prevSlide} style={{ position:'absolute', top:'50%', left:'-3rem', transform:'translateY(-50%)', background:'transparent', border:'none', color:'var(--primary)', fontSize:'2rem', cursor:'pointer' }}>
                      &#10094;
                    </button>
                    <button onClick={nextSlide} style={{ position:'absolute', top:'50%', right:'-3rem', transform:'translateY(-50%)', background:'transparent', border:'none', color:'var(--primary)', fontSize:'2rem', cursor:'pointer' }}>
                      &#10095;
                    </button>
                    <div style={{ position:'absolute', bottom:'-3rem', left:0, right:0, display:'flex', justifyContent:'center', gap:'0.5rem' }}>
                      {team.map((_, idx) => (
                        <div key={idx} onClick={() => setCurrentIndex(idx)} style={{ width: 10, height: 10, borderRadius: '50%', background: currentIndex === idx ? 'var(--primary)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'background 0.3s ease' }} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No team members to display.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'6rem' }}>
            <span className="section-label">Support</span>
            <h2 className="section-title">Common <span>Questions</span></h2>
          </div>
          
          <div style={{ maxWidth:850, margin:'0 auto', display:'grid', gap:'1.8rem' }}>
            {[
              { q: 'What types of events do you handle?', a: 'We handle everything from prestigious award ceremonies and celebrity management, to big corporate launches and live music concerts.' },
              { q: 'How early should I book my event?', a: 'We recommend booking at least 3-6 months in advance for big events, but we also handle last-minute requests depending on availability.' },
              { q: 'Do you work outside of Erode?', a: 'Absolutely! While we are based in Erode, we handle high-profile events all over Tamil Nadu, including Chennai, Coimbatore, Madurai, and Trichy.' },
              { q: 'Can you help with the budget planning?', a: 'Absolutely. We work with you to plan an amazing event that fits your budget perfectly.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                className="glass-card" 
                style={{ padding:'2.2rem 2.5rem', border: '1px solid rgba(255,255,255, 0.12)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <h4 style={{ color:'var(--primary)', fontSize:'1.2rem', marginBottom:'1.1rem', fontWeight:600, fontFamily: 'var(--font-display)' }}>✦ {f.q}</h4>
                <p style={{ color:'var(--text-muted)', fontSize:'0.98rem', lineHeight:1.75 }}>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <style>{`
        @media(max-width:900px){
          .about-grid { grid-template-columns:1fr!important; gap:4rem!important; }
        }
      `}</style>
    </div>
  );
};

export default About;
