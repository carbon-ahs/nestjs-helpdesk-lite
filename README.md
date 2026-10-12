# Tickets API — NestJS Learning Project

A small REST API built with [NestJS](https://nestjs.com/) as my **first complete NestJS project**. The goal was to learn
the **request lifecycle** (middleware → guards → interceptors → pipes → controller → service) and the basic building
blocks of a Nest application — **without** auth, a database, or any intermediate topics.

## What I Practiced

- Modules, Controllers, Services, and Providers
- Dependency Injection with `@Injectable()` and constructor injection
- DTOs with `class-validator` / `class-transformer`
- The NestJS **request lifecycle**:
    - **Middleware** — runs first, on every request
    - **Guards** — decide if a request is allowed
    - **Interceptors** — wrap the handler (before/after)
    - **Pipes** — validate & transform incoming data
    - **Exception Filters** — built-in error handling
- Custom decorators and metadata (`Reflector`)
- Interfaces & DTOs for typing
- In-memory data store (no DB — intentionally)

## Project Structure

```
src/
├── common/
│   ├── request-logger.middleware.ts     # logs every incoming request
│   └── response.interceptor.ts          # wraps responses in a uniform shape
│
├── tickets/
│   ├── dto/
│   │   ├── create-ticket.dto.ts
│   │   ├── filter-ticket-query.dto.ts
│   │   └── update-ticket.dto.ts
│   ├── guards/
│   │   └── staff.guard.ts               # simple role check (no real auth)
│   ├── ticket.interface.ts
│   ├── tickets.controller.ts
│   ├── tickets.service.ts
│   └── tickets.module.ts
│
├── app.module.ts
└── main.ts
```

## Request Lifecycle

For every incoming request, Nest runs:

```
Request
  → Middleware        (RequestLoggerMiddleware)
  → Guards            (StaffGuard — where applied)
  → Interceptors      (ResponseInterceptor — pre)
  → Pipes             (ValidationPipe — DTO validation)
  → Controller
  → Service
  → Interceptors      (ResponseInterceptor — post)
  → Response
```

## Endpoints

| Method | Route          | Description                           | Guard        |
|--------|----------------|---------------------------------------|--------------|
| GET    | `/tickets`     | List tickets (supports query filters) | —            |
| GET    | `/tickets/:id` | Get one ticket                        | —            |
| POST   | `/tickets`     | Create a ticket                       | `StaffGuard` |
| PATCH  | `/tickets/:id` | Update a ticket                       | `StaffGuard` |
| DELETE | `/tickets/:id` | Delete a ticket                       | `StaffGuard` |

> The `StaffGuard` is a learning stand-in for real auth. It checks a simple header/flag — no JWT or sessions.

## Getting Started

### Install

```bash
npm install
```

### Run

```bash
# development (watch mode)
npm run dev

# normal
npm run start

# production
npm run start:prod
```

Server runs at `http://localhost:3000` by default.

## Example Requests

**Create a ticket**

```bash
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Payment failed",
    "description": "Card payment fails at the checkout step.",
    "priority": "medium"
  }'
```

**List tickets with filters**

```bash
curl "http://localhost:3000/tickets?priority=medium&status=open"
```

**Update a ticket**

```bash
curl -X PATCH http://localhost:3000/tickets/2 \
  -H "Content-Type: application/json" \
  -d '{ "status": "closed" }'
```

## Response Shape

Because of `ResponseInterceptor`, every successful response is wrapped in a uniform envelope:

```json
{
  "success": true,
  "data": {
    "id": 2,
    "subject": "Payment failed",
    "description": "Card payment fails at the checkout step.",
    "priority": "medium",
    "status": "open",
    "createdAt": "2026-09-01T11:30:00.000Z"
  }
}
```

### Ticket Fields

| Field         | Type     | Notes                         |
|---------------|----------|-------------------------------|
| `id`          | `number` | Auto-incremented              |
| `subject`     | `string` | Short title of the issue      |
| `description` | `string` | Full description of the issue |
| `priority`    | `string` | `low` \| `medium` \| `high`   |
| `status`      | `string` | `open` \|  `closed`           |
| `createdAt`   | `string` | ISO 8601 timestamp            |

## Validation

DTOs use `class-validator`. `ValidationPipe` is enabled globally with:

- `whitelist: true` — strips unknown properties
- `forbidNonWhitelisted: true` — errors on unknown properties
- `transform: true` — turns plain objects into DTO instances

Invalid payloads return **400 Bad Request** with details.

## What's *Not* Here (on purpose)

- No database (in-memory array)
- No authentication or real authorization
- No tests
- No Swagger / OpenAPI docs
- No config module, no Docker

These are the next topics I'll learn.

## Next Steps

- Add **TypeORM/Prisma** + Postgres
- Add **JWT auth** and real role-based guards
- Add **unit & e2e tests** (Jest + Supertest)
- Add **Swagger** docs
- Add **custom exception filters** and a proper logger

## Tech Stack

- NestJS 10+
- TypeScript
- class-validator / class-transformer
- Node.js

## Source

- yt: https://youtu.be/K20Ej3iKLpw?si=ya95nr0ySfjVs-Zn
- gh: https://github.com/learnwithsumit/nestjs-crash-course

## Used commands:

```
nest g module tickets
nest g controller tickets --no-spec
nest g service tickets --no-spec   
nest g interface tickets/ticket --flat

nest g class tickets/dto/create-ticket.dto --no-spec --flat
nest g class tickets/dto/filter-ticket-query.dto --no-spec --flat
nest g class tickets/dto/update-ticket.dto --no-spec --flat
nest g middleware common/request-logger --no-spec --flat
nest g guard tickets/guards/staff --no-spec --flat
nest g interceptor common/response --no-spec --flat


npm install class-validator class-transformer
```
