import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: 'Wedding Planning', icon: '💍', desc: 'Complete end-to-end wedding management, decor, and coordination.' },
    { title: 'Corporate Events', icon: '🏢', desc: 'Professional conferences, seminars, and corporate offsites.' },
    { title: 'Concerts & Shows', icon: '🎵', desc: 'Large scale musical concerts and live entertainment shows.' },
    { title: 'Private Parties', icon: '🎉', desc: 'Birthdays, anniversaries, and exclusive private gatherings.' },
  ];

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh', background:'var(--bg-main)' }}>
      <div style={{ background:'var(--bg-surface)', padding:'5rem 0', textAlign:'center', borderBottom:'1px solid var(--border)' }}>
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="section-title">
          Our <span>Services</span>
        </motion.h1>
        <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto' }}>
          We provide a wide array of event management services tailored to your needs.
        </p>
      </div>

      <div className="container" style={{ padding:'4rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'2rem' }}>
          {services.map((s, i) => (
            <motion.div key={i} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay: i*0.1}} className="glass-card" style={{ padding:'2rem', textAlign:'center' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>{s.icon}</div>
              <h3 style={{ color:'#fff', marginBottom:'1rem', fontFamily:'var(--font-display)' }}>{s.title}</h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.9rem' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
