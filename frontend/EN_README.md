# Frontend - People Management System

Portuguese version: [README.md](README.md)

The frontend is a portfolio showcase for the People Management API. It presents project context, key endpoints, and a live demo area with full CRUD.

## Technologies

- React 19
- Styled Components
- Axios
- React Toastify

## How to run

### Via Docker (recommended)

```powershell
docker compose up --build
```

Access:

- http://localhost:3000

### Locally (without Docker)

```powershell
npm install
npm start
```

## Environment variables

- `REACT_APP_API_URL` (e.g. `http://localhost:8800/users`)

## Features

- Create, edit, and delete users.
- Email and birth date validation.
- Toast feedback.
- Responsive, portfolio-oriented layout.

