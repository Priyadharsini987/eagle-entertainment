import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('eagle_token');
    if (token) {
      authApi.verify()
        .then(res => {
          if (res.data.valid) setUser({ username: res.data.username, role: res.data.role });
          else localStorage.removeItem('eagle_token');
        })
        .catch(() => localStorage.removeItem('eagle_token'))
        .finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const login = async (username, password) => {
    const res = await authApi.login(username, password);
    localStorage.setItem('eagle_token', res.data.token);
    setUser({ username: res.data.username, role: res.data.role, email: res.data.email });
    return res.data;
  };

  const logout = () => { localStorage.removeItem('eagle_token'); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
