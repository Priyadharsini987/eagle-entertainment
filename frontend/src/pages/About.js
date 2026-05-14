import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    { name:'Arjun Selvam', role:'Managing Director', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', bio:'A leader with over 12 years of experience in making big events happen.' },
    { name:'Priya Nair', role:'Creative Head', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', bio:'A creative expert who makes every event look beautiful and unique.' },
    { name:'Karthik Raj', role:'Operations Head', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', bio:'A specialist who makes sure everything runs perfectly on time.' },
    { name:'Deepika Iyer', role:'Planning Head', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', bio:'A planning expert focused on giving our clients the best experience.' },
  ];

  const milestones = [
    { year:'2014', event:'Started in Coimbatore with a small, passionate team' },
    { year:'2016', event:'Expanded our services to major cities across India' },
    { year:'2018', event:'Completed over 100 successful company events' },
    { year:'2020', event:'Started using new digital tools for online events' },
    { year:'2022', event:'Won the award for the Best Event Company in the region' },
    { year:'2024', event:'Becoming a top leader in the event planning industry' },
  ];

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{
        background:'var(--bg-surface)', borderBottom:'1px solid var(--border)',
        padding:'8rem 0 6rem', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600)', backgroundSize:'cover', opacity:0.1 }} />
        <div className="container" style={{ position:'relative', textAlign:'center' }}>
          <span className="section-label">Our Legacy</span>
          <h1 className="section-title">About <span>Eagle Entertainment</span></h1>
          <p style={{ color:'var(--text-muted)', maxWidth:700, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.9 }}>
            Over 10 years of experience in making events perfect. We don't just manage events; we create memories that last forever.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="about-grid">
            <div className="glass-card" style={{ padding:'1rem', borderRadius:'var(--radius-lg)' }}>
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700" alt="Our Story"
                style={{ width:'100%', borderRadius:'var(--radius-md)', display:'block' }}
                onError={e => e.target.style.display='none'} />
            </div>
            <div>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title" style={{ marginBottom:'2rem' }}>We Create <span>Amazing</span> Memories</h2>
              <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'1.5rem', fontSize:'1rem' }}>
                Founded in 2014, Eagle Entertainment started with a simple goal: to make every event a work of art. Over the last 10 years, we have grown from a small group into a top agency known for great ideas and perfect planning.
              </p>
              <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'3rem', fontSize:'1rem' }}>
                Our office is where we come up with new ideas and make sure every event is perfect. Our team of over 50 experts works hard to make your dreams come true. From big company launches to private parties, we handle everything with care.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginBottom:'3rem' }}>
                {[
                  { num:'500+', label:'Events Completed' },
                  { num:'10+', label:'Years of Experience' },
                  { num:'50+', label:'Team Members' },
                  { num:'98%', label:'Satisfied Clients' },
                ].map((s, i) => (
                  <div key={i} style={{ padding:'1.5rem', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:'var(--radius-md)', textAlign:'center' }}>
                    <div style={{ fontSize:'2.5rem', fontWeight:700, color:'var(--primary-light)', lineHeight:1, marginBottom:'5px' }}>{s.num}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.15em', textTransform:'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">Initiate Collaboration</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'5rem' }}>
            <span className="section-label">Our Offerings</span>
            <h2 className="section-title">Service <span>Packages</span></h2>
            <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto', fontSize:'1.1rem' }}>
              Choose the level of service that fits your event goals.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'2rem' }}>
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
              <div key={i} className="glass-card" style={{ padding:'4rem 2.5rem', border: p.name === 'Premium' ? '1px solid var(--primary)' : '1px solid var(--border)', position:'relative' }}>
                {p.name === 'Premium' && (
                  <div style={{ position:'absolute', top:0, right:0, background:'var(--primary)', color:'#000', padding:'0.5rem 1rem', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase' }}>Most Popular</div>
                )}
                <h3 className="display-font" style={{ fontSize:'1.8rem', color:'#fff', marginBottom:'0.5rem' }}>{p.name}</h3>
                <div style={{ color: p.accent, fontSize:'1.1rem', fontWeight:700, marginBottom:'2.5rem' }}>{p.price}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem', marginBottom:'3rem' }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', fontSize:'0.9rem', color:'var(--text-muted)' }}>
                      <span style={{ color:'var(--primary)' }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className={p.name === 'Premium' ? 'btn-primary' : 'btn-outline'} style={{ width:'100%' }}>Choose {p.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'5rem' }}>
            <span className="section-label">Our History</span>
            <h2 className="section-title">How We <span>Grew</span></h2>
          </div>
          <div style={{ position:'relative', maxWidth:800, margin:'0 auto' }}>
            <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:0, bottom:0, width:1, background:'var(--border)' }} />
            {milestones.map((m, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:'4rem',
                marginBottom:'4rem', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              }}>
                <div style={{ flex:1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div style={{ fontSize:'1.8rem', fontWeight:700, color:'var(--primary-light)', marginBottom:'8px' }}>{m.year}</div>
                  <div className="glass-card" style={{ padding:'1.5rem', display:'inline-block' }}>
                    <div style={{ color:'var(--text-main)', fontSize:'1rem', lineHeight:1.6 }}>{m.event}</div>
                  </div>
                </div>
                <div style={{
                  width:16, height:16, borderRadius:'50%',
                  background:'var(--primary)', border:'4px solid var(--bg-main)',
                  boxShadow:'0 0 15px var(--primary)', flexShrink:0, zIndex:2
                }} />
                <div style={{ flex:1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'5rem' }}>
            <span className="section-label">Support</span>
            <h2 className="section-title">Common <span>Questions</span></h2>
          </div>
          <div style={{ maxWidth:800, margin:'0 auto', display:'grid', gap:'1.5rem' }}>
            {[
              { q: 'What types of events do you handle?', a: 'We handle everything from luxury weddings and private parties to big corporate launches and live music concerts.' },
              { q: 'How early should I book my event?', a: 'We recommend booking at least 3-6 months in advance for big events, but we also handle last-minute requests depending on availability.' },
              { q: 'Do you work outside of Coimbatore?', a: 'Yes, we manage events all across India and are ready to travel to your location.' },
              { q: 'Can you help with the budget planning?', a: 'Absolutely. We work with you to plan an amazing event that fits your budget perfectly.' }
            ].map((f, i) => (
              <div key={i} className="glass-card" style={{ padding:'2rem' }}>
                <h4 style={{ color:'var(--primary-light)', fontSize:'1.1rem', marginBottom:'1rem', fontWeight:600 }}>{f.q}</h4>
                <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'5rem' }}>
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet Our <span>Leaders</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'2.5rem' }}>
            {team.map((member, i) => (
              <div key={i} className="glass-card" style={{
                textAlign:'center', padding:'3rem 2rem',
                transition:'var(--transition)', position:'relative', overflow:'hidden'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-10px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; }}
              >
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'var(--primary)' }} />
                <img src={member.img} alt={member.name} style={{ width:120, height:120, borderRadius:'50%', objectFit:'cover', border:'4px solid var(--glass-border)', marginBottom:'2rem' }}
                  onError={e => e.target.style.display='none'} />
                <h3 className="display-font" style={{ fontSize:'1.5rem', color:'#fff', marginBottom:'0.5rem' }}>{member.name}</h3>
                <div style={{ color:'var(--primary-light)', fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'1.5rem' }}>{member.role}</div>
                <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:1.7 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @media(max-width:900px){.about-grid{grid-template-columns:1fr!important; gap:3rem!important;}}
      `}</style>
    </div>
  );
};

export default About;
