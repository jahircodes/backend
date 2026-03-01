# Modular Backend

Modular Express backend with auth and user domains, Prisma ORM, and JWT auth.

## Prerequisites

- Node.js 18+
- MySQL 8+ (or another Prisma-supported database)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy env template and adjust values (set `DATABASE_URL` to your MySQL connection string; URL-encode special characters in passwords, e.g. `$` → `%24`: `mysql://user:pa%24s@localhost:3306/app_db`):
   ```sh
   cp .env.example .env
   ```
3. Generate Prisma client and run migrations (schema lives at `prisma/schema.prisma`):
   ```sh
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## Scripts

- `npm run dev` – start with nodemon
- `npm start` – start in production mode
- `npm run lint` – lint source files
- `npm run format` – format source files
- `npm run prisma:*` – Prisma utilities (generate, migrate, studio)

## Project Structure

```
prisma/
   schema.prisma
   migrations/
src/
   app.js               # Express app wiring and routes
   server.js            # HTTP server bootstrap
   config/
      constants.js
      env.js
      logger.js
   database/
      prismaClient.js
   infrastructure/
      cache/
      queue/
   middlewares/
      auth.middleware.js
      error.middleware.js
      rateLimit.middleware.js
      rbac.middleware.js
      requestId.middleware.js
   modules/
      auth/
         auth.controller.js
         auth.repository.js
         auth.routes.js
         auth.service.js
         auth.validator.js
      user/
         user.controller.js
         user.repository.js
         user.routes.js
         user.service.js
         user.validator.js
   shared/
      ApiError.js
      BaseRepository.js
      BaseService.js
   utils/
      hash.js
      response.js
      retry.js
```

- Core routes: `/api` (welcome), `/api/auth/*`, `/api/users/*` (protected)
- Middlewares: request ID, rate limit, auth, RBAC, global error handler
- Utilities: response helpers, hashing, retry wrapper

## Notes

- Replace placeholder secrets in `.env` before running.
- No Redis or queueing components are included.

## Using as a template

- Keep `.env` out of git (already in `.gitignore`); share sanitized values via `.env.example` only.
- Create your MySQL database first (e.g., `app_db` or `ecommerce_db`), then set `DATABASE_URL` accordingly.
- After cloning for a new project: update secrets/DSNs, run `npm install`, then `npm run prisma:generate` and `npm run prisma:migrate -- --name init`.
