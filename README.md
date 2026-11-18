# 🩸 Blood Donor Management System

A full-stack web application designed to connect blood donors with people in need of blood. The system allows users to register as donors, search for available donors, post emergency blood requests, and manage donation activities through a centralized dashboard.

## 1. Project Overview

The Blood Donor Management System provides a centralized platform to simplify blood donation and emergency request management.

**Key Objectives:**
- Connect blood donors with people in need.
- Search donors by blood group and city.
- Manage donor profiles and availability.
- Create and track emergency blood requests.
- Monitor donation activities through a dashboard.

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| Frontend Framework | React | v18.3.1 | Component-based UI rendering |
| Routing & Data | React Router | v7.1.1 | Client-side navigation, loaders, and form actions |
| Build Tool | Vite (`@vitejs/plugin-react`) | v5.3.1 (`v4.3.1`) | Frontend development server and bundler |
| Styling & Icons | Tailwind CSS & Lucide React | v3.4.3 & v1.16.0 | Responsive utility styling and UI icons |
| Backend Runtime | Node.js | v22.x / v24.x LTS | JavaScript server runtime |
| Web Framework | Express.js | v5.x | REST API routing and middleware |
| Database | MongoDB Atlas | v8.0 | Cloud NoSQL document database |
| ODM | Mongoose | v8.x | Schema modeling, validation, and queries |

## 3. System Architecture

The application follows a **decoupled client-server architecture**, separating the frontend, backend, and database.

- **Frontend:** React handles the user interface and user interactions.
- **Backend:** Node.js and Express manage business logic, API requests, and authentication.
- **Database:** MongoDB stores user accounts, donor profiles, and blood requests.


## 4. User Roles

The system supports two user roles:

- **Donor:** Manage profile information, update location, change availability, and delete profile.
- **Blood Request:** Represents blood requests managed under the Blood Requests section.

## 5. Core Features


- Donor registration and profile management (CRUD).
- Donor search using blood group and city filters.
- Donor availability management.
- Emergency blood request creation and tracking.
- Request status management (Active, Fulfilled, Cancelled).
- Dashboard displaying available donors and active requests.


## 6. UI/UX Design

The application follows a clean, minimal, and responsive web design.

| Element | Specification |
|---|---|
| Primary Color | `#149B88` |
| Background | `#F8FAFC` |
| Card Background | White |
| Framework | Tailwind CSS 4 |
| Layout | Responsive Web |
| Navigation | Fixed Bottom Navigation |
| Buttons | Medium-sized with hover states |

**Navigation Options:** Dashboard, Find Donors, Register Donor, and Blood Requests.

## 7. Database Design

MongoDB contains three primary collections:

- **Users:** Name, email, password, and role.
- **Donors:** User ID, full name, phone, city, blood group, and availability.
- **Blood Requests:** Requester ID, patient details, hospital, city, blood group, contact, urgency, and request status.

## 8. API Overview

The backend provides RESTful endpoints for frontend communication.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | User login |
| GET | `/api/donors` | Retrieve donors |
| POST | `/api/donors` | Register donor |
| PUT | `/api/donors/:id` | Update donor |
| DELETE | `/api/donors/:id` | Delete donor |
| GET | `/api/requests` | Retrieve requests |
| POST | `/api/requests` | Create request |
| PUT | `/api/requests/:id` | Update request |
| DELETE | `/api/requests/:id` | Delete request |
| GET | `/api/dashboard/stats` | Dashboard statistics |

## 9. Non-Functional Requirements

- **Performance:** Donor searches and request feeds should respond within 1.5 seconds under specified conditions.
- **Security:** Password hashing, secure JWT management, input validation, and protected API routes.
- **Usability:** Simple navigation and responsive layouts.
- **Maintainability:** Modular components, reusable code, and organized backend structure.

## 10. Installation and Setup

**Prerequisites:** Node.js, npm, MongoDB, and Git.

**Clone Repository:**

```bash
git clone <repository-url>
cd Blood-Donor-Management-System
```

**Backend Setup:**

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

**Frontend Setup** (open another terminal):

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL in your browser, usually:

`http://localhost:5173`

## 11. Future Enhancements

- User registration, login, and JWT authentication
- SMS and email notifications.
- Real-time donor matching.
- Google Maps integration.
- OTP-based phone verification.
- Donation history and reports.
- Advanced admin analytics.

## 12. Conclusion

The Blood Donor Management System provides an efficient digital platform for donor discovery and emergency blood request management. Using React, Node.js, Express, and MongoDB, it aims to make blood donation coordination easier, faster, and more accessible.

---

**Project Type:** Full-Stack Web Application  
**Frontend:** React.js, , Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Architecture:** Client-Server Architecture
