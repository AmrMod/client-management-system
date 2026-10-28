# Student Support Management System

A full-stack web application for managing student support requests, coordinating support teams, and enabling communication between students and university support staff.

**Live application:** [https://client-management-system-vert.vercel.app/](https://client-management-system-vert.vercel.app/)

**Backend API:** [https://student-support-api-wwdq.onrender.com](https://student-support-api-wwdq.onrender.com)

> The application was originally developed under the name *Client Management System* and subsequently adapted into a Student Support Management System.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Authentication and Authorization](#authentication-and-authorization)
- [API Overview](#api-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database and Migrations](#database-and-migrations)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Project Goals](#project-goals)

## Overview

The Student Support Management System is a centralized platform that enables students to submit support requests and communicate with the relevant support teams.

Rather than relying exclusively on disconnected communication channels, the application brings request submission, request tracking, support staff workflows, and messaging into one interface.

The system is designed around role-based access, authenticated API requests, relational data modelling, and a separation between the frontend, backend, and database.

## Key Features

### Student Support Requests

- Submit support requests with a title, description, priority, and support unit.
- Track requests throughout their lifecycle.
- Associate requests with the student who submitted them.
- Support request statuses including `PENDING`, `IN_PROGRESS`, `RESOLVED`, and `REJECTED`.
- Support priority levels including `LOW`, `MEDIUM`, and `HIGH`.
- Attach files to requests where supported by the configured upload handling.
- Download attached files for each request. 

### Support Team Workflows

- Organize requests around support units.
- Provide role-specific interfaces for students, support staff, managers, and administrators.
- Retrieve and manage relevant support information through backend API endpoints.

### Conversations and Messaging

- Create conversations between students and support units.
- Exchange messages through a conversation-based interface.
- Use Socket.IO to support real-time communication.
- Retrieve conversations according to the relevant user's or support team's context.

### Notifications

- Generate notifications for application events, including successful request submissions, high-priority requests, and requests assigned to support staff by managers.
- Provide a notification interface for users.

### Administration and User Management

- Manage user accounts and roles through administrative functionality.
- Provide role-specific dashboards and navigation.
- Organize access to system functionality according to the authenticated user's role.

### Search and Data Retrieval

- Retrieve student requests using offset-based pagination.
- Support searching and sorting in relevant request-list operations.
- Use targeted database queries to retrieve the information needed by application features.

## User Roles

The application uses four primary roles.

| Role | Responsibility |
|---|---|
| `STUDENT` | Submit and track support requests, view relevant information, and communicate with support teams. |
| `SUPPORT` | Access support workflows and conversations associated with the relevant support unit. |
| `MANAGER` | Access management-level functionality and oversight. |
| `ADMIN` | Manage users and perform administrative operations. |

Access to protected backend functionality is enforced through authentication and role-based authorization middleware.

### Data and Account Setup

- Initial role-related data and authorization changes were introduced through a database migration in version 2 of the application.
- Test data was inserted directly into the database during development rather than being created through a registration form.

The precise permissions available to each role depend on the individual route and its authorization rules.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| Styling and UI | Tailwind CSS, shadcn/ui, Lucide React |
| Backend | Node.js, Express.js |
| API | REST |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT, HttpOnly cookies |
| Input validation | Zod |
| Real-time communication | Socket.IO |
| Automated testing | Jest, Supertest |
| Frontend hosting | Vercel |
| Backend hosting | Render |
| Managed database | Neon |

## System Architecture

The application follows a frontend–backend–database architecture.

```text
                    User's Browser
                          |
                          v
                React + Vite Frontend
                       Vercel
                          |
                 HTTPS API Requests
                Credentials Included
                          |
                          v
                   Express.js API
                       Render
                          |
              +-----------+-----------+
              |           |           |
              v           v           v
           Prisma     Socket.IO   Middleware
              |           |           |
              +-----------+-----------+
                          |
                          v
                 PostgreSQL Database
                        Neon
```

The Student Support Management System uses a decoupled architecture. The frontend handles the user interface and sends API requests to the backend. The Express application processes requests, applies authentication and authorization checks, validates input, and interacts with PostgreSQL through Prisma.

Socket.IO provides the real-time communication layer for conversations.

### Request Lifecycle

A typical authenticated request follows this sequence:

1. The frontend sends an HTTP request to the backend with credentials included.
2. Authentication middleware reads the JWT from the request cookie and verifies it.
3. The authenticated user's identity and role become available to downstream middleware and handlers.
4. Authorization middleware checks whether the user is permitted to perform the operation.
5. The backend validates the request and executes the appropriate application logic.
6. Prisma queries or updates PostgreSQL.
7. The API returns an appropriate HTTP response to the frontend.

This separation makes it easier to maintain the interface, business logic, access-control rules, and persistence layer independently.

## Authentication and Authorization

### JWT Authentication with HttpOnly Cookies

The application uses JSON Web Tokens (JWTs) for authentication. The token is stored in an HttpOnly cookie rather than being exposed to frontend JavaScript.

The backend uses cookie-based authentication and verifies the token before allowing access to protected endpoints.

The cookie configuration distinguishes between development and production environments. In production, it uses secure cookies and `SameSite=None` to support cross-origin frontend and backend communication.

The frontend includes credentials in API requests so the browser can send the authentication cookie.

### Role-Based Access Control

Protected routes use authentication middleware and role-based authorization checks. Staff-specific functionality also applies additional role restrictions.

### Ownership Checks

User-specific database operations should scope queries to the authenticated user's identity or associated profile, rather than trusting a user-supplied identifier alone.

This is particularly important for preventing insecure direct object reference (IDOR) and broken object-level authorization (BOLA) vulnerabilities.

### Input Validation

Zod is used to validate supported request inputs before application logic processes them. Input validation helps ensure that incoming data conforms to expected formats and constraints.

### Security Middleware

The backend configuration includes security-oriented middleware and request controls such as Helmet, CORS configuration, and rate limiting.

These controls are complementary. They do not replace correct authorization, input validation, secure file handling, or appropriate database constraints.

## API Overview

The backend organizes functionality into route groups.

| Route prefix | Purpose |
|---|---|
| `/auth` | Authentication-related operations |
| `/users` | User-related operations |
| `/requests` | Support request operations |
| `/students` | Student-related operations |
| `/staff` | Support staff operations |
| `/conversations` | Conversation and messaging operations |
| `/dashboard` | Dashboard data |
| `/notifications` | Notification operations |

These are route prefixes, not a complete endpoint specification. The available HTTP methods, request bodies, response formats, and required roles are defined by the backend implementation.

## Getting Started

### Prerequisites

Install the following before running the application locally:

- Node.js and npm
- PostgreSQL, either locally or through a managed provider such as Neon
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/AmrMod/client-management-system.git
cd client-management-system
```

The following setup instructions assume the repository contains separate `backend` and `frontend` directories.

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the required environment variables described below.

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply existing database migrations to your development database:

```bash
npx prisma migrate deploy
```

For local development, when you need to create a new migration after changing the Prisma schema, use:

```bash
npx prisma migrate dev --name describe_your_change
```

Start the backend:

```bash
node server.js
```

### 3. Set Up the Frontend

Open another terminal and navigate to the frontend directory from the repository root:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

**Important:** The backend must be configured to allow the local frontend origin through CORS. Because authentication uses cookies, frontend requests must also include credentials.

## Environment Variables

### Backend

Create `backend/.env` with the appropriate values for your local environment.

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-long-random-secret"
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
PORT=3000
```

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string used by Prisma. |
| `JWT_SECRET` | Secret used to sign and verify JWTs. |
| `NODE_ENV` | Determines the application environment and environment-specific behaviour. |
| `FRONTEND_URL` | Allowed frontend origin used by the backend's CORS configuration. |
| `PORT` | Port on which the backend listens, where supported by the server configuration. |

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL="http://localhost:3000"
```

For the deployed frontend, configure this variable to point to the deployed backend API.

## Database and Migrations

Prisma provides the application's database access layer and schema management.

The relational data model includes entities for users, student profiles, staff profiles, support units, support requests, request attachments, conversations, messages, and notifications.

These entities support the relationships required to associate students with their requests, organize staff around support units, and maintain conversation history.

### Database Workflow

1. Update the Prisma schema when a data-model change is needed.
2. Create and review a migration in the development environment.
3. Regenerate Prisma Client when required.
4. Apply migrations to the intended database.
5. Test the affected services and API endpoints.

Production migrations should be applied deliberately. Always verify the target database before running commands that modify or reset database state.

## Testing

The backend uses Jest and Supertest for automated testing.

Tests can exercise API behaviour, including authentication, authorization, validation, and application responses, without requiring manual interaction with the browser.

From the backend directory, run the test suite using:

```bash
npm test
```

The test script is not configured in `package.json`:

```bash
npx jest --runInBand --setupFilesAfterEnv=./tests/setup.js
```

The `--runInBand` option runs tests serially in a single process. The setup file provides shared test initialization.

### Testing Principles

- Test successful requests and expected failure responses.
- Verify authentication and role restrictions.
- Check that users cannot access records belonging to other users.
- Test invalid inputs and missing required fields.
- Use a dedicated test database and test configuration.
- Avoid running destructive test or reset commands against production data.

Automated tests should be rerun after changes to authentication, authorization, database queries, and request-handling logic.

## Deployment

The deployed application uses separate services for the frontend, backend, and database.

| Component | Provider |
|---|---|
| Frontend | Vercel |
| Backend API and Socket.IO server | Render |
| PostgreSQL database | Neon |

### Deployment Flow

1. The frontend is built into static assets and deployed to Vercel.
2. The Express backend is deployed as a server application on Render.
3. The backend connects to PostgreSQL through the configured Neon connection string.
4. The frontend's `VITE_API_URL` points to the deployed backend.
5. The backend's `FRONTEND_URL` and CORS settings allow the deployed frontend origin.
6. HTTPS, cookie settings, and cross-origin credential handling must be configured consistently across the services.

### Production Configuration Checklist

- Configure all required environment variables in the hosting providers.
- Use a strong JWT secret and rotate exposed credentials.
- Apply database migrations safely.
- Ensure the backend allows only the intended frontend origins.
- Verify that authentication cookies are issued and sent correctly by the browser.
- Confirm that REST API requests and Socket.IO connections work in the deployed environment.
- Test protected routes and role-specific operations after deployment.
- Review logs and error responses for unexpected failures.

## Security Considerations

Security is an ongoing engineering responsibility rather than a one-time configuration step.

Important areas to review and maintain include:

- **Authentication:** Verify tokens on protected requests and handle expired or invalid sessions correctly.
- **Authorization:** Enforce permissions on the backend, not just in frontend navigation.
- **Object-level access:** Confirm that users can only access records and conversations they are authorized to view.
- **Cookie security:** Use appropriate `HttpOnly`, `Secure`, and `SameSite` settings for the deployment architecture.
- **CORS:** Allow only the required origins and configure credential support correctly.
- **Input validation:** Validate untrusted input before processing or persisting it.
- **File uploads:** Validate permitted file types and sizes, and ensure uploaded content is stored and served safely.
- **Real-time messaging:** Authenticate Socket.IO connections and verify conversation membership before allowing access to conversation rooms or messages.
- **HTTP security headers:** Review the deployed application using security-testing tools such as OWASP ZAP.
- **Secrets and database access:** Keep credentials out of source control and use appropriately restricted database access.

Security scans can identify potential weaknesses, but findings should be investigated and verified before being treated as confirmed vulnerabilities or resolved issues.

## Project Goals

This project demonstrates practical experience with:

- Building a full-stack application using React and Express.
- Designing and implementing REST APIs.
- Modelling relational data with PostgreSQL and Prisma.
- Implementing JWT authentication with HttpOnly cookies.
- Applying role-based access control and user-scoped data access.
- Implementing real-time communication with Socket.IO.
- Writing automated backend tests.
- Deploying a frontend, backend, and database across cloud platforms.
- Investigating application security and production configuration issues.
