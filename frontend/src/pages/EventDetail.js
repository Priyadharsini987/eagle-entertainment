import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicApi, getImageUrl } from '../services/api';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [formStatus, setFormStatus] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleBookNow = () => setShowModal(true);
  const handleCloseModal = () => { setShowModal(false); setFormStatus(null); };
  
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus(null);
    try {
      await publicApi.submitInquiry({
        ...form,
        eventType: event.category || 'Event Booking',
        message: `[Booking Request for Event: ${event.title}]\n\n${form.message}`
      });
      setFormStatus({ type:'success', msg: 'Booking request sent successfully! We will contact you soon.' });
      setForm({ name:'', email:'', phone:'', message:'' });
    } catch {
      setFormStatus({ type:'error', msg: 'Failed to send request. Please try again.' });
    }
    setFormLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [detail, all] = await Promise.all([
          publicApi.getEventById(id),
          publicApi.getUpcomingEvents(), // For simplicity, just related upcoming
        ]);
        setEvent(detail.data);
        setRelated(all.data.filter(e => e.id !== parseInt(id) && e.category === detail.data.category).slice(0, 3));
      } catch (e) {}
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-main)' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid rgba(255,255,255, 0.1)', borderTopColor:'var(--primary)', borderRadius:'50%', margin:'0 auto 1.5rem', animation:'pulse-glow 1.5s infinite linear' }} />
        <div style={{ color:'var(--text-muted)', fontSize:'0.9rem', letterSpacing:'0.1em' }}>Loading event details...</div>
      </div>
    </div>
  );

  if (!event) return (
    <div style={{ paddingTop:'10rem', textAlign:'center', color:'var(--text-muted)', minHeight:'100vh' }}>
      <div style={{ fontSize:'4rem', marginBottom:'1.5rem' }}>🎭</div>
      <h3 style={{ color: 'var(--text-main)', fontSize: '1.8rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Event not found</h3>
      <p style={{ marginBottom: '2.5rem' }}>The event you are looking for may have been removed or does not exist.</p>
      <Link to="/events" className="btn-primary">← Back to Events</Link>
    </div>
  );

  const date = event.eventDate ? new Date(event.eventDate) : null;

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      
      {/* Hero Image Section */}
      <div style={{ position:'relative', height:520, overflow:'hidden' }}>
        <motion.img 
          src={getImageUrl(event.imageUrl) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600'}
          alt={event.title} 
          style={{ width:'100%', height:'100%', objectFit:'cover' }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onError={e => e.target.style.display='none'} 
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,5,5,1) 0%, var(--bg-card) 60%, transparent)' }} />
        
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'4rem 0' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/events" style={{ color:'var(--primary-light)', textDecoration:'none', fontSize:'0.75rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:'1.8rem', display:'inline-block', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--primary-light)'}>← Back to Events</Link>
              
              <div style={{ display:'flex', gap:'0.85rem', marginBottom:'1.8rem', flexWrap:'wrap' }}>
                <span style={{ padding:'5px 15px', background:'rgba(99, 102, 241, 0.15)', border:'1px solid var(--primary)', color:'var(--primary-light)', borderRadius:'100px', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em' }}>{event.category}</span>
                <span style={{ padding:'5px 15px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.15)', color: 'var(--text-main)', borderRadius:'100px', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em' }}>{event.upcoming ? 'Upcoming' : 'Finished'}</span>
              </div>
              
              <h1 className="display-font" style={{ fontSize:'clamp(2.5rem, 5.8vw, 4.4rem)', color: 'var(--text-main)', fontWeight:700, lineHeight:1.15, letterSpacing: '-0.02em' }}>{event.title}</h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="container" style={{ padding:'4rem 0 6rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:'4.5rem', alignItems:'start' }} className="event-detail-grid">
          
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="display-font" style={{ fontSize:'2.2rem', color: 'var(--text-main)', marginBottom:'1rem', fontWeight: 600 }}>Event Details</h2>
            <div style={{ width:60, height:2, background:'var(--primary)', marginBottom:'2.5rem', boxShadow: '0 0 8px var(--primary)' }} />
            <p style={{ color:'var(--text-muted)', lineHeight:1.9, fontSize:'1.05rem', whiteSpace: 'pre-wrap' }}>
              {event.description || 'No description available for this event.'}
            </p>
          </motion.div>

          {/* Sidebar Info Card */}
          <motion.div 
            className="glass-card"
            style={{ 
              background:'var(--bg-card)', 
              border:'1px solid var(--border)', 
              borderRadius:'var(--radius-md)', 
              padding:'3rem 2.5rem', 
              position:'sticky', 
              top:'7rem',
              boxShadow: 'var(--shadow-glow)'
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="display-font" style={{ fontSize:'1.7rem', color: 'var(--text-main)', marginBottom:'2.2rem', fontWeight: 600 }}>Information</h3>
            
            <div style={{ display:'flex', flexDirection:'column', gap:'1.8rem' }}>
              {[
                { icon:'📅', label:'Date', val: date ? date.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : 'TBA' },
                { icon:'🕐', label:'Time', val: event.eventTime || 'TBA' },
                { icon:'📍', label:'Venue', val: event.venue || 'TBA' },
                ...(event.price ? [{ icon:'💰', label:'Admission', val: !isNaN(Number(event.price)) && Number(event.price) > 0 ? `₹${Number(event.price).toLocaleString('en-IN')}` : event.price }] : []),
              ].map((d, i) => (
                <div key={i} style={{ display:'flex', gap:'1.1rem', paddingBottom:'1.4rem', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:'1.3rem', opacity:0.9 }}>{d.icon}</span>
                  <div>
                    <div style={{ color:'var(--primary)', fontSize:'0.65rem', fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase' }}>{d.label}</div>
                    <div style={{ color:'var(--text-main)', fontSize:'0.95rem', marginTop:'4px', fontWeight:600 }}>{d.val}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop:'3rem', display:'flex', flexDirection:'column', gap:'1.2rem' }}>
              <button onClick={handleBookNow} className="btn-primary" style={{ width:'100%', fontSize:'0.82rem', padding: '1rem', border: 'none', cursor: 'pointer' }}>
                Book Now
              </button>
              <a href="tel:+919790241089" className="btn-outline" style={{ width:'100%', fontSize:'0.82rem', padding: '1rem' }}>
                Call Operations
              </a>
            </div>

            {/* Social Share */}
            <div style={{ marginTop:'2.5rem', paddingTop:'2rem', borderTop:'1px solid var(--border)', textAlign:'center' }}>
              <div style={{ color:'var(--text-muted)', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'1.2rem' }}>Share Event</div>
              <div style={{ display:'flex', justifyContent:'center', gap:'0.85rem' }}>
                {['Share', 'Tweet', 'Link'].map((s, i) => (
                  <button key={i} style={{ 
                    background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255, 0.15)', color: 'var(--text-main)', padding:'0.5rem 1rem', borderRadius:'100px',
                    fontSize:'0.72rem', fontWeight: 600, cursor:'pointer', transition:'var(--transition)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.background='rgba(99, 102, 241, 0.08)'; e.currentTarget.style.color='var(--primary-light)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255, 0.15)'; e.currentTarget.style.background='rgba(255,255,255,0.02)'; e.currentTarget.style.color='#fff'; }}
                  >{s}</button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div style={{ marginTop:'8rem', paddingTop:'6rem', borderTop:'1px solid var(--border)' }}>
            <span className="section-label">Suggestions</span>
            <h2 className="display-font" style={{ fontSize:'2.4rem', color: 'var(--text-main)', marginBottom:'3.5rem', fontWeight: 700 }}>Related <span>Events</span></h2>
            
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'2.5rem' }}>
              {related.map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <EventCard event={r} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card"
            style={{ width: '100%', maxWidth: 500, padding: '3rem', position: 'relative' }}
          >
            <button onClick={handleCloseModal} style={{
              position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none',
              color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer'
            }}>×</button>
            <h3 className="display-font" style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Confirm Booking</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Request booking for <strong>{event.title}</strong>.</p>
            
            {formStatus && (
              <div style={{
                padding:'1rem', borderRadius:'6px', marginBottom:'1.5rem',
                background: formStatus.type==='success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: formStatus.type==='success' ? '#10b981' : '#ef4444',
                fontSize:'0.9rem', border: `1px solid ${formStatus.type==='success' ? '#10b981' : '#ef4444'}`
              }}>{formStatus.msg}</div>
            )}
            
            <form onSubmit={handleBookingSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Name</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ background: 'var(--bg-main)' }} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ background: 'var(--bg-main)' }} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Phone</label>
                <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ background: 'var(--bg-main)' }} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Message</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Any specific requirements?" style={{ background: 'var(--bg-main)' }} />
              </div>
              <button type="submit" className="btn-primary" disabled={formLoading} style={{ marginTop: '1rem', width: '100%', padding: '1rem', border: 'none', cursor: formLoading ? 'not-allowed' : 'pointer', opacity: formLoading ? 0.7 : 1 }}>
                {formLoading ? 'Sending...' : 'Confirm Request'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .event-detail-grid { grid-template-columns:1fr!important; gap:4rem!important; }
        }
      `}</style>
    </div>
  );
};

export default EventDetail;
