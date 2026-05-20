import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid credentials');
      } else if (!err.response) {
        setError('Cannot reach server — it may be starting up, try again in 30s');
      } else {
        setError('Login failed: ' + (err.response?.data?.error || err.message || 'Unknown error'));
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-main)',
      padding: '2rem',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
      </div>

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>
        {/* Logo Section */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 140, height: 140,
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              border: '3px solid var(--primary)',
              boxShadow: '0 0 40px rgba(201,168,76,0.4)',
              background: 'url(/logo.png) center center no-repeat',
              backgroundSize: 'cover'
            }} />
            <div className="display-font" style={{ fontSize: '2rem', color: '#fff', letterSpacing: '0.15em', fontWeight: 700 }}>
              EAGLE ENTERTAINMENT
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: '0.8rem', fontWeight: 600 }}>Executive Access Portal</div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '3.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h1 className="display-font" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
              Executive <span style={{ color: 'var(--primary)' }}>Secure Login</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back, Director.</p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444',
              color: '#ef4444', padding: '1rem 1.25rem', borderRadius: '4px',
              fontSize: '0.9rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              animation: 'shake 0.4s ease'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Executive Username</label>
              <input
                name="username" value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                required placeholder="Enter Executive Username"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required 
                  placeholder="Enter Executive Password"
                  autoComplete="current-password"
                  style={{ paddingRight: '3.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                    fontSize: '1.2rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{
              width: '100%', marginTop: '1rem',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? 'Authenticating...' : 'Login to Dashboard'}
            </button>
            {loading && (
              <div style={{
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                textAlign: 'center',
                marginTop: '0.75rem',
                lineHeight: '1.4',
                animation: 'pulse 1.5s infinite'
              }}>
                Backend waking up, please wait... (If the server has spun down, this may take up to 60 seconds)
              </div>
            )}
          </form>

          <div style={{ marginTop: '2.5rem', padding: '1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom:'0.5rem' }}>
              System Status: <span style={{ color: '#10b981' }}>Secure & Online</span>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >← Return to Public Portal</Link>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
