import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import { motion } from 'framer-motion';

const categoryColors = {
  WEDDING: '#ec4899',   // Pink
  CORPORATE: '#6366f1', // Indigo
  CONCERT: '#06b6d4',   // Cyan
  CULTURAL: '#8b5cf6',  // Violet
  LAUNCH: '#f43f5e',    // Rose
  PRIVATE: '#14b8a6',   // Teal
  FASHION: '#d946ef',   // Fuchsia
};

const EventCard = ({ event, compact = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const catColor = categoryColors[event.category] || 'var(--primary)';
  const date = event.eventDate ? new Date(event.eventDate) : null;
  const formattedDate = date ? date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  return (
    <motion.div 
      className="glass-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, borderColor: 'rgba(99, 102, 241, 0.4)', boxShadow: '0 20px 40px 0 rgba(0,0,0, 0.5), inset 0 0 0 1px rgba(99, 102, 241, 0.15)' }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ 
        position: 'relative', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 'var(--radius-md)',
      }}>
      
      {/* Image Container */}
      <div style={{ position: 'relative', height: compact ? 190 : 230, overflow: 'hidden' }}>
        <motion.img 
          src={getImageUrl(event.imageUrl) || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500'} 
          alt={event.title} 
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
          }} 
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.4) 60%, transparent 100%)',
        }} />
        
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${catColor}`,
          color: catColor, 
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
            background: event.upcoming ? 'var(--primary)' : 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${event.upcoming ? 'var(--primary-dark)' : 'rgba(255,255,255,0.1)'}`,
            color: event.upcoming ? '#fff' : 'var(--text-muted)',
            padding: '5px 14px', 
            borderRadius: '100px',
            fontSize: '0.62rem', 
            fontWeight: 800, 
            textTransform:'uppercase', 
            letterSpacing:'0.12em',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>{event.upcoming ? 'Upcoming' : 'Finished'}</div>
        )}
      </div>

      {/* Content Area */}
      <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--primary)', 
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
            <div style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-main)' }}>
              {event.price > 0 ? `₹${Number(event.price).toLocaleString('en-IN')}` : 'Free Entry'}
            </div>
          </div>
          
          <Link to={`/events/${event.id}`} style={{
            width:42, height:42, borderRadius:'50%', 
            background:'rgba(99, 102, 241, 0.1)', 
            border:'1px solid rgba(99, 102, 241, 0.25)',
            display:'flex', alignItems:'center', justifyContent:'center', 
            color: 'var(--primary-light)', textDecoration:'none', transition:'var(--transition)',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
          onMouseEnter={e => { 
            e.currentTarget.style.borderColor='var(--primary)'; 
            e.currentTarget.style.background='var(--primary)'; 
            e.currentTarget.style.color='#fff';
            e.currentTarget.style.boxShadow='0 4px 15px rgba(99, 102, 241, 0.4)';
            e.currentTarget.style.transform='scale(1.1)';
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.borderColor='rgba(99, 102, 241, 0.25)'; 
            e.currentTarget.style.background='rgba(99, 102, 241, 0.1)'; 
            e.currentTarget.style.color='var(--primary-light)';
            e.currentTarget.style.boxShadow='none';
            e.currentTarget.style.transform='scale(1)';
          }}
          >→</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
