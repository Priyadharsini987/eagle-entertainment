import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div style={{ paddingTop:'8rem', textAlign:'center', color:'#555', minHeight:'100vh' }}>Loading event details...</div>;
  if (!event) return (
    <div style={{ paddingTop:'8rem', textAlign:'center', color:'#555', minHeight:'100vh' }}>
      <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎭</div>
      <p>Event not found.</p>
      <Link to="/events" className="btn-primary" style={{ marginTop:'1.5rem', display:'inline-flex' }}>← Back to Events</Link>
    </div>
  );

  const date = event.eventDate ? new Date(event.eventDate) : null;

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      {/* Hero Image */}
      <div style={{ position:'relative', height:480, overflow:'hidden' }}>
        <img src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600'}
          alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}
          onError={e => e.target.style.display='none'} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, transparent)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'3rem 2rem' }}>
          <div className="container">
            <Link to="/events" style={{ color:'var(--primary)', textDecoration:'none', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'1.5rem', display:'inline-block' }}>← Back to Events</Link>
            <div style={{ display:'flex', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
              <span style={{ padding:'4px 12px', background:'rgba(201,168,76,0.2)', border:'1px solid var(--primary)', color:'var(--primary)', borderRadius:'2px', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em' }}>{event.category}</span>
              <span style={{ padding:'4px 12px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', borderRadius:'2px', fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em' }}>{event.upcoming ? 'Upcoming' : 'Finished'}</span>
            </div>
            <h1 className="display-font" style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', color:'#fff', fontWeight:600, lineHeight:1.1 }}>{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding:'3rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'3rem', alignItems:'start' }} className="event-detail-grid">
          {/* Main */}
          <div>
            <h2 className="display-font" style={{ fontSize:'2rem', color:'#fff', marginBottom:'1.5rem' }}>Event Details</h2>
            <div style={{ width:60, height:2, background:'var(--primary)', marginBottom:'2rem' }} />
            <p style={{ color:'var(--text-muted)', lineHeight:1.9, fontSize:'1rem' }}>
              {event.description || 'No description available for this event.'}
            </p>
          </div>

          {/* Sidebar Card */}
          <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border)', borderRadius:'4px', padding:'2.5rem', position:'sticky', top:'7rem' }}>
            <h3 className="display-font" style={{ fontSize:'1.6rem', color:'#fff', marginBottom:'2rem' }}>Information</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {[
                { icon:'📅', label:'Date', val: date ? date.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : 'TBA' },
                { icon:'🕐', label:'Time', val: event.eventTime || 'TBA' },
                { icon:'📍', label:'Venue', val: event.venue || 'TBA' },
                { icon:'💰', label:'Ticket Price', val: event.price > 0 ? `₹${Number(event.price).toLocaleString('en-IN')}` : 'Free Entry' },
              ].map((d, i) => (
                <div key={i} style={{ display:'flex', gap:'1rem', paddingBottom:'1rem', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:'1.1rem', opacity:0.7 }}>{d.icon}</span>
                  <div>
                    <div style={{ color:'var(--primary)', fontSize:'0.6rem', fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase' }}>{d.label}</div>
                    <div style={{ color:'var(--text-main)', fontSize:'0.9rem', marginTop:'4px', fontWeight:500 }}>{d.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:'2.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
              <Link to="/contact" className="btn-primary" style={{ width:'100%', fontSize:'0.8rem' }}>
                Book Now
              </Link>
              <a href="tel:+919000011111" className="btn-outline" style={{ width:'100%', fontSize:'0.8rem' }}>
                Call Us
              </a>
            </div>

            {/* Social Share */}
            <div style={{ marginTop:'2rem', paddingTop:'2rem', borderTop:'1px solid var(--border)', textAlign:'center' }}>
              <div style={{ color:'var(--text-muted)', fontSize:'0.6rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'1rem' }}>Share Event</div>
              <div style={{ display:'flex', justifyContent:'center', gap:'1rem' }}>
                {['Share','Tweet','Link'].map((s, i) => (
                  <button key={i} style={{ 
                    background:'none', border:'1px solid var(--border)', color:'#fff', padding:'0.4rem 0.8rem', borderRadius:'2px',
                    fontSize:'0.7rem', cursor:'pointer', transition:'var(--transition)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                  >{s}</button>
                ))}
            </div>
          </div>
        </div>
      </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div style={{ marginTop:'6rem', paddingTop:'6rem', borderTop:'1px solid var(--border)' }}>
            <span className="section-label">Suggestions</span>
            <h2 className="display-font" style={{ fontSize:'2rem', color:'#fff', marginBottom:'3rem' }}>Related <span>Events</span></h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'2rem' }}>
              {related.map(r => (
                <EventCard key={r.id} event={r} />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`@media(max-width:900px){.event-detail-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};

export default EventDetail;
