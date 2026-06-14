# Event Management System — Frontend

A modern, responsive web application built with React for the Event Management System.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router v6
- Docker + Nginx

## Features
- JWT authentication with automatic token management
- Role-based routing (Admin, Organizer, Attendee)
- Browse, search, and filter events
- Real-time booking with capacity tracking
- PDF ticket confirmation via email
- Organizer dashboard — create, edit, delete events
- Admin dashboard — manage users, events, bookings
- In-person and virtual event support
- Fully responsive design

## Pages
- Landing Page
- Login / Register
- Home — Browse Events
- Event Detail + Booking
- My Bookings
- Organizer Dashboard
- Create / Edit Event
- Admin Dashboard

## Setup

### Local Setup
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173`

### Docker Setup
```bash
docker-compose up --build
```
(Run from the root folder containing docker-compose.yml)

## Environment
The app proxies all `/api` calls to `http://localhost:8080` in development via Vite config.
