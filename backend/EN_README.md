# Backend - People Management System

Portuguese version: [README.md](README.md)

## Endpoints

- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Expected payload

```json
{
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "fone": "11999990000",
  "data_nascimento": "1995-08-15"
}
```

## Scripts

- `npm run dev`: start server with nodemon
- `npm run check:validators`: validate payload rules

## Environment variables

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `RESET_DB_ON_START` (default: `true`)

The application creates the database if it does not exist, using the variables above.

