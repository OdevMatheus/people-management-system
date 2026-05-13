# People Management System

English version: [EN_README.md](EN_README.md)

Nota: Este projeto foi desenvolvido como um portfolio full stack para demonstrar boas praticas de API REST e UI moderna, com ambiente totalmente containerizado.

A PeopleManagementAPI e uma aplicacao completa de cadastro de pessoas, com frontend React e backend Node.js/Express, focada em fluxo de CRUD simples, inicializacao automatica do banco e reset de dados para testes. O objetivo e servir como referencia para entrevistas e estudos de integracao entre camadas.

## Sumario
- [Stack tecnologica](#stack-tecnologica)
- [Arquitetura e implementacao](#arquitetura-e-implementacao)
- [Guia rapido de teste](#guia-rapido-de-teste)
- [Documentacao da API](#documentacao-da-api)
- [Estrutura simplificada do projeto](#estrutura-simplificada-do-projeto)
- [Configuracao de ambiente](#configuracao-de-ambiente)
- [Endpoints principais para validacao](#endpoints-principais-para-validacao)
- [Decisoes de implementacao](#decisoes-de-implementacao)
- [Autor](#autor)
- [Contato](#contato)

## Stack tecnologica

| Camada | Tecnologia | Finalidade |
| --- | --- | --- |
| Linguagem | JavaScript (ES Modules) | Base da aplicacao no frontend e backend. |
| Frontend | React 19 + Styled Components | Interface moderna e responsiva com foco em UX. |
| Backend | Node.js + Express | API RESTful e orquestracao de rotas. |
| Persistencia | MySQL 8 | Banco relacional containerizado. |
| HTTP Client | Axios | Consumo de API no frontend. |
| Infraestrutura | Docker + Docker Compose | Ambiente reproduzivel para testes e deploy. |

## Arquitetura e implementacao

### Camadas principais

- **Controllers**: concentram as regras de entrada HTTP.
- **Routes**: organizam e expõem os endpoints do CRUD.
- **Config/DB**: gerencia conexao e inicializacao do banco.
- **Frontend**: concentra interface, estado e consumo da API.

### Inicializacao automatica do banco

Ao subir o backend, o sistema cria o banco (se nao existir), cria a tabela `usuarios` e, por padrao, limpa os dados para facilitar testes (`RESET_DB_ON_START=true`). Esse comportamento simula uma experiencia "ddl-auto" e deixa o ambiente pronto para demonstracoes rapidas.

### UX para portfolio

O frontend foi pensado como uma vitrine de API: apresenta contexto do projeto, endpoints principais e um fluxo de demonstracao em tempo real com feedback visual (toast e indicadores).

## Guia rapido de teste

### 1. Subir o ambiente

```powershell
docker compose up --build
```

### 2. Acessar a aplicacao

- Frontend: http://localhost:3000
- Backend: http://localhost:8800

### 3. Reset total do banco (opcional)

```powershell
docker compose down -v
```

## Documentacao da API

A API segue padrao REST e utiliza JSON.

Base URL:

```text
http://localhost:8800/users
```

## Documentacao por modulo

- Frontend: [frontend/README.md](frontend/README.md)
- Backend: [backend/README.md](backend/README.md)

English versions:

- Frontend: [frontend/EN_README.md](frontend/EN_README.md)
- Backend: [backend/EN_README.md](backend/EN_README.md)

## Estrutura simplificada do projeto

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

## Configuracao de ambiente

### Variaveis principais

As variaveis sao configuradas no `docker-compose.yml`.

Backend:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `RESET_DB_ON_START` (padrao: `true`)

Frontend:

- `REACT_APP_API_URL` (definida no build do container)

## Endpoints principais para validacao

| Metodo | Endpoint | Finalidade |
| --- | --- | --- |
| GET | `/users` | Listar usuarios. |
| POST | `/users` | Criar usuario. |
| PUT | `/users/:id` | Atualizar usuario. |
| DELETE | `/users/:id` | Remover usuario. |

### Payload esperado

```json
{
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "fone": "11999990000",
  "data_nascimento": "1995-08-15"
}
```

## Decisoes de implementacao

- UI pensada para portfolio, com apresentacao de contexto e demonstracao ao vivo do CRUD.
- Reset automatico de dados para facilitar testes em entrevistas.
- Banco e tabela criados automaticamente a partir de variaveis de ambiente.
- Containerizacao para garantir reproducao rapida em qualquer maquina.

## Autor

Matheus Henrique de Araujo.

## Contato

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-henrique-araujo/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OdevMatheus)
