# Frontend - People Management System

English version: [EN_README.md](EN_README.md)

O frontend e uma vitrine de portfolio para demonstrar a API de cadastro de pessoas. Ele apresenta contexto do projeto, endpoints principais e uma area de demonstracao ao vivo com CRUD completo.

## Tecnologias

- React 19
- Styled Components
- Axios
- React Toastify

## Como executar

### Via Docker (recomendado)

```powershell
docker compose up --build
```

Acesse:

- http://localhost:3000

### Localmente (sem Docker)

```powershell
npm install
npm start
```

## Variaveis de ambiente

- `REACT_APP_API_URL` (ex: `http://localhost:8800/users`)

## Funcionalidades

- Cadastro, edicao e remocao de usuarios.
- Validacao de email e data de nascimento.
- Feedback visual com toast.
- Layout responsivo e orientado para portfolio.

