import React, { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['ALL', 'WEDDING', 'CORPORATE', 'CONCERT', 'CULTURAL', 'LAUNCH', 'PRIVATE', 'FASHION'];

const Events = () => {
  const [events, setEvents] = useState({ upcoming: [], recent: [] });
  const [filter, setFilter] = useState('ALL');
  const [tab, setTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const [upcoming, recent] = await Promise.all([
          publicApi.getUpcomingEvents(),
          publicApi.getRecentEvents(),
        ]);
        setEvents({
          upcoming: upcoming.data,
          recent: recent.data,
        });
      } catch (e) {}
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const currentEvents = events[tab] || [];
  const filtered = currentEvents.filter(e => {
    const matchesFilter = filter === 'ALL' || e.category === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.venue?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ paddingTop:'6rem', minHeight:'100vh' }}>
      
      {/* Hero Banner */}
      <div style={{
        background:'var(--bg-surface)',
        borderBottom:'1px solid var(--border)',
        padding:'7rem 0 5rem',
        textAlign:'center',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.1 }} />
        <div className="container" style={{ position:'relative', zIndex: 1 }}>
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >Our Events</motion.span>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >See Our <span>Work</span></motion.h1>
          <motion.p 
            style={{ color:'var(--text-muted)', maxWidth:620, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.85 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Check out our upcoming shows and look back at the amazing events we have finished.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            style={{ maxWidth:540, margin:'3.5rem auto 0', position:'relative' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <input 
              type="text" 
              placeholder="Search by event name or venue..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width:'100%', padding:'1.3rem 1.6rem 1.3rem 3.6rem',
                background:'var(--bg-card)', 
                border:'1px solid rgba(223,178,89, 0.2)',
                borderRadius:'100px', color: 'var(--text-main)', fontSize:'0.92rem', outline:'none',
                transition: 'var(--transition)'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(223,178,89, 0.2)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(223,178,89, 0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <span style={{ position:'absolute', left:'1.5rem', top:'50%', transform:'translateY(-50%)', fontSize: '1.1rem', opacity: 0.75 }}>🔍</span>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ padding:'4rem 2.5rem' }}>
        
        {/* Tabs with Sliding Underline */}
        <div style={{ display:'flex', gap:'3.5rem', marginBottom:'3.5rem', borderBottom:'1px solid var(--border)', justifyContent:'center', position: 'relative' }}>
          {[
            { key:'upcoming', label:'Upcoming Events' },
            { key:'recent', label:'Past Events' },
          ].map(t => (
            <button 
              key={t.key} 
              onClick={() => setTab(t.key)} 
              style={{
                background:'none', border:'none', cursor:'pointer',
                padding:'1.2rem 0.5rem',
                fontWeight:700,
                fontSize:'1.05rem',
                fontFamily: 'var(--font-main)',
                letterSpacing: '0.02em',
                color: tab === t.key ? 'var(--primary-light)' : 'var(--text-muted)',
                position: 'relative',
                transition: 'color 0.3s ease',
                marginBottom:'-1px',
              }}
            >
              {t.label} 
              <span style={{ opacity:0.5, fontSize:'0.82rem', marginLeft:'0.6rem', fontWeight: 500 }}>
                ({events[t.key]?.length || 0})
              </span>
              
              {tab === t.key && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--primary)',
                    boxShadow: '0 0 10px var(--primary)'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap', marginBottom:'4.5rem', justifyContent:'center' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              style={{
                padding:'0.7rem 1.8rem',
                background: filter === cat ? 'var(--primary)' : 'rgba(223,178,89, 0.04)',
                border: `1px solid ${filter === cat ? 'var(--primary)' : 'rgba(223,178,89, 0.15)'}`,
                color: filter === cat ? '#000' : '#fff',
                borderRadius: '100px', 
                cursor:'pointer', 
                fontSize:'0.75rem',
                fontWeight:700, 
                letterSpacing:'0.12em', 
                textTransform:'uppercase',
                transition:'var(--transition)',
              }}
              onMouseEnter={e => {
                if (filter !== cat) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary-light)';
                }
              }}
              onMouseLeave={e => {
                if (filter !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(223,178,89, 0.15)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Grid Area with animations */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'8rem 0', color:'var(--text-muted)' }}>
            <div style={{ width:40, height:40, border:'3px solid rgba(223,178,89, 0.1)', borderTopColor:'var(--primary)', borderRadius:'50%', margin:'0 auto 1.8rem', animation:'pulse-glow 1.5s infinite linear' }} />
            Loading events...
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            className="glass-card" 
            style={{ textAlign:'center', padding:'8rem 2rem', color:'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div style={{ fontSize:'4.5rem', marginBottom:'1.5rem', opacity:0.3 }}>🎭</div>
            <h3 style={{ color: 'var(--text-main)', marginBottom:'0.6rem', fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>No events here yet</h3>
            <p>We are planning new events for this category. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'2.8rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((ev, idx) => (
                <motion.div
                  layout
                  key={ev.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <EventCard event={ev} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
