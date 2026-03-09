# Task Management System

A full stack web application for creating, updating, tracking, and managing tasks through a responsive user interface and REST-based backend services.

**GitHub:** [github.com/tripurakaira/task-management-system](https://github.com/tripurakaira/task-management-system)

## Technologies Used

- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
- **Frontend:** React, Material UI, TypeScript, Vite
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Build:** Maven (backend), npm (frontend)
- **Version Control:** Git

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete (CRUD) tasks
- Filter tasks by status (Pending, In Progress, Completed)
- Set task priority (Low, Medium, High)
- Responsive UI built with Material UI
- RESTful API integration

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.6+

## Setup

### 1. Database

Create a MySQL database (or let the app create it):

```sql
CREATE DATABASE IF NOT EXISTS task_management_db;
```

Update `backend/src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

The API runs at `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies API requests to the backend.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT)

### Tasks (requires JWT)
- `GET /api/tasks` - Get all tasks (optional `?status=PENDING|IN_PROGRESS|COMPLETED`)
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Project Structure

```
task-management-system/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/taskmanagement/
│   │   ├── entity/          # User, Task entities
│   │   ├── dto/             # Request/Response DTOs
│   │   ├── repository/      # JPA repositories
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   ├── security/        # JWT & Spring Security
│   │   └── exception/       # Global exception handling
│   └── pom.xml
├── frontend/                # React app
│   ├── src/
│   │   ├── api/             # API client
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Login, Register, Dashboard
│   │   └── theme.ts
│   └── package.json
└── README.md
```

## License

MIT
