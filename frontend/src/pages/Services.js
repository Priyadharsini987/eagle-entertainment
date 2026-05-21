import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { publicApi } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.getServices().then(res => {
      setServices(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

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
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading services...</div>
        ) : services.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No service packages available yet.</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'2rem' }}>
            {services.map((s, i) => (
              <motion.div 
                key={s.id} 
                initial={{opacity:0, scale:0.95}} 
                animate={{opacity:1, scale:1}} 
                transition={{delay: i*0.1}} 
                className="glass-card" 
                style={{ 
                  padding:'3rem 2rem', 
                  textAlign:'center',
                  borderTop: `3px solid ${s.accent}`
                }}
              >
                <h3 style={{ color: 'var(--text-main)', marginBottom:'0.5rem', fontFamily:'var(--font-display)', fontSize: '1.8rem' }}>{s.name}</h3>
                <div style={{ color: s.accent, fontWeight: 700, marginBottom: '2rem', fontSize: '1.1rem' }}>{s.price}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                  {s.features.split('|').map((feature, idx) => (
                    <div key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: s.accent }}>✔</span> {feature}
                    </div>
                  ))}
                </div>

                <a href="/contact" className="btn-outline" style={{ marginTop: '2.5rem', width: '100%' }}>Inquire Now</a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
