-- Default admin user (password: PriyaArjun1718@Eagle)
INSERT INTO users (username, password, email, role, created_at) VALUES
('PriyaArjun', '$2a$10$UqY1fJ8NfN9y/rNf/x5mFeU8QO/Qj8nNfG.f6T5ZpZ9/x5mFeU8QO', 'admin@eagleentertainment.com', 'ADMIN', NOW());

-- Sample Events
INSERT INTO events (title, description, category, event_date, event_time, venue, city, capacity, price, image_url, status, is_upcoming, created_at) VALUES
('Royal Wedding Extravaganza', 'A breathtaking wedding celebration blending tradition and modern elegance.', 'WEDDING', CURRENT_DATE + INTERVAL '15 days', '18:00', 'The Grand Palace Hall', 'Chennai', 500, 2500.00, 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'UPCOMING', true, NOW()),
('Corporate Summit 2025', 'Annual leadership summit featuring keynote speakers and networking sessions.', 'CORPORATE', CURRENT_DATE + INTERVAL '22 days', '09:00', 'Leela Convention Center', 'Coimbatore', 300, 1500.00, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'UPCOMING', true, NOW()),
('Bollywood Night Live', 'An electrifying evening of live Bollywood performances.', 'CONCERT', CURRENT_DATE + INTERVAL '30 days', '20:00', 'CODISSIA Arena', 'Coimbatore', 2000, 800.00, 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', 'UPCOMING', true, NOW()),
('Festival of Lights Gala', 'A magnificent Diwali celebration with cultural performances.', 'CULTURAL', CURRENT_DATE + INTERVAL '45 days', '19:00', 'SNR Sons Cultural Hall', 'Tiruppur', 1000, 600.00, 'https://images.unsplash.com/photo-1605018143851-cd84c40e0d5f?w=800', 'UPCOMING', true, NOW()),
('Product Launch - TechCorp', 'Exclusive product launch event with live demos and media coverage.', 'LAUNCH', CURRENT_DATE + INTERVAL '10 days', '11:00', 'Hotel Radisson Blu', 'Chennai', 200, 0.00, 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', 'UPCOMING', true, NOW()),
('Silver Jubilee Celebration', 'A grand 25th anniversary celebration with live orchestra.', 'PRIVATE', CURRENT_DATE + INTERVAL '7 days', '17:00', 'Hotel Taj Vivanta', 'Coimbatore', 150, 0.00, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', 'UPCOMING', true, NOW()),
-- Recent / Past Events
('Tech Innovators Conference 2024', 'A stellar corporate conference industry leaders.', 'CORPORATE', CURRENT_DATE - INTERVAL '10 days', '09:00', 'Leela Convention Center', 'Coimbatore', 400, 2000.00, 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800', 'COMPLETED', false, NOW()),
('Dream Wedding - Priya & Arjun', 'A fairytale wedding with magnificent floral arrangements.', 'WEDDING', CURRENT_DATE - INTERVAL '5 days', '19:00', 'The Grand Palace Hall', 'Chennai', 600, 3000.00, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', 'COMPLETED', false, NOW()),
('AR Rahman Tribute Night', 'An incredible tribute concert featuring top artists.', 'CONCERT', CURRENT_DATE - INTERVAL '20 days', '19:30', 'CODISSIA Arena', 'Coimbatore', 3000, 1000.00, 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', 'COMPLETED', false, NOW()),
('Annual Sports Day - MNC Corp', 'A fun-filled corporate sports day with team games.', 'CORPORATE', CURRENT_DATE - INTERVAL '15 days', '08:00', 'Nehru Stadium', 'Coimbatore', 500, 500.00, 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', 'COMPLETED', false, NOW()),
('Pongal Cultural Festival', 'A vibrant traditional Pongal celebration.', 'CULTURAL', CURRENT_DATE - INTERVAL '30 days', '08:00', 'Town Hall Grounds', 'Tiruppur', 2000, 0.00, 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800', 'COMPLETED', false, NOW()),
('Fashion Week Coimbatore', 'The biggest fashion event of the year showcasing top designers.', 'FASHION', CURRENT_DATE - INTERVAL '8 days', '17:00', 'Hotel Radisson Blu', 'Coimbatore', 300, 1200.00, 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800', 'COMPLETED', false, NOW());

-- Gallery Images
INSERT INTO gallery (title, image_url, category, event_date, created_at) VALUES
('Royal Wedding Setup', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', 'WEDDING', CURRENT_DATE - INTERVAL '5 days', NOW()),
('Stage Decoration', 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600', 'CONCERT', CURRENT_DATE - INTERVAL '20 days', NOW()),
('Corporate Gala Dinner', 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600', 'CORPORATE', CURRENT_DATE - INTERVAL '10 days', NOW()),
('Floral Arrangements', 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600', 'WEDDING', CURRENT_DATE - INTERVAL '5 days', NOW()),
('Live Concert Stage', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600', 'CONCERT', CURRENT_DATE - INTERVAL '20 days', NOW()),
('Award Ceremony', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', 'CORPORATE', CURRENT_DATE - INTERVAL '10 days', NOW()),
('Mandap Decoration', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600', 'WEDDING', CURRENT_DATE - INTERVAL '5 days', NOW()),
('DJ Night Setup', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600', 'CONCERT', CURRENT_DATE - INTERVAL '20 days', NOW()),
('Birthday Celebration', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', 'PRIVATE', CURRENT_DATE - INTERVAL '15 days', NOW()),
('Cultural Performance', 'https://images.unsplash.com/photo-1605018143851-cd84c40e0d5f?w=600', 'CULTURAL', CURRENT_DATE - INTERVAL '30 days', NOW()),
('Product Launch Setup', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600', 'LAUNCH', CURRENT_DATE - INTERVAL '10 days', NOW()),
('Outdoor Event Venue', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600', 'PRIVATE', CURRENT_DATE - INTERVAL '8 days', NOW());

-- Testimonials
INSERT INTO testimonials (client_name, client_role, company, message, rating, image_url, created_at) VALUES
('Priya Sharma', 'Bride', 'Private Client', 'Eagle Entertainment made our dream wedding a reality.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', NOW()),
('Rajesh Kumar', 'CEO', 'TechCorp India', 'Our product launch was flawlessly executed.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', NOW()),
('Ananya Iyer', 'HR Director', 'Global Solutions Ltd', 'The annual corporate summit was a huge success.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', NOW()),
('Vikram Nair', 'Event Attendee', 'Public', 'Attended the Bollywood Night concert — absolute magic!', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', NOW()),
('Meena Pillai', 'Mother of the Bride', 'Private Client', 'My daughter''s wedding was perfect!', 5, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', NOW()),
('Arjun Patel', 'Marketing Head', 'Sunrise Brands', 'Creative, professional, and absolutely reliable team!', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', NOW());
