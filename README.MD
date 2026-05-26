# StayEase — Hotel & Homestay Booking Platform

A fullstack hotel & homestay booking platform built with:

* Java Spring Boot
* ReactJS
* TailwindCSS
* MongoDB
* Docker
* JWT Authentication

This project was built step-by-step to simulate a real-world booking system architecture and improve fullstack development skills.

---

# Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Security
* Spring Data MongoDB
* JWT Authentication
* Lombok
* Maven

---

## Frontend

* ReactJS
* Vite
* TailwindCSS
* Axios

---

## Database

* MongoDB
* MongoDB Compass

---

## DevOps / Tools

* Docker
* Docker Compose
* Git & GitHub
* Postman

---

# Project Structure

```txt
hotel-booking-pj
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   ├── config
│   └── security
│
├── frontend
│
└── docker-compose.yml
```

---

# Features

# Day 1 — Project Setup

## Backend Setup

* Setup Spring Boot backend
* Connect MongoDB
* Configure application.properties
* Create Room model
* Create RoomRepository
* Create RoomController
* Test REST API with Postman

---

## Frontend Setup

* Create ReactJS project with Vite
* Install TailwindCSS
* Configure TailwindCSS
* Install Axios
* Fetch room data from backend API
* Display room cards UI

---

## Docker Setup

* Setup MongoDB with Docker Compose
* Connect backend to Docker MongoDB

---

## GitHub Setup

* Initialize Git repository
* Setup `.gitignore`
* Push project to GitHub

---

# Day 2 — Authentication System

## User System

* Create User model
* Create Role enum
* Create UserRepository

---

## Authentication APIs

### Register API

```txt
POST /api/auth/register
```

### Login API

```txt
POST /api/auth/login
```

---

## JWT Authentication

* Generate JWT token
* Configure JWT secret
* Create JwtService

---

## Password Security

* Encrypt passwords using BCrypt
* Validate passwords during login

---

## DTO Architecture

* RegisterRequest
* LoginRequest
* AuthResponse

---

# Day 3 — Room Management System

## Room CRUD APIs

### Get All Rooms

```txt
GET /api/rooms
```

### Get Room Detail

```txt
GET /api/rooms/{id}
```

### Search Room By Location

```txt
GET /api/rooms/search?location=Da Lat
```

### Create Room

```txt
POST /api/admin/rooms
```

### Update Room

```txt
PUT /api/admin/rooms/{id}
```

### Delete Room (Soft Delete)

```txt
DELETE /api/admin/rooms/{id}
```

---

## Room Features

* Room listing
* Room detail
* Room search
* Room update
* Room soft delete
* Active room filtering

---

## Architecture Improvements

* Apply Controller → Service → Repository pattern
* Add RoomRequest DTO
* Separate business logic from controller

---

# Day 4 — Booking System

## Booking Features

* Create booking
* Booking validation
* Booking overlap checking
* Total nights calculation
* Total price calculation
* Cancel booking
* User booking history

---

## Booking APIs

### Create Booking

```txt
POST /api/bookings
```

### Get User Bookings

```txt
GET /api/bookings/user/{userId}
```

### Cancel Booking

```txt
PUT /api/bookings/{bookingId}/cancel
```

---

## Booking Validation Logic

The system validates:

* Room existence
* User existence
* Valid check-in/check-out dates
* Room availability
* Booking overlap

---

## Booking Overlap Detection

Example:

```txt
Existing booking:
01/06 → 05/06

New booking:
03/06 → 06/06

→ Overlapping booking detected
```

---

# API Examples

# Register

```http
POST /api/auth/register
```

```json
{
  "fullName": "Hoang Minh",
  "email": "minh@gmail.com",
  "password": "123456"
}
```

---

# Login

```http
POST /api/auth/login
```

```json
{
  "email": "minh@gmail.com",
  "password": "123456"
}
```

---

# Create Room

```http
POST /api/admin/rooms
```

```json
{
  "name": "Mountain View Homestay",
  "description": "Beautiful homestay with mountain view",
  "location": "Da Lat",
  "pricePerNight": 700000,
  "capacity": 2,
  "bedCount": 1,
  "imageUrls": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  ],
  "amenities": [
    "Wifi",
    "Balcony",
    "Free Parking"
  ]
}
```

---

# Create Booking

```http
POST /api/bookings
```

```json
{
  "userId": "USER_ID",
  "roomId": "ROOM_ID",
  "checkInDate": "2026-06-01",
  "checkOutDate": "2026-06-05"
}
```

---

# Run Project

# 1. Start MongoDB

```bash
docker compose up -d
```

---

# 2. Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on:

```txt
http://localhost:8080
```

---

# 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Current System Architecture

```txt
Frontend (ReactJS)
        ↓
REST API
        ↓
Controller
        ↓
Service
        ↓
Repository
        ↓
MongoDB
```

---

# Skills Demonstrated

This project demonstrates knowledge of:

* Fullstack development
* RESTful API design
* Spring Boot architecture
* MongoDB integration
* JWT authentication
* Password encryption
* Docker containerization
* CRUD operations
* DTO architecture
* Business logic validation
* Booking system design
* React frontend integration

---

# Future Improvements

* JWT Filter & Role Authorization
* Admin Dashboard
* Payment Integration
* Room Images Upload
* Booking Calendar UI
* Review & Rating System
* Email Notifications
* Deployment with Render / Railway / VPS
* CI/CD Pipeline

---

# Author

Hoang Minh
Fullstack Developer Intern Project
