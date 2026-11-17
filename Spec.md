# Blood Donor Management System
## Software Requirements Specification (SRS) & Web Architecture

### 1. Project Scope & Architecture Overview

The Blood Donor Management System is a full-stack, browser-based web application designed to connect blood donors with individuals requiring blood. It follows a decoupled client-server architecture, separating the React frontend from the backend RESTful API.

The system provides end-to-end CRUD (Create, Read, Update, Delete) functionality across five core modules: Authentication, Donor Registration, Donor Search, Request Management, and Dashboard Integration.

**UI/UX Design Requirements:**
- Primary Color: Deep Teal (#149B88).
- Background: Light Gray (#F8FAFC).
- Responsive desktop and web-browser interface.
- Medium-sized buttons with clear hover and active states.
- Minimal, uncluttered layouts with balanced spacing.
- Fixed bottom navigation bar with clearly spaced icons across all views.

### 2. Recommended Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | React | 19.3 |
| Build Tool | Vite | 6.0 |
| Styling | Tailwind CSS | 4.0 |
| Backend Runtime | Node.js | 26.13.0 LTS |
| Web Framework | Express.js | 5.0 |
| Database & ODM | MongoDB & Mongoose | 8.0 / 8.9 |

### 3. User Roles & Access Control

| User Role | Permissions |
|---|---|
| Guest User | View active blood requests, search donors by blood group and city, and register as a donor. |
| Registered Donor | Manage profile details, update location, toggle availability (Available/Unavailable), and delete profile. |
| Requester / Admin | Create, track, resolve, and cancel emergency blood requests; access dashboard statistics and system analytics. |

### 4. Functional Modules & Web Screens

**Module 1: Find Donors (Search & Discovery)**

- Provide a blood group dropdown (A+, A-, B+, B-, AB+, AB-, O+, O-) and city search input.
- Display donor cards containing name, blood group badge, city, availability status, and a Contact Donor button.
- Show an appropriate empty state when no matching donors are found: "No donors found matching your criteria. Try adjusting your search."

**Module 2: Register Donor (Registration & Availability)**

- Provide a registration form with Full Name, Phone Number, City, and Blood Group.
- Include an availability toggle with Available and Unavailable options.
- Support donor profile creation, updating, and deletion.
- Include a primary Register Profile button using the deep teal theme.

**Module 3: Blood Requests (Emergency Posting & Live Feed)**

- Provide a request submission form containing Patient Details, Hospital Name, City, Required Blood Group, Contact Phone, and Urgency Level.
- Urgency levels: Standard, Urgent, and Critical.
- Display active blood requests in a live feed below the form, arranged chronologically.
- Provide options to contact the requester, fulfill a request, and manage request status.
- Allow authorized users to create, track, resolve, and cancel requests.

**Module 4: Dashboard Integration**

- Provide a centralized dashboard showing:
  - Total active blood requests.
  - Number of available donors.
  - Quick-action shortcuts for important operations.
  - Basic system analytics and activity overview.

**Module 5: Authentication & Navigation**

- Implement secure user registration and login.
- Apply role-based access control for different user types.
- Provide a persistent fixed bottom navigation bar across all views with four navigation options:
  1. Dashboard
  2. Find Donors
  3. Register Donor
  4. Blood Requests

### 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Donor search queries and blood request feed updates should execute within less than 1.5 seconds through REST API endpoints. |
| Usability | Maintain a clean, responsive, and easy-to-navigate interface with consistent spacing and medium-sized buttons. |
| UI Consistency | Use the defined teal (#149B88) and light gray (#F8FAFC) color scheme, with consistent card layouts and interactive button states. |
| Security | Securely handle user contact information, hash passwords, protect JWT tokens, and secure API routes through authentication and authorization middleware. |
| Reliability | Maintain accurate donor availability and blood request statuses across the application. |
| Maintainability | Use reusable React components, modular backend routes, and organized database schemas. |

### 6. System Architecture

The application follows a three-layer client-server structure:

1. **Frontend Layer:** React and Tailwind CSS provide the responsive user interface and handle user interactions.
2. **Backend Layer:** Node.js and Express.js expose RESTful APIs, process business logic, validate requests, and enforce authentication and authorization.
3. **Database Layer:** MongoDB with Mongoose stores and manages donor profiles, user accounts, blood requests, and related records.

JWT-based authentication ensures secure communication between authorized users and protected backend endpoints.

---


**Project Goal:** To provide a centralized, responsive, and reliable web platform that simplifies donor discovery, emergency blood requests, and communication between donors and requesters.
