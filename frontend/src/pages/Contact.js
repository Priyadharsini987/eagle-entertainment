import React, { useState } from 'react';
import { publicApi } from '../services/api';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', phone:'', eventType:'', eventDate:'', budget:'', venue:'', message:'' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await publicApi.submitInquiry(form);
      setStatus({ type:'success', msg:"Thank you! We have received your message. Our team will contact you soon." });
      setForm({ name:'', email:'', phone:'', eventType:'', eventDate:'', budget:'', venue:'', message:'' });
    } catch {
      setStatus({ type:'error', msg:'Something went wrong. Please call us directly instead.' });
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      
      {/* Header */}
      <div style={{ background:'var(--bg-surface)', borderBottom:'1px solid var(--border)', padding:'7rem 0 5rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1600)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.12 }} />
        <div className="container" style={{ position:'relative', zIndex: 1 }}>
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >Contact Us</motion.span>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >Let's Plan <span>Your Event</span></motion.h1>
          <motion.p 
            style={{ color:'var(--text-muted)', maxWidth:640, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.85 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Talk to our team to plan an event that people will remember forever.
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ padding:'5rem 2.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'6rem', alignItems:'start' }} className="contact-grid">
          
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="display-font" style={{ fontSize:'2.4rem', color: 'var(--text-main)', marginBottom:'1.8rem', fontWeight: 600 }}>Get the <span style={{ color:'var(--primary)', fontStyle:'italic', fontWeight: 400 }}>Best</span> Service</h2>
            <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'3.5rem', fontSize:'1.05rem' }}>
              At Eagle Entertainment, we take care of everything for you. Our team is ready to help you plan your next big event, no matter where you are.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'2.2rem', marginBottom:'3.5rem' }}>
              {[
                { icon:'📍', label:'Our Office', val:'Erode, Tamil Nadu\n(Serving All Over Tamil Nadu)' },
                { icon:'📞', label:'Direct Contact', val:'+91 97902 41089 / +91 70100 72474' },
                { icon:'✉️', label:'Email Address', val:'contact@eagleentertainment.com' },
                { icon:'⏰', label:'Business Hours', val:'Mon – Sat: 10:00 AM – 8:00 PM\nSunday: Appointment Only' },
              ].map((c, i) => (
                <div key={i} style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start' }}>
                  <div style={{ 
                    width:52, height:52, background:'rgba(223,178,89, 0.05)', border:'1px solid rgba(223,178,89, 0.25)',
                    borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.6rem', flexShrink:0, boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ color:'var(--primary)', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:'6px' }}>{c.label}</div>
                    <div style={{ color:'var(--text-main)', fontSize:'1.02rem', lineHeight:1.6, whiteSpace:'pre-line', fontWeight: 500 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="glass-card" style={{ padding:'2.2rem', border: '1px solid rgba(223,178,89, 0.12)' }}>
              <div style={{ color:'var(--text-muted)', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'1.5rem' }}>Social Connectivity</div>
              <div style={{ display:'flex', gap:'1rem', flexWrap: 'wrap' }}>
                {['Facebook','Instagram','LinkedIn'].map((s, i) => (
                  <button key={i} className="btn-outline" style={{ padding:'0.75rem 1.6rem', fontSize:'0.75rem', background:'rgba(255,255,255,0.02)', cursor:'pointer' }}>{s}</button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            className="glass-card" 
            style={{ padding:'4rem 3.5rem', border: '1px solid rgba(223,178,89, 0.15)', boxShadow: 'var(--shadow-glow)' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="display-font" style={{ fontSize:'2.2rem', color: 'var(--text-main)', marginBottom:'0.6rem', fontWeight: 600 }}>Send us a Message</h3>
            <p style={{ color:'var(--text-muted)', fontSize:'0.98rem', marginBottom:'3.5rem' }}>Fill out the form below and we will get back to you soon.</p>

            {status && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding:'1.4rem', borderRadius:'var(--radius-sm)', marginBottom:'2.5rem',
                  background: status.type==='success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border:`1px solid ${status.type==='success' ? '#10b981' : '#ef4444'}`,
                  color: status.type==='success' ? '#10b981' : '#ef4444',
                  fontSize:'0.98rem', fontWeight: 500
                }}
              >{status.msg}</motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'grid', gap:'1.8rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }} className="form-row-double">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Your Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
              </div>
              
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }} className="form-row-double">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 90000 00000" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Event Type</label>
                  <select name="eventType" value={form.eventType} onChange={handleChange} style={{ colorScheme: 'dark' }}>
                    <option value="">Select Category</option>
                    {['Wedding', 'Corporate Summit', 'Concert Production', 'Cultural Festival', 'Private Event', 'Brand Launch', 'Other'].map(t => (
                      <option key={t} value={t} style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }} className="form-row-double">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Event Date</label>
                  <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} style={{ colorScheme:'dark' }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Your Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange} style={{ colorScheme: 'dark' }}>
                    <option value="">Select Range</option>
                    {['Under ₹1 Lakh', '₹1 Lakh – ₹5 Lakhs', '₹5 Lakhs – ₹20 Lakhs', 'Over ₹20 Lakhs', 'Not decided yet'].map(b => (
                      <option key={b} value={b} style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>More Details</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us about your event, what you need, and any other details..." />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading} 
                style={{
                  marginTop:'1.5rem', width:'100%', padding: '1.2rem',
                  opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @media(max-width:900px){
          .contact-grid{grid-template-columns:1fr!important; gap:4rem!important;}
        }
        @media(max-width:600px){
          .form-row-double{grid-template-columns:1fr!important; gap:1.8rem!important;}
        }
      `}</style>
    </div>
  );
};

export default Contact;
