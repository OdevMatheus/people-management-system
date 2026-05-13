# Backend - People Management System

English version: [EN_README.md](EN_README.md)

## Endpoints

- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Payload esperado

```json
{
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "fone": "11999990000",
  "data_nascimento": "1995-08-15"
}
```

## Scripts

- `npm run dev`: inicia o servidor com nodemon
- `npm run check:validators`: valida regras de payload

## Variaveis de ambiente

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `RESET_DB_ON_START` (padrao: `true`)

A aplicacao cria o banco automaticamente caso ele nao exista, usando as variaveis acima.
