// Professional Contact Page - Updated with Erode Office
import React, { useState } from 'react';
import { publicApi } from '../services/api';

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
      <div style={{ background:'var(--bg-surface)', borderBottom:'1px solid var(--border)', padding:'6rem 0 4rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1600)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.1 }} />
        <div className="container" style={{ position:'relative' }}>
          <span className="section-label">Contact Us</span>
          <h1 className="section-title">Let's Plan <span>Your Event</span></h1>
          <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.8 }}>
            Talk to our team to plan an event that people will remember forever.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'5rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'5rem', alignItems:'start' }} className="contact-grid">
          {/* Info */}
          <div>
            <h2 className="display-font" style={{ fontSize:'2.5rem', color:'#fff', marginBottom:'2rem' }}>Get the <span style={{ color:'var(--primary)', fontStyle:'italic' }}>Best</span> Service</h2>
            <p style={{ color:'var(--text-muted)', lineHeight:1.9, marginBottom:'3rem', fontSize:'1.1rem' }}>
              At Eagle Entertainment, we take care of everything for you. Our team is ready to help you plan your next big event, no matter where you are.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'2rem', marginBottom:'3rem' }}>
              {[
                { icon:'📍', label:'Our Office', val:'Erode, Tamil Nadu\n(Serving All Over Tamil Nadu)' },
                { icon:'📞', label:'Direct Contact', val:'+91 97902 41089 / +91 70100 72474' },
                { icon:'✉️', label:'Email Address', val:'contact@eagleentertainment.com' },
                { icon:'⏰', label:'Business Hours', val:'Mon – Sat: 10:00 AM – 8:00 PM\nSunday: Appointment Only' },
              ].map((c, i) => (
                <div key={i} style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start' }}>
                  <div style={{ 
                    width:50, height:50, background:'var(--glass)', border:'1px solid var(--glass-border)',
                    borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.5rem', flexShrink:0
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ color:'var(--primary-light)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'6px' }}>{c.label}</div>
                    <div style={{ color:'var(--text-main)', fontSize:'1rem', lineHeight:1.6, whiteSpace:'pre-line' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="glass-card" style={{ padding:'2rem' }}>
              <div style={{ color:'var(--text-muted)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'1.5rem' }}>Social Connectivity</div>
              <div style={{ display:'flex', gap:'1rem' }}>
                {['Facebook','Instagram','LinkedIn'].map((s, i) => (
                  <button key={i} className="btn-outline" style={{ padding:'0.6rem 1.2rem', fontSize:'0.75rem', background:'none', cursor:'pointer' }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding:'3.5rem' }}>
            <h3 className="display-font" style={{ fontSize:'2rem', color:'#fff', marginBottom:'0.5rem' }}>Send us a Message</h3>
            <p style={{ color:'var(--text-muted)', fontSize:'1rem', marginBottom:'3rem' }}>Fill out the form below and we will get back to you soon.</p>

            {status && (
              <div style={{
                padding:'1.25rem', borderRadius:'var(--radius-sm)', marginBottom:'2rem',
                background: status.type==='success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border:`1px solid ${status.type==='success' ? '#10b981' : '#ef4444'}`,
                color: status.type==='success' ? '#10b981' : '#ef4444',
                fontSize:'0.95rem', animation:'fadeInUp 0.3s ease'
              }}>{status.msg}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'grid', gap:'1.5rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
              </div>
              
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 90000 00000" />
                </div>
                <div className="form-group">
                  <label>Event Type</label>
                  <select name="eventType" value={form.eventType} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {['Wedding', 'Corporate Summit', 'Concert Production', 'Cultural Festival', 'Private Event', 'Brand Launch', 'Other'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                <div className="form-group">
                  <label>Event Date</label>
                  <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} style={{ colorScheme:'dark' }} />
                </div>
                <div className="form-group">
                  <label>Your Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select Range</option>
                    {['Under ₹1 Lakh', '₹1 Lakh – ₹5 Lakhs', '₹5 Lakhs – ₹20 Lakhs', 'Over ₹20 Lakhs', 'Not decided yet'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>More Details</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us about your event, what you need, and any other details..." />
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{
                marginTop:'1rem', width:'100%',
                opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
              }}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important; gap:3rem!important;}}
      `}</style>
    </div>
  );
};

export default Contact;
