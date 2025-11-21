# CataMovie - Movie Catalog Application

## Overview

CataMovie is a simple, full-stack movie catalog application built with React, Express, and PostgreSQL. It allows users to browse, create, edit, and delete movie entries with details like title, year, genre, synopsis, rating, and poster images. The application features a clean, modern UI built with Tailwind CSS and Radix UI components, and uses Drizzle ORM for type-safe database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- TanStack Query (React Query) for server state management
- Tailwind CSS for styling with custom design tokens
- Radix UI for accessible component primitives

**Design Pattern:**
The frontend follows a single-page application (SPA) architecture with all UI logic contained in `client/src/main.tsx`. This monolithic approach was chosen for simplicity, making the codebase easy to understand and navigate for a small-scale application. The entire application state is managed through TanStack Query, eliminating the need for additional state management libraries.

**Component Structure:**
All components are defined inline within the main file rather than split into separate modules. This co-location pattern reduces file navigation overhead for a simple CRUD application, though it would need refactoring as the application grows.

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js
- TypeScript for type safety
- Drizzle ORM with Neon Serverless PostgreSQL
- Zod for runtime validation

**Server Configuration:**
The application uses a dual-mode server setup:
- `server/index-dev.ts`: Development mode with Vite middleware integration for HMR
- `server/index-prod.ts`: Production mode serving pre-built static assets

**Rationale:** This separation allows for optimal developer experience in development (hot module replacement, instant feedback) while maintaining production performance with pre-built assets.

**API Design:**
RESTful API endpoints follow standard conventions:
- `GET /api/movies` - List all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

The API uses a storage abstraction layer (`server/storage.ts`) that implements the `IStorage` interface, allowing for potential storage backend swapping without changing route logic.

### Database Architecture

**Database:** Neon Serverless PostgreSQL (managed cloud PostgreSQL)

**ORM:** Drizzle ORM was chosen for its lightweight nature, excellent TypeScript support, and SQL-like query builder that doesn't abstract away the database. This provides better learning opportunities and debugging capabilities compared to heavier ORMs.

**Schema Design:**
Single `movies` table with columns:
- `id` (UUID, auto-generated)
- `title` (text)
- `year` (integer)
- `genre` (text)
- `synopsis` (text)
- `rating` (real/float, 0-5 scale)
- `posterUrl` (text, optional)

**Validation Strategy:** 
Schema validation is shared between frontend and backend using Zod schemas in `shared/schema.ts`. Drizzle-Zod integration automatically generates insert/update schemas from the database schema, ensuring type safety across the stack.

### Configuration Management

**Environment Variables:**
The application uses dotenv for environment configuration. Critical configuration:
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)
- `HOST`: Server host (defaults to 127.0.0.1 for Windows compatibility)

**Windows Compatibility:**
Special considerations for Windows development:
- Host binding uses `127.0.0.1` instead of `0.0.0.0` 
- Removed `reusePort` option for compatibility
- dotenv explicitly imported in entry points (`db/index.ts`, `server/index-dev.ts`, `server/seed.ts`)

### Build System

**Vite Configuration:**
- Custom alias mapping (`@` for client, `@shared` for shared code)
- Separate development and production plugin configurations
- Replit-specific plugins conditionally loaded based on environment

**TypeScript Configuration:**
- Strict mode enabled for maximum type safety
- Path aliases matching Vite configuration
- ESNext module system with bundler resolution

**Tailwind Configuration:**
Custom design system with CSS variables for theming, supporting both light and dark modes through class-based switching.

## External Dependencies

### Third-Party Services

**Neon Database:**
- Serverless PostgreSQL hosting
- Connection pooling enabled via pooler URL
- WebSocket-based connections using `@neondatabase/serverless` and `ws` packages

### Key NPM Packages

**Frontend:**
- `@tanstack/react-query`: Server state management and caching
- `@radix-ui/*`: Accessible UI component primitives (22+ packages for dialog, dropdown, toast, etc.)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Type-safe component variants
- `cmdk`: Command palette component
- `lucide-react`: Icon library

**Backend:**
- `express`: Web server framework
- `drizzle-orm`: TypeScript ORM
- `drizzle-zod`: Zod schema generation from Drizzle schemas
- `zod`: Runtime type validation
- `dotenv`: Environment variable management

**Development:**
- `vite`: Build tool and dev server
- `tsx`: TypeScript execution
- `esbuild`: Backend bundling for production
- `@replit/*`: Replit-specific tooling (cartographer, dev banner, error overlay)

### API Integrations

**TMDB (The Movie Database):**
Poster images are served from `https://image.tmdb.org/t/p/w500/` CDN. The application stores full URLs rather than just image IDs, though this could be optimized by storing only the path and constructing URLs dynamically.

### Database Schema Management

**Drizzle Kit:**
Used for schema migrations and database pushing. Configuration in `drizzle.config.ts` points to PostgreSQL dialect with migrations stored in `./migrations` directory. The `npm run db:push` command synchronizes schema without creating migration files, suitable for development.