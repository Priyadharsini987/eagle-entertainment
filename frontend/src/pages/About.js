import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi, getImageUrl } from '../services/api';
import { motion } from 'framer-motion';

const DEFAULT_TEAM = [
  { name:'Priya Dharshini', role:'Founder & Managing Director', imageUrl:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500', bio:'With over a decade of experience, Priya drives the creative vision and execution of premium luxury events.' },
  { name:'Arjun Prasad', role:'Co-Founder & Chief Operations Officer', imageUrl:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500', bio:'Arjun manages logistics, vendor relations, and production operations, ensuring flawless execution on-site.' },
  { name:'Deepa Raman', role:'Lead Wedding Designer', imageUrl:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500', bio:'Specializing in floral design and thematic aesthetics, Deepa designs bespoke dream wedding experiences.' }
];

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    publicApi.getTeam()
      .then(res => {
        if (res.data && res.data.length > 0) {
          setTeam(res.data);
        } else {
          setTeam(DEFAULT_TEAM);
        }
      })
      .catch(() => {
        setTeam(DEFAULT_TEAM);
      });
  }, []);

  const milestones = [
    { year:'2014', event:'Inception of Eagle Entertainment in Erode, Tamil Nadu' },
    { year:'2016', event:'Expanded our services to major cities across India' },
    { year:'2018', event:'Completed over 100 successful company events' },
    { year:'2020', event:'Started using new digital tools for online events' },
    { year:'2022', event:'Won the award for the Best Event Company in the region' },
    { year:'2024', event:'Becoming a top leader in the event planning industry' },
  ];

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
            Over 10 years of mastery in transforming events into legendary experiences. From our base in Erode, we serve the entire state of Tamil Nadu with unmatched passion and precision.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="about-grid">
            <motion.div 
              className="glass-card" 
              style={{ padding:'1rem', borderRadius:'var(--radius-lg)', border: '1px solid rgba(212, 175, 55, 0.15)' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700" alt="Our Story"
                style={{ width:'100%', borderRadius:'var(--radius-md)', display:'block', boxShadow: '0 20px 45px rgba(0,0,0,0.85)' }}
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
                Founded in 2014 in Erode, Eagle Entertainment started with a singular vision: to elevate every celebration into an extraordinary masterpiece. Over the past decade, we have evolved into Tamil Nadu's premier event management agency, renowned for our innovative concepts and flawless execution.
              </p>
              <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'3.5rem', fontSize:'1.02rem' }}>
                Whether it's a corporate gala in Chennai, a destination wedding in Madurai, or a private event in our home city of Erode, we bring professional excellence to every corner of the state. Our dedicated team works tirelessly to ensure your vision is realized with a touch of elegance and grandeur.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginBottom:'3rem' }}>
                {[
                  { num:'500+', label:'Events Completed' },
                  { num:'10+', label:'Years of Experience' },
                  { num:'50+', label:'Team Members' },
                  { num:'98%', label:'Satisfied Clients' },
                ].map((s, i) => (
                  <div key={i} style={{ padding:'1.8rem', background:'rgba(212, 175, 55, 0.03)', border:'1px solid rgba(212, 175, 55, 0.15)', borderRadius:'var(--radius-md)', textAlign:'center', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}>
                    <div style={{ fontSize:'2.6rem', fontWeight:800, color:'var(--primary)', lineHeight:1, marginBottom:'6px', fontFamily: 'var(--font-display)' }}>{s.num}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.18em', textTransform:'uppercase', fontWeight: 700 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">Initiate Collaboration</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'6rem' }}>
            <span className="section-label">Our Offerings</span>
            <h2 className="section-title">Service <span>Packages</span></h2>
            <p style={{ color:'var(--text-muted)', maxWidth:640, margin:'0 auto', fontSize:'1.1rem', lineHeight: 1.8 }}>
              Choose the level of service that fits your event goals.
            </p>
          </div>
          
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(310px, 1fr))', gap:'2.5rem' }}>
            {[
              { 
                name: 'Essential', price: 'Starting from ₹50k', 
                features: ['Venue Selection Assistance', 'Basic Decor & Lighting', 'Audio System Setup', 'On-site Coordination (4 hours)', 'Single Point of Contact'],
                accent: 'var(--text-muted)'
              },
              { 
                name: 'Premium', price: 'Starting from ₹2L', 
                features: ['Full Venue Management', 'Professional Theme Decor', 'Live Band/DJ Management', 'Full-day Coordination', 'Digital Invitations & RSVPs'],
                accent: 'var(--primary)'
              },
              { 
                name: 'Elite', price: 'Starting from ₹5L', 
                features: ['Global Logistics & Travel', 'Luxury Designer Decor', 'Celebrity Guest Management', 'Multi-day Event Planning', 'VIP Hospitality Services'],
                accent: 'var(--primary-light)'
              }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                className="glass-card" 
                style={{ 
                  padding:'4.5rem 2.8rem', 
                  border: p.name === 'Premium' ? '1px solid var(--primary)' : '1px solid var(--border)', 
                  position:'relative',
                  boxShadow: p.name === 'Premium' ? 'var(--shadow-glow)' : 'none'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {p.name === 'Premium' && (
                  <div style={{ position:'absolute', top:0, right:0, background:'var(--primary)', color:'#000', padding:'0.6rem 1.4rem', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing: '0.1em' }}>Most Popular</div>
                )}
                <h3 className="display-font" style={{ fontSize:'2rem', color:'#fff', marginBottom:'0.6rem', fontWeight: 600 }}>{p.name}</h3>
                <div style={{ color: p.accent, fontSize:'1.2rem', fontWeight:800, marginBottom:'3rem', fontFamily: 'var(--font-main)' }}>{p.price}</div>
                
                <div style={{ display:'flex', flexDirection:'column', gap:'1.4rem', marginBottom:'3.5rem' }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display:'flex', gap:'0.85rem', alignItems:'flex-start', fontSize:'0.92rem', color:'var(--text-muted)', lineHeight: 1.4 }}>
                      <span style={{ color:'var(--primary)', fontSize: '1rem' }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                
                <Link to="/contact" className={p.name === 'Premium' ? 'btn-primary' : 'btn-outline'} style={{ width:'100%', padding: '1rem' }}>Choose {p.name}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'6.5rem' }}>
            <span className="section-label">Our History</span>
            <h2 className="section-title">How We <span>Grew</span></h2>
          </div>
          
          <div style={{ position:'relative', maxWidth:850, margin:'0 auto' }}>
            <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:0, bottom:0, width:1, background:'var(--border)' }} />
            
            {milestones.map((m, i) => (
              <motion.div 
                key={i} 
                style={{
                  display:'flex', alignItems:'center', gap:'4.5rem',
                  marginBottom:'4.5rem', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ flex:1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div style={{ fontSize:'2.1rem', fontWeight:800, color:'var(--primary)', marginBottom:'10px', fontFamily: 'var(--font-display)' }}>{m.year}</div>
                  <div className="glass-card" style={{ padding:'1.8rem', display:'inline-block', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
                    <div style={{ color:'var(--text-main)', fontSize:'1.02rem', lineHeight:1.65 }}>{m.event}</div>
                  </div>
                </div>
                
                <div style={{
                  width:20, height:20, borderRadius:'50%',
                  background:'var(--primary)', border:'4px solid var(--bg-main)',
                  boxShadow:'0 0 15px var(--primary)', flexShrink:0, zIndex:2
                }} />
                
                <div style={{ flex:1 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Grid */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'6rem' }}>
            <span className="section-label">Support</span>
            <h2 className="section-title">Common <span>Questions</span></h2>
          </div>
          
          <div style={{ maxWidth:850, margin:'0 auto', display:'grid', gap:'1.8rem' }}>
            {[
              { q: 'What types of events do you handle?', a: 'We handle everything from luxury weddings and private parties to big corporate launches and live music concerts.' },
              { q: 'How early should I book my event?', a: 'We recommend booking at least 3-6 months in advance for big events, but we also handle last-minute requests depending on availability.' },
              { q: 'Do you work outside of Erode?', a: 'Absolutely! While we are based in Erode, we handle high-profile events all over Tamil Nadu, including Chennai, Coimbatore, Madurai, and Trichy.' },
              { q: 'Can you help with the budget planning?', a: 'Absolutely. We work with you to plan an amazing event that fits your budget perfectly.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                className="glass-card" 
                style={{ padding:'2.2rem 2.5rem', border: '1px solid rgba(212, 175, 55, 0.12)' }}
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

      {/* Team Leaders */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'6rem' }}>
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet Our <span>Leaders</span></h2>
          </div>
          
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'3rem' }}>
            {team.map((member, i) => (
              <motion.div 
                key={i} 
                className="glass-card" 
                style={{
                  textAlign:'center', padding:'3.5rem 2.2rem',
                  position:'relative', overflow:'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.12)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'var(--primary)' }} />
                
                <img 
                  src={getImageUrl(member.imageUrl || member.img)} 
                  alt={member.name} 
                  style={{ width:130, height:130, borderRadius:'50%', objectFit:'cover', border:'4px solid var(--border)', marginBottom:'2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.6)' }}
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300'; }} 
                />
                
                <h3 className="display-font" style={{ fontSize:'1.6rem', color:'#fff', marginBottom:'0.5rem', fontWeight: 600 }}>{member.name}</h3>
                
                <div style={{ color:'var(--primary-light)', fontSize:'0.75rem', fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'1.8rem' }}>
                  {member.role}
                </div>
                
                <p style={{ color:'var(--text-muted)', fontSize:'0.92rem', lineHeight:1.75 }}>{member.bio}</p>
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
