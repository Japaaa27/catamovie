# CataMovie

## Overview

CataMovie is a movie catalog web application that allows users to browse, add, edit, and delete movies. Built with React (frontend), Express (backend), and PostgreSQL (database), the application provides a simple interface for managing a personal movie collection. Users can view movie details including title, year, genre, synopsis, rating, and poster images.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React** with TypeScript for UI components
- **Vite** as the build tool and development server
- **TanStack Query (React Query)** for server state management
- **Tailwind CSS** for styling with custom design tokens
- **Radix UI** components for accessible UI primitives

**Design Decisions:**
- Single-page application (SPA) architecture
- Component-based structure with TypeScript for type safety
- Client-side routing handled implicitly through React state
- Real-time data synchronization using React Query's automatic refetching
- Custom design system built on Tailwind with CSS variables for theming

### Backend Architecture

**Technology Stack:**
- **Express.js** server running on Node.js
- **TypeScript** for type-safe server code
- Separate development and production entry points (`index-dev.ts` and `index-prod.ts`)

**API Design:**
- RESTful API endpoints under `/api/movies`
- CRUD operations: GET (all/single), POST, PUT, DELETE
- Request validation using Zod schemas
- JSON-based request/response format

**Key Patterns:**
- Storage abstraction layer (`IStorage` interface) for database operations
- Automatic database seeding with sample movies on startup
- Centralized error handling and logging
- Development mode with HMR (Hot Module Replacement) via Vite middleware

### Data Layer

**Database:**
- **PostgreSQL** as the primary database (hosted on Neon)
- **Drizzle ORM** for type-safe database queries and schema management
- **@neondatabase/serverless** for serverless-compatible PostgreSQL connections

**Schema Design:**
- Single `movies` table with fields: id (UUID), title, year, genre, synopsis, rating, posterUrl
- UUID primary keys generated via PostgreSQL's `gen_random_uuid()`
- Validation constraints enforced at both schema and API levels

**Migration Strategy:**
- Schema-first approach using Drizzle Kit
- `drizzle.config.ts` defines database configuration
- `npm run db:push` command to sync schema changes to database

### Build and Deployment

**Development:**
- Vite dev server with HMR for frontend
- Express middleware mode integrating Vite for SSR-like development
- Environment variables loaded via dotenv
- Replit-specific plugins for enhanced developer experience

**Production:**
- Vite builds frontend to `dist/public`
- esbuild bundles backend to `dist/index.js`
- Static file serving from Express in production mode
- Single compiled artifact for deployment

**Rationale:**
- Dual entry points allow different optimizations for dev vs. prod
- Vite provides fast development experience with minimal configuration
- Express serves both API and static files, simplifying deployment

## External Dependencies

### Database Service
- **Neon PostgreSQL**: Serverless PostgreSQL database
- Connection via `DATABASE_URL` environment variable
- WebSocket-based connection using `@neondatabase/serverless` and `ws` package

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives including dialogs, dropdowns, accordions, tooltips, and form controls
- **Lucide React**: Icon library for consistent iconography

### Form and Validation
- **Zod**: TypeScript-first schema validation for both runtime and type inference
- **React Hook Form** with Zod resolvers for form state management
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation

### Styling and CSS
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS** with Autoprefixer for CSS processing
- **class-variance-authority** and **clsx**: Dynamic className utilities

### Development Tools
- **TypeScript**: Static typing for both frontend and backend
- **tsx**: TypeScript execution for development
- **Vite plugins**: Replit-specific plugins for error overlay, cartographer, and dev banner

### State Management
- **TanStack Query (React Query)**: Server state management, caching, and synchronization
- Eliminates need for global client state management

### Build Tools
- **esbuild**: Fast JavaScript bundler for production backend
- **Vite**: Frontend build tool and dev server
- **Drizzle Kit**: Database migration and schema management tool