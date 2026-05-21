import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';

const categoryColors = {
  WEDDING: '#d4af37',   // Champagne Gold
  CORPORATE: '#f3e5ab', // Soft Vanilla
  CONCERT: '#aa7c11',   // Bronze Gold
  CULTURAL: '#d4af37',
  LAUNCH: '#f3e5ab',
  PRIVATE: '#aa7c11',
  FASHION: '#d4af37',
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
      borderRadius: 'var(--radius-md)',
      transition: 'var(--transition)'
    }}>
      
      {/* Image Container */}
      <div style={{ position: 'relative', height: compact ? 190 : 230, overflow: 'hidden' }}>
        <img 
          src={getImageUrl(event.imageUrl) || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500'} 
          alt={event.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'var(--transition)' 
          }} 
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, var(--bg-card) 60%, transparent 100%)',
        }} />
        
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${catColor}`,
          color: 'var(--text-main)', 
          padding: '5px 14px', 
          borderRadius: '100px',
          fontSize: '0.62rem', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          textTransform: 'uppercase',
        }}>{event.category}</div>

        {/* Status Badge */}
        {event.upcoming !== undefined && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            background: event.upcoming ? 'rgba(223,178,89, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${event.upcoming ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
            color: event.upcoming ? 'var(--primary-light)' : '#fff',
            padding: '5px 14px', 
            borderRadius: '100px',
            fontSize: '0.62rem', 
            fontWeight: 800, 
            textTransform:'uppercase', 
            letterSpacing:'0.12em'
          }}>{event.upcoming ? 'Upcoming' : 'Finished'}</div>
        )}
      </div>

      {/* Content Area */}
      <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--primary-light)', 
          fontSize: '0.8rem', 
          fontWeight: 700, 
          marginBottom:'0.75rem',
          letterSpacing: '0.02em'
        }}>
          <span>📅</span> {formattedDate}
          {event.eventTime && <span style={{ color: 'var(--text-muted)' }}>· {event.eventTime}</span>}
        </div>
        
        <h3 className="display-font" style={{
          fontSize: '1.35rem',
          fontWeight: 700, 
          color: 'var(--text-main)', 
          lineHeight: 1.35,
          marginBottom: '1rem',
          letterSpacing: '-0.01em'
        }}>{event.title}</h3>

        {event.venue && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-muted)', 
            fontSize: '0.85rem', 
            marginBottom:'1.5rem',
            lineHeight: 1.4
          }}>
            <span>📍</span> {event.venue}
          </div>
        )}

        {/* Card Footer Divider */}
        <div style={{ 
          marginTop: 'auto', 
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center', 
          paddingTop:'1.4rem', 
          borderTop:'1px solid var(--border)' 
        }}>
          <div>
            <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'3px', fontWeight: 600 }}>Admission</div>
            <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-main)' }}>
              {event.price > 0 ? `₹${Number(event.price).toLocaleString('en-IN')}` : 'Free Entry'}
            </div>
          </div>
          
          <Link to={`/events/${event.id}`} style={{
            width:42, height:42, borderRadius:'50%', 
            background:'rgba(223,178,89, 0.05)', 
            border:'1px solid rgba(223,178,89, 0.25)',
            display:'flex', alignItems:'center', justifyContent:'center', 
            color: 'var(--text-main)', textDecoration:'none', transition:'var(--transition)',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
          onMouseEnter={e => { 
            e.currentTarget.style.borderColor='var(--primary)'; 
            e.currentTarget.style.background='var(--primary)'; 
            e.currentTarget.style.color='#000';
            e.currentTarget.style.boxShadow='0 0 10px rgba(223,178,89, 0.3)';
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.borderColor='rgba(223,178,89, 0.25)'; 
            e.currentTarget.style.background='rgba(223,178,89, 0.05)'; 
            e.currentTarget.style.color='#fff';
            e.currentTarget.style.boxShadow='none';
          }}
          >→</Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
