# CataMovie - Movie Catalog Application

## Overview

CataMovie is a web-based movie catalog application that allows users to browse, add, and manage their personal movie collection. The application provides a Netflix/IMDb-inspired interface with a card-based layout for efficient browsing and discovery. Built as a full-stack TypeScript application, it features a React frontend with shadcn/ui components and an Express backend with PostgreSQL database storage.

## Recent Updates (November 21, 2025)

**Latest Changes:**
- Removed search bar (simplified interface per user request)
- Removed genre and year filters (all movies now always visible)
- Streamlined header to show only logo and "Add Movie" button

**Complete Feature Set:**

1. **PostgreSQL Persistence:**
   - Migrated from in-memory storage to PostgreSQL for persistent data storage
   - Updated storage layer to DbStorage using Drizzle ORM with Neon PostgreSQL
   - Pre-populated database with 6 sample movies from TMDB

2. **Star Rating System:**
   - Added rating field (0-5 stars) to movies schema
   - Created reusable StarRating component with interactive and read-only modes
   - Integrated star display in movie cards and edit/add forms
   - Visual feedback with filled/empty stars

3. **Movie Posters:**
   - Added posterUrl field to movies schema
   - Display poster images in movie cards with proper aspect ratio
   - Elegant gradient fallback for movies without posters
   - Optional posterUrl field in add/edit forms

4. **Edit Functionality:**
   - Implemented PUT /api/movies/:id endpoint for updating movies
   - Reused add movie dialog for editing with pre-populated fields
   - Added edit button to each movie card (visible on hover)
   - Fixed Select component to properly pre-populate genre on edit
   - Update mutation with cache invalidation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe UI development
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component Library:**
- shadcn/ui component system built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component configuration follows the "new-york" style preset
- Design system emphasizes content-first approach with Netflix-inspired card layouts

**State Management:**
- TanStack Query (React Query) for server state management
- Custom query client with specific caching strategies (staleTime: Infinity, no automatic refetching)
- Form state managed through react-hook-form with Zod validation

**Design Principles:**
- Responsive grid layout: 2-5 columns depending on screen size
- Card-based movie presentation with poster imagery and hover effects
- Interactive features: add, edit, delete (no search or filters)
- Star rating visualization with interactive editing
- Clean, minimalist interface showing all movies at once
- Typography hierarchy using DM Sans or Inter fonts
- Smooth animations and transitions for enhanced UX

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Separate development and production entry points (`index-dev.ts` and `index-prod.ts`)
- Custom logging middleware for API request tracking
- JSON request body parsing with raw body preservation for webhooks

**Development vs Production:**
- Development mode integrates Vite dev server as middleware for HMR
- Production mode serves pre-built static assets from dist/public
- Replit-specific plugins for development tooling (cartographer, dev-banner, runtime error overlay)

**API Design:**
- RESTful API endpoints under `/api` prefix
- CRUD operations for movies:
  - GET /api/movies - List all movies
  - GET /api/movies/:id - Get single movie
  - POST /api/movies - Create new movie
  - PUT /api/movies/:id - Update movie
  - DELETE /api/movies/:id - Delete movie
- Zod schema validation on incoming requests with user-friendly error messages

### Data Layer

**Database:**
- PostgreSQL configured through Drizzle ORM
- Connection via @neondatabase/serverless driver
- Database schema defined in shared/schema.ts for code sharing between client and server

**Schema Design:**
- Movies table with fields: id (UUID), title, year, genre, synopsis, rating (0-5), posterUrl
- Auto-generated UUIDs using PostgreSQL's gen_random_uuid()
- Validation constraints: year between 1888 and current year + 5, rating between 0 and 5

**Data Access Pattern:**
- Storage abstraction layer (IStorage interface) for flexibility
- DbStorage implementation using Drizzle ORM for PostgreSQL
- Seeded sample data in Portuguese for initial catalog population with ratings and poster images
- Database migrations managed through drizzle-kit using `npm run db:push`

**Validation:**
- Shared Zod schemas using drizzle-zod for type-safe validation
- Client and server use identical validation rules
- Portuguese language error messages for user-facing validation

### Project Structure

**Monorepo Layout:**
- `/client` - React frontend application
- `/server` - Express backend application  
- `/shared` - Shared TypeScript types and schemas
- Root-level configuration files for tooling

**Path Aliases:**
- `@/` → client/src/
- `@shared/` → shared/
- `@assets/` → attached_assets/

**Build Output:**
- Client builds to `dist/public`
- Server builds to `dist/index.js`
- Single production artifact combines both

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, etc.)
- **shadcn/ui**: Pre-configured component system built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for UI elements
- **class-variance-authority**: Utility for managing component variants
- **cmdk**: Command menu component

### Data & Forms
- **TanStack Query (React Query)**: Server state management with intelligent caching
- **react-hook-form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver (Neon database compatible)
- **drizzle-kit**: Database migration and schema management tool

### Development Tools
- **Vite**: Fast build tool and development server
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay for Replit
- **@replit/vite-plugin-cartographer**: Replit development tooling
- **@replit/vite-plugin-dev-banner**: Development mode indicator
- **tsx**: TypeScript execution engine for development

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **clsx & tailwind-merge**: Conditional className utilities
- **zod-validation-error**: User-friendly Zod error formatting

### Carousel & Media
- **embla-carousel-react**: Carousel/slider functionality

### Additional UI Enhancements
- **vaul**: Drawer component library
- **react-day-picker**: Calendar/date picker component
- **recharts**: Charting library for data visualization
- **input-otp**: OTP input component
- **react-resizable-panels**: Resizable panel layouts