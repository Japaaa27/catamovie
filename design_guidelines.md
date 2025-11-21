# CataMovie Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Netflix/IMDb-inspired)
**Rationale:** Movie catalogs are inherently visual and benefit from familiar browsing patterns. Drawing inspiration from Netflix's card-based layouts and IMDb's information density while maintaining simplicity.

**Core Principles:**
- Content-first: Movie posters and titles take center stage
- Efficient browsing: Quick scanning and discovery
- Clean interactions: Straightforward add/remove/search functionality

## Typography

**Font Family:** 
- Primary: 'Inter' or 'DM Sans' (Google Fonts) - clean, modern sans-serif
- Weights: 400 (regular), 600 (semi-bold), 700 (bold)

**Hierarchy:**
- Page titles: text-3xl md:text-4xl font-bold
- Movie titles: text-lg font-semibold
- Body text: text-base font-normal
- Labels/metadata: text-sm text-gray-600

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, and 12
- Component padding: p-4 or p-6
- Section gaps: gap-6 or gap-8
- Page margins: px-4 md:px-8 lg:px-12

**Container Strategy:**
- Main content: max-w-7xl mx-auto
- Forms: max-w-2xl mx-auto

## Core Components

### Header
- Simple navigation bar with logo "CataMovie"
- Search bar prominently placed (center or right)
- "Add Movie" button (primary action)
- Layout: flex justify-between items-center, h-16, sticky top-0

### Movie Grid
- Responsive grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
- Card-based layout showing poster + info
- Each card: aspect-ratio-[2/3] for poster, overlay with title on hover
- Delete button: Small, positioned absolute top-right of card

### Movie Card
- Poster image fills card (object-cover)
- Title overlay at bottom with semi-transparent background (backdrop-blur-sm bg-black/60)
- Metadata: Year, genre in text-xs below title
- Hover state: slight scale transform (scale-105) with transition

### Search Bar
- Prominent placement in header
- Full-width on mobile, fixed width (max-w-md) on desktop
- Rounded corners (rounded-full), border with focus state
- Clear search icon inside input

### Add Movie Form
- Modal or dedicated page
- Simple vertical form layout with space-y-4
- Fields: Title, Year, Genre (dropdown), Synopsis (textarea)
- Two-button footer: Cancel + Add (primary)
- Form inputs: rounded-lg borders, p-3 padding

### Empty State
- Centered message when no movies
- Icon + "No movies yet" text
- Primary CTA to add first movie
- min-h-[60vh] to prevent awkward small viewport

## Component Specifications

**Buttons:**
- Primary: rounded-lg px-6 py-2.5 font-semibold
- Secondary: rounded-lg px-4 py-2 border
- Icon buttons: rounded-full p-2 (for delete)

**Input Fields:**
- Standard: rounded-lg border px-4 py-2.5 w-full
- Focus: ring-2 ring-offset-1 outline-none
- Labels: block mb-2 text-sm font-medium

**Cards:**
- Border radius: rounded-lg
- Shadow on hover: shadow-lg transition-shadow
- No borders, rely on shadow for depth

## Images

**Movie Posters:**
- Aspect ratio: 2:3 (standard movie poster)
- Placeholder: Use gradient backgrounds with movie initial or generic film icon when no poster available
- Size: Responsive, fill card width
- Loading: object-cover to maintain aspect ratio

**Hero Section:** No traditional hero image needed - jump straight to catalog grid

## Layout Structure

1. **Header** (sticky, h-16, backdrop-blur for scroll effect)
2. **Main Content** (py-8 px-4)
   - Search results count (if searching)
   - Movie grid (gap-6)
3. **Footer** (simple, text-center, py-6, text-sm)

**Mobile-First Approach:**
- Single column on mobile (sm)
- 3 columns on tablet (md)
- 4-5 columns on desktop (lg/xl)
- Stack form inputs vertically on all viewports

## Interaction Patterns

- **Search:** Instant filter as user types
- **Add Movie:** Modal overlay with backdrop or slide-in panel
- **Delete:** Confirm dialog or simple click with visual feedback
- **No animations** beyond simple transitions (opacity, scale)

## Accessibility

- Alt text for all movie posters
- Keyboard navigation for all interactive elements
- Focus states clearly visible (ring utilities)
- ARIA labels for icon-only buttons
- Form labels properly associated with inputs