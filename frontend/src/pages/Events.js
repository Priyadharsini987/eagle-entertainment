import React, { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
import EventCard from '../components/EventCard';

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
        padding:'6rem 0 4rem',
        textAlign:'center',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.1 }} />
        <div className="container" style={{ position:'relative' }}>
          <span className="section-label">Our Events</span>
          <h1 className="section-title">See Our <span>Work</span></h1>
          <p style={{ color:'var(--text-muted)', maxWidth:600, margin:'0 auto', fontSize:'1.1rem', lineHeight:1.8 }}>
            Check out our upcoming shows and look back at the amazing events we have finished.
          </p>
          
          {/* Search Bar */}
          <div style={{ maxWidth:500, margin:'3rem auto 0', position:'relative' }}>
            <input 
              type="text" 
              placeholder="Search by event name or venue..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width:'100%', padding:'1.2rem 1.5rem 1.2rem 3.5rem',
                background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                borderRadius:'4px', color:'#fff', fontSize:'0.9rem', outline:'none'
              }}
            />
            <span style={{ position:'absolute', left:'1.2rem', top:'50%', transform:'translateY(-50%)', opacity:0.5 }}>🔍</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'4rem 2rem' }}>
        {/* Tabs */}
        <div style={{ display:'flex', gap:'3rem', marginBottom:'3rem', borderBottom:'1px solid var(--border)', justifyContent:'center' }}>
          {[
            { key:'upcoming', label:'Upcoming Events' },
            { key:'recent', label:'Past Events' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              background:'none', border:'none', cursor:'pointer',
              padding:'1rem 0.5rem',
              fontWeight:600,
              fontSize:'1rem',
              color: tab === t.key ? 'var(--primary-light)' : 'var(--text-muted)',
              borderBottom: tab === t.key ? '2px solid var(--primary)' : '2px solid transparent',
              transition:'var(--transition)', marginBottom:'-1px',
            }}>{t.label} <span style={{ opacity:0.5, fontSize:'0.8rem', marginLeft:'0.5rem' }}>{events[t.key]?.length || 0}</span></button>
          ))}
        </div>

        {/* Category filters */}
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'4rem', justifyContent:'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding:'0.6rem 1.5rem',
              background: filter === cat ? 'var(--primary)' : 'var(--glass)',
              border: `1px solid ${filter === cat ? 'var(--primary)' : 'var(--glass-border)'}`,
              color: '#fff',
              borderRadius:100, cursor:'pointer', fontSize:'0.75rem',
              fontWeight:600, letterSpacing:'0.05em', textTransform:'uppercase',
              transition:'var(--transition)',
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'8rem 0', color:'var(--text-muted)' }}>
            <div style={{ width:40, height:40, border:'3px solid var(--glass)', borderTopColor:'var(--primary)', borderRadius:'50%', margin:'0 auto 1.5rem', animation:'pulse 1.5s infinite linear' }} />
            Loading events...
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card" style={{ textAlign:'center', padding:'8rem 2rem', color:'var(--text-muted)' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1.5rem', opacity:0.2 }}>🎭</div>
            <h3 style={{ color:'#fff', marginBottom:'0.5rem' }}>No events here yet</h3>
            <p>We are planning new events for this category. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'2.5rem', animation: 'fadeInUp 0.6s ease' }}>
            {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
