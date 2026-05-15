import React from 'react';
import { Link } from 'react-router-dom';

const categoryColors = {
  WEDDING: '#c9a84c',
  CORPORATE: '#d4b96a',
  CONCERT: '#e2c97a',
  CULTURAL: '#c9a84c',
  LAUNCH: '#d4b96a',
  PRIVATE: '#e2c97a',
  FASHION: '#c9a84c',
};

const EventCard = ({ event, compact = false }) => {
  const catColor = categoryColors[event.category] || 'var(--primary)';
  const date = event.eventDate ? new Date(event.eventDate) : null;
  const formattedDate = date ? date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  return (
    <div className="glass-card" style={{ 
      position: 'relative', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Image Container */}
      <div style={{ position: 'relative', height: compact ? 200 : 240, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--bg-main) 0%, transparent 60%)',
        }} />
        
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(2, 6, 23, 0.6)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${catColor}`,
          color: '#fff', padding: '4px 12px', borderRadius: 100,
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{event.category}</div>

        {/* Status */}
        {event.upcoming !== undefined && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            background: event.upcoming ? 'rgba(201, 168, 76, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${event.upcoming ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
            color: event.upcoming ? 'var(--primary)' : '#fff',
            padding: '4px 12px', borderRadius: '2px',
            fontSize: '0.65rem', fontWeight: 800, textTransform:'uppercase', letterSpacing:'0.1em'
          }}>{event.upcoming ? 'Upcoming' : 'Finished'}</div>
        )}
      </div>

      {/* Content Area */}
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom:'0.75rem' }}>
          <span>📅</span> {formattedDate}
          {event.eventTime && <span style={{ color: 'var(--text-muted)' }}>· {event.eventTime}</span>}
        </div>
        
        <h3 className="display-font" style={{
          fontSize: '1.4rem',
          fontWeight: 600, color: '#fff', lineHeight: 1.3,
          marginBottom: '1rem'
        }}>{event.title}</h3>

        {event.venue && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom:'1.5rem' }}>
            <span>📍</span> {event.venue}
          </div>
        )}

        <div style={{ marginTop: 'auto', display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1.5rem', borderTop:'1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'2px' }}>Ticket Price</div>
            <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
              {event.price > 0 ? `₹${Number(event.price).toLocaleString('en-IN')}` : 'Free Entry'}
            </div>
          </div>
          
          <Link to={`/events/${event.id}`} style={{
            width:40, height:40, borderRadius:'50%', background:'var(--glass)', border:'1px solid var(--glass-border)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', textDecoration:'none', transition:'var(--transition)'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.background='var(--primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.background='var(--glass)'; }}
          >→</Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
