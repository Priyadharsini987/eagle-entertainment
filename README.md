# 🦅 Eagle Entertainment — Event Management Website

A full-stack professional event management website for **Eagle Entertainment**, built with:
- **Frontend**: React 18 + React Router + Axios
- **Backend**: Spring Boot 3 + Spring Security + JWT + JPA
- **Database**: H2 (development) / MySQL (production)

---

## 📁 Project Structure

```
eagle-entertainment/
├── frontend/          ← React Application
│   ├── src/
│   │   ├── components/   (Navbar, Footer, EventCard)
│   │   ├── context/      (AuthContext)
│   │   ├── pages/        (Home, Events, Gallery, About, Contact, Admin)
│   │   └── services/     (API layer)
│   └── package.json
│
└── backend/           ← Spring Boot Application
    ├── src/main/java/com/eagle/entertainment/
    │   ├── controller/   (Auth, Public, Admin)
    │   ├── model/        (Event, User, Gallery, Testimonial, Inquiry)
    │   ├── repository/   (JPA Repositories)
    │   └── config/       (JWT, Security)
    └── pom.xml
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+** (for Spring Boot)
- **Maven 3.8+** (for building backend)
- **Node.js 18+** and **npm** (for React frontend)

---

## 🖥️ Backend Setup

```bash
cd backend

# Build and run
mvn spring-boot:run

# Or build JAR and run
mvn clean package
java -jar target/entertainment-1.0.0.jar
```

The backend starts on **http://localhost:8080**

### H2 Console (development)
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:eagledb`
- Username: `sa` | Password: *(empty)*

### Switch to MySQL (production)
In `src/main/resources/application.properties`:
1. Comment out the H2 datasource lines
2. Uncomment the MySQL lines
3. Set your MySQL credentials
4. Change `spring.jpa.hibernate.ddl-auto=update`

---

## 🌐 Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The React app runs on **http://localhost:3000**

### Build for production
```bash
npm run build
```

---

## 🔐 Admin Login

Default credentials:
- **Username**: `admin`
- **Password**: `admin123`

> Admin panel is at: http://localhost:3000/admin/login

---

## ✨ Features

### Public Website
- 🏠 **Home** — Hero slider, Upcoming & Recent events (horizontal scroll), Services, Why Us, Testimonials, CTA
- 📅 **Events** — Full listing with tab filter (Upcoming/Past) + category filters
- 🖼️ **Gallery** — Masonry photo gallery with lightbox & category filter
- ℹ️ **About** — Story, timeline, team, stats
- 📩 **Contact** — Full inquiry form with all event details

### Admin Panel
- 📊 **Dashboard** — Live stats overview
- 🎭 **Events** — Full CRUD (create, edit, delete events with all fields)
- 🖼️ **Gallery** — Add/delete gallery photos
- 💬 **Testimonials** — Add/delete client reviews
- 📩 **Inquiries** — View all contact inquiries, update status (New/In Progress/Resolved), delete

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Gold | `#c9a84c` |
| Background | `#0a0a0a` |
| Dark Card | `#1a1a1a` |
| Display Font | Cormorant Garamond |
| Body Font | DM Sans |
| Accent Font | Bebas Neue |

---

## 🔗 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/events/upcoming` | Get upcoming events |
| GET | `/api/public/events/recent` | Get past events |
| GET | `/api/public/events/{id}` | Get event by ID |
| GET | `/api/public/gallery` | Get all gallery photos |
| GET | `/api/public/testimonials` | Get all testimonials |
| GET | `/api/public/stats` | Get site statistics |
| POST | `/api/public/inquiry` | Submit contact inquiry |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login → returns JWT token |
| GET | `/api/auth/verify` | Verify JWT token |

### Admin (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard stats |
| GET/POST | `/api/admin/events` | List / Create events |
| PUT/DELETE | `/api/admin/events/{id}` | Update / Delete event |
| GET/POST | `/api/admin/gallery` | List / Add gallery |
| DELETE | `/api/admin/gallery/{id}` | Delete gallery item |
| GET/POST | `/api/admin/testimonials` | List / Add testimonial |
| DELETE | `/api/admin/testimonials/{id}` | Delete testimonial |
| GET | `/api/admin/inquiries` | List all inquiries |
| PUT | `/api/admin/inquiries/{id}/status` | Update inquiry status |
| DELETE | `/api/admin/inquiries/{id}` | Delete inquiry |

---

## 📧 Contact

Eagle Entertainment  
📍 123 Event Plaza, Gandhipuram, Coimbatore – 641 012  
📞 +91 98765 43210  
✉️ events@eagleentertainment.com

---

*Built with ❤️ for Eagle Entertainment*
