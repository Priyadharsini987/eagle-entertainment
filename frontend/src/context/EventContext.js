import React, { createContext, useContext, useState, useEffect } from 'react';
import { publicApi } from '../services/api';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await publicApi.getAllEvents();
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch {
      // Use mock data if backend not available
      setEvents(getMockEvents());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const upcomingEvents = events.filter(e => e.status === 'UPCOMING' || new Date(e.date) > new Date());
  const recentEvents = events.filter(e => e.status === 'COMPLETED' || new Date(e.date) <= new Date());

  return (
    <EventContext.Provider value={{ events, upcomingEvents, recentEvents, loading, fetchEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}

function getMockEvents() {
  return [
    { id: 1, title: "Grand Corporate Gala 2025", category: "Corporate", date: "2025-08-15", location: "The Leela Palace, Chennai", description: "An exquisite evening of business excellence and networking.", image: null, status: "UPCOMING", capacity: 500, price: "₹5,000" },
    { id: 2, title: "Moonlit Wedding Ceremony", category: "Wedding", date: "2025-09-22", location: "Taj Coromandel, Chennai", description: "A magical outdoor wedding celebration under the stars.", image: null, status: "UPCOMING", capacity: 300, price: "₹12,000" },
    { id: 3, title: "Annual Music Festival", category: "Concert", date: "2025-10-05", location: "Chennai Trade Centre", description: "Three days of live music featuring top artists from across India.", image: null, status: "UPCOMING", capacity: 2000, price: "₹1,500" },
    { id: 4, title: "Product Launch: TechVision Pro", category: "Corporate", date: "2025-11-18", location: "ITC Grand Chola, Chennai", description: "Exclusive product launch event for industry leaders.", image: null, status: "UPCOMING", capacity: 200, price: "Invitation Only" },
    { id: 5, title: "Heritage Cultural Festival", category: "Cultural", date: "2025-01-14", location: "Marina Beach Grounds", description: "Celebrating Tamil culture with dance, music, and art.", image: null, status: "COMPLETED", capacity: 5000, price: "Free" },
    { id: 6, title: "Luxury Brand Awards Night", category: "Awards", date: "2025-02-28", location: "Hyatt Regency Chennai", description: "Recognizing excellence in luxury and lifestyle brands.", image: null, status: "COMPLETED", capacity: 400, price: "₹8,000" },
    { id: 7, title: "Startup Summit 2025", category: "Corporate", date: "2025-03-10", location: "Chennai Trade Centre", description: "India's premier startup ecosystem gathering.", image: null, status: "COMPLETED", capacity: 1500, price: "₹2,500" },
    { id: 8, title: "Royal Wedding Celebration", category: "Wedding", date: "2025-04-20", location: "Radisson Blu, Chennai", description: "A grand three-day wedding extravaganza.", image: null, status: "COMPLETED", capacity: 800, price: "₹20,000" },
  ];
}
