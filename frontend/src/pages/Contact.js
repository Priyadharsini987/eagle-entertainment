import React, { useState } from 'react';
import { publicApi } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', phone:'', eventType:'', eventDate:'', budget:'', venue:'', message:'' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => Math.min(3, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

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
                { icon:<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, label:'Our Office', val:'Erode, Tamil Nadu\n(Serving All Over Tamil Nadu)', link:null },
                { icon:<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>, label:'Direct Contact', val:'+91 97902 41089', link:'tel:+919790241089' },
                { icon:<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, label:'Email Address', val:'eagleentertainment.events@gmail.com', link:'mailto:eagleentertainment.events@gmail.com' },
                { icon:<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label:'Instagram', val:'@eagle_entertainment_', link:'https://instagram.com/eagle_entertainment__' },
              ].map((c, i) => (
                <div key={i} style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start' }}>
                  <div style={{ 
                    width:52, height:52, background:'rgba(0,0,0,0.05)', border:'1px solid rgba(0,0,0,0.1)',
                    borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center',
                    color: 'var(--primary)', flexShrink:0, boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ color:'var(--primary)', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:'6px' }}>{c.label}</div>
                    {c.link ? (
                      <a href={c.link} target={c.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{ color:'var(--text-main)', fontSize:'1.02rem', lineHeight:1.6, whiteSpace:'pre-line', fontWeight: 500, textDecoration: 'none' }}>{c.val}</a>
                    ) : (
                      <div style={{ color:'var(--text-main)', fontSize:'1.02rem', lineHeight:1.6, whiteSpace:'pre-line', fontWeight: 500 }}>{c.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            className="glass-card" 
            style={{ padding:'4rem 3.5rem', border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'var(--shadow-glow)' }}
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

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ flex: 1, height: '4px', background: step >= i ? 'var(--primary)' : 'rgba(0,0,0,0.1)', borderRadius: '2px', transition: 'background 0.3s ease' }} />
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ position: 'relative', minHeight: '320px' }}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ display:'grid', gap:'1.8rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>What kind of event are you planning?</label>
                      <select name="eventType" value={form.eventType} onChange={handleChange} style={{ colorScheme: 'dark' }}>
                        <option value="">Select Category</option>
                        {['Award Show', 'Corporate Summit', 'Concert Production', 'Celebrity Event', 'Private Event', 'Brand Launch', 'Other'].map(t => (
                          <option key={t} value={t} style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>When is it happening?</label>
                      <input name="eventDate" type="text" placeholder="Select Event Date" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => { if(!e.target.value) e.target.type = 'text'; }} value={form.eventDate} onChange={handleChange} style={{ colorScheme:'dark' }} />
                    </div>
                    <button type="button" onClick={nextStep} className="btn-primary" style={{ marginTop:'1rem', width:'100%', padding: '1.2rem' }}>Next Step: Details</button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ display:'grid', gap:'1.8rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>What is your estimated budget?</label>
                      <select name="budget" value={form.budget} onChange={handleChange} style={{ colorScheme: 'dark' }}>
                        <option value="">Select Range</option>
                        {['Under ₹1 Lakh', '₹1 Lakh – ₹5 Lakhs', '₹5 Lakhs – ₹20 Lakhs', 'Over ₹20 Lakhs', 'Not decided yet'].map(b => (
                          <option key={b} value={b} style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Any specific details or requirements?</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us about your event, what you need, and any other details..." />
                    </div>
                    <div style={{ display:'flex', gap:'1rem', marginTop:'1rem' }}>
                      <button type="button" onClick={prevStep} className="btn-outline" style={{ flex: 1, padding: '1.2rem' }}>Back</button>
                      <button type="button" onClick={nextStep} className="btn-primary" style={{ flex: 2, padding: '1.2rem' }}>Next Step: Contact Info</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ display:'grid', gap:'1.8rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Your Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" />
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }} className="form-row-double">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Your Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Phone Number</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 90000 00000" />
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:'1rem', marginTop:'1rem' }}>
                      <button type="button" onClick={prevStep} className="btn-outline" style={{ flex: 1, padding: '1.2rem' }}>Back</button>
                      <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 2, padding: '1.2rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? 'Sending...' : 'Submit Inquiry'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
