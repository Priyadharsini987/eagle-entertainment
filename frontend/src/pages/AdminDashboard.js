import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../services/api';

// ---- Sidebar ----
const Sidebar = ({ active, setActive, onLogout }) => {
  const items = [
    { key: 'dashboard', icon: '📊', label: 'Dashboard' },
    { key: 'events', icon: '🎭', label: 'Events' },
    { key: 'gallery', icon: '🖼️', label: 'Gallery' },
    { key: 'testimonials', icon: '💬', label: 'Testimonials' },
    { key: 'inquiries', icon: '📩', label: 'Inquiries' },
  ];

  return (
    <div style={{
      width: 240, background: '#0d0d0d', borderRight: '1px solid rgba(201,168,76,0.12)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh', flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,0.02)' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{ 
              width: 50, height: 50, 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '2px solid var(--primary)',
              background: 'url(/logo.png) center center no-repeat',
              backgroundSize: 'cover',
              boxShadow: 'var(--shadow-glow)'
            }} />
            <div>
              <div className="display-font" style={{ fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '0.1em', fontWeight: 700, lineHeight: 1 }}>EAGLE</div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Executive Control</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1.5rem 0' }}>
        {items.map(item => (
          <button key={item.key} onClick={() => setActive(item.key)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem 1.5rem', background: active === item.key ? 'var(--glass)' : 'transparent',
            border: 'none', borderLeft: `3px solid ${active === item.key ? 'var(--primary)' : 'transparent'}`,
            color: active === item.key ? 'var(--primary-light)' : 'var(--text-muted)', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 500,
            transition: 'var(--transition)', textAlign: 'left',
          }}
          onMouseEnter={e => { if (active !== item.key) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}}
          onMouseLeave={e => { if (active !== item.key) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}}
          >
            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#555', textDecoration: 'none', fontSize: '0.78rem', marginBottom: '0.75rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ccc'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}
        >🌐 View Website</Link>
        <button onClick={onLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
          background: 'none', border: 'none', color: '#555', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', padding: 0, transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
        onMouseLeave={e => e.currentTarget.style.color = '#555'}
        >🚪 Sign Out</button>
      </div>
    </div>
  );
};

// ---- Stat Card ----
const StatCard = ({ icon, label, value, color = 'var(--primary)', sub }) => (
  <div className="glass-card" style={{
    padding: '2.5rem 2rem',
    border: '1px solid var(--border)',
    background: 'rgba(255,255,255,0.01)',
  }}
  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(201,168,76,0.03)'; }}
  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <span style={{ fontSize: '1.5rem', filter: 'grayscale(1) opacity(0.5)' }}>{icon}</span>
      {sub && <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sub}</span>}
    </div>
    <div className="display-font" style={{ fontSize: '2.8rem', color: '#fff', lineHeight: 1, marginBottom: '0.75rem' }}>{value}</div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</div>
  </div>
);

// ---- Dashboard Tab ----
const DashboardTab = ({ stats }) => (
  <div>
    <div style={{ marginBottom: '3rem' }}>
      <h2 className="display-font" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '0.5rem' }}>Executive Overview</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>System health and operational metrics for Eagle Entertainment.</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem', marginBottom: '4rem' }}>
      <StatCard icon="🎭" label="Total Events" value={stats?.totalEvents ?? '—'} />
      <StatCard icon="📅" label="Upcoming" value={stats?.upcomingEvents ?? '—'} color="var(--primary-light)" sub="Active" />
      <StatCard icon="📩" label="New Inquiries" value={stats?.newInquiries ?? '—'} color="#ef4444" sub="Pending" />
      <StatCard icon="📬" label="Total Inquiries" value={stats?.totalInquiries ?? '—'} color="#8b5cf6" />
      <StatCard icon="🖼️" label="Gallery Items" value={stats?.galleryCount ?? '—'} color="#10b981" />
      <StatCard icon="💬" label="Testimonials" value={stats?.testimonialCount ?? '—'} color="#f59e0b" />
    </div>

    {/* Quick tips */}
    <div className="glass-card" style={{ padding: '2.5rem' }}>
      <h3 className="display-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>Rapid Commands</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: '+ Deploy New Event', action: 'events' },
          { label: '+ Update Gallery', action: 'gallery' },
          { label: '+ Add Testimonial', action: 'testimonials' },
          { label: '📩 Manage Inquiries', action: 'inquiries' },
        ].map((btn, i) => (
          <button key={i} className="btn-outline" style={{ padding: '0.8rem 1.8rem', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#fff'; }}
          >{btn.label}</button>
        ))}
      </div>
    </div>
  </div>
);

// ---- Events Tab ----
const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const emptyForm = { title:'', description:'', category:'WEDDING', eventDate:'', eventTime:'', venue:'', city:'', capacity:'', price:'', imageUrl:'', status:'UPCOMING', isUpcoming: true };
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    adminApi.getEvents().then(r => setEvents(r.data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleEdit = (ev) => {
    setEditEvent(ev);
    setForm({ ...ev, eventDate: ev.eventDate || '', isUpcoming: ev.upcoming ?? ev.isUpcoming ?? true });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await adminApi.deleteEvent(id).catch(() => {});
    load();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editEvent) {
        await adminApi.updateEvent(editEvent.id, form);
      } else {
        await adminApi.createEvent(form);
      }
      setShowForm(false);
      setEditEvent(null);
      setForm(emptyForm);
      load();
    } catch {}
    setSaving(false);
  };

  const categories = ['WEDDING','CORPORATE','CONCERT','CULTURAL','LAUNCH','PRIVATE','FASHION'];

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.8rem', color:'#fff' }}>Manage Events</h2>
          <p style={{ color:'#555', fontSize:'0.8rem' }}>{events.length} events total</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditEvent(null); setForm(emptyForm); }} style={{ padding:'0.65rem 1.4rem', fontSize:'0.78rem' }}>+ Add Event</button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={{ background:'#141414', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'8px', padding:'2rem', width:'100%', maxWidth:640, maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.5rem', color:'#fff' }}>{editEvent ? 'Edit Event' : 'Add New Event'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background:'none', border:'none', color:'#888', fontSize:'1.4rem', cursor:'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display:'grid', gap:'1rem' }}>
              <div className="form-group">
                <label>Event Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({...f, title:e.target.value}))} required placeholder="Grand Wedding Ceremony" />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({...f, category:e.target.value}))}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status:e.target.value, isUpcoming: e.target.value === 'UPCOMING'}))}>
                    {['UPCOMING','ONGOING','COMPLETED','CANCELLED'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div className="form-group">
                  <label>Event Date</label>
                  <input type="date" value={form.eventDate} onChange={e => setForm(f => ({...f, eventDate:e.target.value}))} style={{ colorScheme:'dark' }} />
                </div>
                <div className="form-group">
                  <label>Event Time</label>
                  <input type="time" value={form.eventTime} onChange={e => setForm(f => ({...f, eventTime:e.target.value}))} style={{ colorScheme:'dark' }} />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div className="form-group">
                  <label>Venue</label>
                  <input value={form.venue} onChange={e => setForm(f => ({...f, venue:e.target.value}))} placeholder="Grand Palace Hall" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input value={form.city} onChange={e => setForm(f => ({...f, city:e.target.value}))} placeholder="Coimbatore" />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" value={form.capacity} onChange={e => setForm(f => ({...f, capacity:e.target.value}))} placeholder="500" />
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({...f, price:e.target.value}))} placeholder="0 for Free" />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl:e.target.value}))} placeholder="https://images.unsplash.com/..." />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description:e.target.value}))} placeholder="Event description..." />
              </div>
              <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end', marginTop:'0.5rem' }}>
                <button type="button" className="btn-outline" onClick={() => setShowForm(false)} style={{ padding:'0.65rem 1.5rem', fontSize:'0.78rem' }}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving} style={{ padding:'0.65rem 1.5rem', fontSize:'0.78rem' }}>{saving ? 'Saving...' : (editEvent ? 'Update Event' : 'Create Event')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? <div style={{ color:'#555', padding:'3rem 0', textAlign:'center' }}>Loading events...</div> : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                {['Title','Category','Date','Venue','Status','Price','Actions'].map(h => (
                  <th key={h} style={{ padding:'0.75rem 1rem', textAlign:'left', color:'#555', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', transition:'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <td style={{ padding:'0.85rem 1rem' }}>
                    <div style={{ color:'#fff', fontSize:'0.85rem', fontWeight:500 }}>{ev.title}</div>
                  </td>
                  <td style={{ padding:'0.85rem 1rem' }}>
                    <span className="badge badge-gold" style={{ fontSize:'0.6rem' }}>{ev.category}</span>
                  </td>
                  <td style={{ padding:'0.85rem 1rem', color:'#888', fontSize:'0.8rem' }}>
                    {ev.eventDate ? new Date(ev.eventDate).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td style={{ padding:'0.85rem 1rem', color:'#888', fontSize:'0.8rem' }}>{ev.city || ev.venue || '—'}</td>
                  <td style={{ padding:'0.85rem 1rem' }}>
                    <span className={`badge ${ev.status === 'UPCOMING' ? 'badge-green' : ev.status === 'COMPLETED' ? 'badge-blue' : 'badge-red'}`} style={{ fontSize:'0.6rem' }}>
                      {ev.status}
                    </span>
                  </td>
                  <td style={{ padding:'0.85rem 1rem', color:'#c9a84c', fontSize:'0.82rem' }}>
                    {ev.price > 0 ? `₹${Number(ev.price).toLocaleString('en-IN')}` : 'Free'}
                  </td>
                  <td style={{ padding:'0.85rem 1rem' }}>
                    <div style={{ display:'flex', gap:'0.5rem' }}>
                      <button onClick={() => handleEdit(ev)} style={{ background:'rgba(96,165,250,0.1)', border:'1px solid rgba(96,165,250,0.3)', color:'#60a5fa', padding:'0.3rem 0.75rem', borderRadius:'4px', cursor:'pointer', fontSize:'0.72rem' }}>Edit</button>
                      <button onClick={() => handleDelete(ev.id)} style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', padding:'0.3rem 0.75rem', borderRadius:'4px', cursor:'pointer', fontSize:'0.72rem' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && <div style={{ textAlign:'center', padding:'3rem', color:'#555' }}>No events yet. Add your first event!</div>}
        </div>
      )}
    </div>
  );
};

// ---- Gallery Tab ----
const GalleryTab = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', imageUrl:'', category:'WEDDING', eventDate:'' });
  const [saving, setSaving] = useState(false);

  const load = () => adminApi.getGallery().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    await adminApi.addGallery(form).catch(() => {});
    setShowForm(false); setForm({ title:'', imageUrl:'', category:'WEDDING', eventDate:'' });
    load(); setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    await adminApi.deleteGallery(id).catch(() => {});
    load();
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.8rem', color:'#fff' }}>Photo Gallery</h2>
          <p style={{ color:'#555', fontSize:'0.8rem' }}>{items.length} photos</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)} style={{ padding:'0.65rem 1.4rem', fontSize:'0.78rem' }}>+ Add Photo</button>
      </div>

      {showForm && (
        <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'6px', padding:'1.5rem', marginBottom:'1.5rem' }}>
          <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'#fff', marginBottom:'1.25rem', fontSize:'1.2rem' }}>Add Gallery Photo</h3>
          <form onSubmit={handleSubmit} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="Wedding Stage Setup" required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}>
                {['WEDDING','CORPORATE','CONCERT','CULTURAL','PRIVATE','LAUNCH','FASHION'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ gridColumn:'1/-1' }}>
              <label>Image URL</label>
              <input value={form.imageUrl} onChange={e => setForm(f=>({...f,imageUrl:e.target.value}))} placeholder="https://images.unsplash.com/..." required />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" value={form.eventDate} onChange={e => setForm(f=>({...f,eventDate:e.target.value}))} style={{ colorScheme:'dark' }} />
            </div>
            <div style={{ gridColumn:'1/-1', display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)} style={{ padding:'0.6rem 1.4rem', fontSize:'0.78rem' }}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving} style={{ padding:'0.6rem 1.4rem', fontSize:'0.78rem' }}>{saving ? 'Saving...' : 'Add Photo'}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ position:'relative', borderRadius:'4px', overflow:'hidden', border:'1px solid rgba(201,168,76,0.1)', aspectRatio:'4/3' }}>
            <img src={item.imageUrl} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}
              onError={e => e.target.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'} />
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0)', transition:'background 0.3s', display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0.75rem' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.7)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0)'}
            >
              <div>
                <div style={{ color:'#fff', fontSize:'0.75rem', fontWeight:600 }}>{item.title}</div>
                <div style={{ color:'#c9a84c', fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>{item.category}</div>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{ background:'rgba(248,113,113,0.8)', border:'none', color:'#fff', width:28, height:28, borderRadius:'50%', cursor:'pointer', fontSize:'0.8rem', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <div style={{ textAlign:'center', padding:'3rem', color:'#555' }}>No gallery items yet.</div>}
    </div>
  );
};

// ---- Testimonials Tab ----
const TestimonialsTab = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientName:'', clientRole:'', company:'', message:'', rating:5, imageUrl:'' });
  const [saving, setSaving] = useState(false);

  const load = () => adminApi.getTestimonials().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    await adminApi.addTestimonial(form).catch(() => {});
    setShowForm(false); setForm({ clientName:'', clientRole:'', company:'', message:'', rating:5, imageUrl:'' });
    load(); setSaving(false);
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.8rem', color:'#fff' }}>Testimonials</h2>
          <p style={{ color:'#555', fontSize:'0.8rem' }}>{items.length} reviews</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)} style={{ padding:'0.65rem 1.4rem', fontSize:'0.78rem' }}>+ Add Review</button>
      </div>

      {showForm && (
        <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'6px', padding:'1.5rem', marginBottom:'1.5rem' }}>
          <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'#fff', marginBottom:'1.25rem', fontSize:'1.2rem' }}>Add Testimonial</h3>
          <form onSubmit={handleSubmit} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <div className="form-group"><label>Client Name *</label><input value={form.clientName} onChange={e=>setForm(f=>({...f,clientName:e.target.value}))} required /></div>
            <div className="form-group"><label>Role / Title</label><input value={form.clientRole} onChange={e=>setForm(f=>({...f,clientRole:e.target.value}))} placeholder="Bride / CEO" /></div>
            <div className="form-group"><label>Company</label><input value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} /></div>
            <div className="form-group"><label>Rating (1-5)</label><input type="number" min="1" max="5" value={form.rating} onChange={e=>setForm(f=>({...f,rating:+e.target.value}))} /></div>
            <div className="form-group" style={{ gridColumn:'1/-1' }}><label>Photo URL</label><input value={form.imageUrl} onChange={e=>setForm(f=>({...f,imageUrl:e.target.value}))} placeholder="https://images.unsplash.com/..." /></div>
            <div className="form-group" style={{ gridColumn:'1/-1' }}><label>Review Message *</label><textarea rows={3} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required /></div>
            <div style={{ gridColumn:'1/-1', display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)} style={{ padding:'0.6rem 1.4rem', fontSize:'0.78rem' }}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving} style={{ padding:'0.6rem 1.4rem', fontSize:'0.78rem' }}>{saving ? 'Saving...' : 'Add Review'}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ display:'flex', gap:'1rem', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.08)', borderRadius:'6px', padding:'1.25rem', alignItems:'flex-start' }}>
            <img src={item.imageUrl || ''} alt={item.clientName} style={{ width:48, height:48, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(201,168,76,0.3)', flexShrink:0 }}
              onError={e => { e.target.style.display='none'; }} />
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                <div>
                  <span style={{ color:'#fff', fontWeight:600, fontSize:'0.9rem' }}>{item.clientName}</span>
                  <span style={{ color:'#888', fontSize:'0.75rem', marginLeft:'0.5rem' }}>{item.clientRole}{item.company ? ` · ${item.company}` : ''}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ color:'#c9a84c', fontSize:'0.85rem' }}>{'★'.repeat(item.rating || 5)}</span>
                  <button onClick={() => { if(window.confirm('Delete this testimonial?')) adminApi.deleteTestimonial(item.id).then(load).catch(()=>{}); }} style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', padding:'0.25rem 0.65rem', borderRadius:'4px', cursor:'pointer', fontSize:'0.7rem' }}>Delete</button>
                </div>
              </div>
              <p style={{ color:'#888', fontSize:'0.83rem', lineHeight:1.6 }}>{item.message}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && <div style={{ textAlign:'center', padding:'3rem', color:'#555' }}>No testimonials yet.</div>}
      </div>
    </div>
  );
};

// ---- Inquiries Tab ----
const InquiriesTab = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const load = () => {
    setLoading(true);
    adminApi.getInquiries().then(r => setInquiries(r.data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await adminApi.updateInquiryStatus(id, status).catch(() => {});
    load();
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const filtered = filterStatus === 'ALL' ? inquiries : inquiries.filter(i => i.status === filterStatus);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.8rem', color:'#fff' }}>Inquiries</h2>
          <p style={{ color:'#555', fontSize:'0.8rem' }}>{inquiries.length} total · {inquiries.filter(i=>i.status==='NEW').length} new</p>
        </div>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          {['ALL','NEW','IN_PROGRESS','RESOLVED'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding:'0.4rem 0.85rem', borderRadius:100,
              background: filterStatus===s ? '#c9a84c' : 'rgba(255,255,255,0.04)',
              border:`1px solid ${filterStatus===s ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
              color: filterStatus===s ? '#000' : '#888',
              fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.2s',
            }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap:'1.5rem' }}>
        {/* List */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', maxHeight:'70vh', overflowY:'auto' }}>
          {loading ? <div style={{ color:'#555', textAlign:'center', padding:'2rem' }}>Loading...</div> :
            filtered.length === 0 ? <div style={{ color:'#555', textAlign:'center', padding:'2rem' }}>No inquiries found.</div> :
            filtered.map(inq => (
              <div key={inq.id} onClick={() => setSelected(inq)} style={{
                background: selected?.id===inq.id ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)',
                border:`1px solid ${selected?.id===inq.id ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius:'6px', padding:'1rem', cursor:'pointer', transition:'all 0.2s',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.4rem' }}>
                  <div style={{ color:'#fff', fontWeight:600, fontSize:'0.88rem' }}>{inq.name}</div>
                  <span className={`badge ${inq.status==='NEW' ? 'badge-red' : inq.status==='IN_PROGRESS' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize:'0.58rem' }}>{inq.status}</span>
                </div>
                <div style={{ color:'#888', fontSize:'0.75rem' }}>{inq.email} {inq.phone ? `· ${inq.phone}` : ''}</div>
                {inq.eventType && <div style={{ color:'#c9a84c', fontSize:'0.7rem', marginTop:'0.25rem', fontWeight:600 }}>{inq.eventType}</div>}
                <div style={{ color:'#555', fontSize:'0.72rem', marginTop:'0.25rem' }}>{inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-IN') : ''}</div>
              </div>
            ))
          }
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.15)', borderRadius:'6px', padding:'1.5rem', position:'sticky', top:'1rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'#fff', fontSize:'1.3rem' }}>Inquiry Details</h3>
              <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', color:'#888', fontSize:'1.2rem', cursor:'pointer' }}>✕</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {[
                ['Name', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Event Type', selected.eventType],
                ['Event Date', selected.eventDate],
                ['Budget', selected.budget],
                ['Venue', selected.venue],
              ].filter(([,v]) => v).map(([k, v]) => (
                <div key={k} style={{ display:'flex', gap:'0.75rem' }}>
                  <span style={{ color:'#555', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', minWidth:80, paddingTop:'2px' }}>{k}</span>
                  <span style={{ color:'#ccc', fontSize:'0.85rem' }}>{v}</span>
                </div>
              ))}
              {selected.message && (
                <div>
                  <div style={{ color:'#555', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.4rem' }}>Message</div>
                  <p style={{ color:'#ccc', fontSize:'0.85rem', lineHeight:1.7, background:'rgba(255,255,255,0.03)', padding:'0.85rem', borderRadius:'4px' }}>{selected.message}</p>
                </div>
              )}
              <div>
                <div style={{ color:'#555', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.6rem' }}>Update Status</div>
                <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                  {['NEW','IN_PROGRESS','RESOLVED'].map(s => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} style={{
                      padding:'0.4rem 0.9rem', borderRadius:'4px', cursor:'pointer',
                      background: selected.status===s ? '#c9a84c' : 'transparent',
                      border:`1px solid ${selected.status===s ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                      color: selected.status===s ? '#000' : '#888',
                      fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', transition:'all 0.2s',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { if(window.confirm('Delete inquiry?')) { adminApi.deleteInquiry(selected.id).then(() => { load(); setSelected(null); }).catch(()=>{}); }}} style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', padding:'0.6rem', borderRadius:'4px', cursor:'pointer', fontSize:'0.78rem', fontWeight:600, marginTop:'0.5rem' }}>
                Delete Inquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Main Admin Dashboard ----
const AdminDashboard = () => {
  const [active, setActive] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) { navigate('/admin/login'); return; }
    adminApi.getDashboard().then(r => setStats(r.data)).catch(() => {});
  }, [isAdmin, navigate]);

  const tabs = {
    dashboard: <DashboardTab stats={stats} />,
    events: <EventsTab />,
    gallery: <GalleryTab />,
    testimonials: <TestimonialsTab />,
    inquiries: <InquiriesTab />,
  };

  if (!isAdmin) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Sidebar active={active} setActive={setActive} onLogout={() => { logout(); navigate('/'); }} />

      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 10px #10b981' }} />
              <div style={{ fontSize:'0.7rem', color:'#10b981', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase' }}>System Active</div>
            </div>
            <div style={{ color:'var(--text-muted)', fontSize:'0.75rem' }}>{new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign:'right' }}>
              <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{user?.username || 'Priya Arjun'}</div>
              <div style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Executive Director</div>
            </div>
            <div style={{ width: 45, height: 45, background: 'var(--bg-surface)', border: '2px solid var(--primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: '1.2rem', boxShadow: 'var(--shadow-glow)' }}>
              {user?.username?.[0]?.toUpperCase() || 'P'}
            </div>
          </div>
        </div>

        {tabs[active]}
      </main>
    </div>
  );
};

export default AdminDashboard;
