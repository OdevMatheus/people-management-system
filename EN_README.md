# People Management System

Portuguese version: [README.md](README.md)

Note: This project was built as a full stack portfolio to demonstrate REST API practices and modern UI, with a fully containerized environment.

PeopleManagementAPI is a complete people registration application with a React frontend and a Node.js/Express backend, focused on a simple CRUD flow, automatic database initialization, and data reset for testing. The goal is to serve as a reference for interviews and integration studies.

## Table of contents
- [Tech stack](#tech-stack)
- [Architecture and implementation](#architecture-and-implementation)
- [Quick test guide](#quick-test-guide)
- [API documentation](#api-documentation)
- [Simplified project structure](#simplified-project-structure)
- [Environment configuration](#environment-configuration)
- [Main endpoints for validation](#main-endpoints-for-validation)
- [Implementation decisions](#implementation-decisions)
- [Author](#author)
- [Contact](#contact)

## Tech stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Language | JavaScript (ES Modules) | Base for frontend and backend. |
| Frontend | React 19 + Styled Components | Modern, responsive UI focused on UX. |
| Backend | Node.js + Express | REST API and route orchestration. |
| Persistence | MySQL 8 | Containerized relational database. |
| HTTP Client | Axios | API consumption in the frontend. |
| Infrastructure | Docker + Docker Compose | Reproducible environment for testing and deploy. |

## Architecture and implementation

### Main layers

- **Controllers**: handle HTTP input rules.
- **Routes**: organize and expose CRUD endpoints.
- **Config/DB**: manages connection and database initialization.
- **Frontend**: UI, state, and API consumption.

### Automatic database initialization

On backend startup, the system creates the database (if missing), creates the `usuarios` table and, by default, clears the data for fast testing (`RESET_DB_ON_START=true`). This simulates a "ddl-auto" experience and keeps the environment ready for demos.

### Portfolio-oriented UX

The frontend is built as an API showcase: it presents project context, key endpoints, and a live demo flow with real-time feedback (toast and indicators).

## Quick test guide

### 1. Start the environment

```powershell
docker compose up --build
```

### 2. Access the application

- Frontend: http://localhost:3000
- Backend: http://localhost:8800

### 3. Full database reset (optional)

```powershell
docker compose down -v
```

## API documentation

The API follows the REST pattern and uses JSON.

Base URL:

```text
http://localhost:8800/users
```

## Simplified project structure

```text
people-management-system
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── routes
│   │   └── validators
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   └── styles
│   └── Dockerfile
└── docker-compose.yml
```

## Environment configuration

### Main variables

Variables are configured in `docker-compose.yml`.

Backend:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `RESET_DB_ON_START` (default: `true`)

Frontend:

- `REACT_APP_API_URL` (set at container build time)

## Main endpoints for validation

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/users` | List users. |
| POST | `/users` | Create user. |
| PUT | `/users/:id` | Update user. |
| DELETE | `/users/:id` | Remove user. |

### Expected payload

```json
{
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "fone": "11999990000",
  "data_nascimento": "1995-08-15"
}
```

## Implementation decisions

- Portfolio-oriented UI with context presentation and live CRUD demo.
- Automatic data reset to simplify interview testing.
- Database and table created from environment variables.
- Containerization to ensure fast, reproducible setup.

## Author

Matheus Henrique de Araujo.

## Contact

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-henrique-araujo/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OdevMatheus)

