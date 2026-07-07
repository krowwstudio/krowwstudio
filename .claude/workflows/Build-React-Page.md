---
name: Build-React-Page
description: Workflow for building a complete React page or feature section. Orchestrates researcher → planner → parallel (react-expert + tailwind-expert) → testing-engineer. Produces a fully implemented, tested, and accessible page.
---

# Build-React-Page Workflow

## Purpose
Design and build a complete React page or feature section with proper component structure, styling, state management, data fetching, and tests.

## When to Use
- Building a new page (e.g., Dashboard, Profile, Settings, Checkout)
- Building a complex feature section with multiple components
- Converting a design mockup or wireframe into working React

## Workflow Stages

```
Stage 1: Research (researcher)
         ↓
Stage 2: Component Planning (planner)
         ↓
Stage 3: Implementation [PARALLEL]
    ├── Component Logic (react-expert)
    └── Styling (tailwind-expert)
         ↓
Stage 4: Integration (frontend-engineer)
         ↓
Stage 5: Testing (testing-engineer)
```

## Orchestrator Prompt Template

```markdown
You are orchestrating the build of a new React page/section.

## Page Requirements
**Page Name**: [e.g., UserDashboard, ProductListing, CheckoutFlow]
**Route**: [e.g., /dashboard, /products, /checkout]
**What it does**: [Description of the page's purpose and user interactions]
**Data sources**: [API endpoints this page consumes]
**Design reference**: [Mockup description, design tokens, or component library in use]

---

## Stage 1 — Research
Spawn `researcher`:
> Research the frontend codebase to understand:
> 1. The routing system (React Router, Next.js, etc.) and how pages are registered
> 2. The state management approach (React Query, Redux, Zustand, Context, etc.)
> 3. The component library in use (shadcn/ui, Radix, MUI, etc.)
> 4. The styling approach (Tailwind config, CSS Modules, etc.)
> 5. 2-3 existing pages to use as structure references
> 6. The API client pattern (axios instance, fetch wrapper, tRPC, etc.)
> Return: file paths, patterns in use, existing components that can be reused.

## Stage 2 — Component Planning
Spawn `planner`:
> Create a component plan for [PAGE NAME] based on this research:
> [INSERT RESEARCHER OUTPUT]
> 
> Requirements:
> [FROM ORIGINAL REQUEST]
> 
> The plan must specify:
> - Component tree (which components exist, parent-child relationships)
> - State management approach for this page
> - Data fetching strategy (what hooks/queries are needed)
> - Which existing components to reuse vs build new
> - File paths for all new files

## Stage 3 — Implementation (Parallel)
Spawn `react-expert` and `tailwind-expert` simultaneously.

React Expert task:
> Implement the React components for [PAGE NAME] following this plan:
> [INSERT PLAN FROM STAGE 2]
> 
> Existing patterns to follow: [FROM RESEARCH]
> 
> Implement:
> - Page component with routing
> - All child components with props and state
> - Data fetching hooks
> - Loading and error states
> - Event handlers and mutations
> Use placeholder styling (basic Tailwind utility classes) — the tailwind-expert will handle detailed styling.

Tailwind Expert task (can run after react-expert completes basic structure, or provide styling spec):
> Apply production-quality Tailwind CSS styling to [PAGE NAME].
> Component plan: [INSERT PLAN]
> 
> Follow the existing design system:
> - Tailwind config at: [path from research]
> - Design reference: [design description]
> - Existing page to match style of: [example page path]
> 
> Ensure:
> - Responsive layout (mobile-first)
> - Dark mode support (if used in project)
> - Loading skeleton states
> - Hover/focus states for interactive elements
> - Accessible color contrast

## Stage 4 — Integration
Spawn `frontend-engineer`:
> Integrate the components built in Stage 3 into the application.
> 
> Files from Stage 3: [list]
> 
> Tasks:
> 1. Register the page route in [router file from research]
> 2. Connect the data fetching to the real API endpoints: [API endpoints]
> 3. Wire up any navigation links to/from this page
> 4. Verify the page works end-to-end (builds without errors, renders correctly)
> 5. Fix any import errors or missing props

## Stage 5 — Testing
Spawn `testing-engineer`:
> Write component tests for the [PAGE NAME] page.
> Files: [list from Stages 3-4]
> 
> Test:
> - Page renders without errors
> - Loading state displays while fetching
> - Error state displays when fetch fails
> - Key user interactions (clicks, form submissions, navigation)
> - Empty state when no data
> Follow test patterns from: [existing test files from research]
```

## Component Tree Template

```
[PageName]/
├── [PageName].tsx          # Page component (route entry point)
├── [PageName].test.tsx     # Page-level tests
├── components/
│   ├── [Widget].tsx        # Feature-specific child component
│   ├── [Widget].test.tsx
│   └── [List].tsx          # Another component
├── hooks/
│   └── use[DataName].ts    # Data fetching hook
└── index.ts                # Re-exports
```

## Output Summary Template

```markdown
# Page Built: [Page Name]

## Route
`[path]` → `[Page Component]`

## Component Tree
[Visual tree of components created]

## Files Created
[Complete list]

## Data Fetching
| Hook | Endpoint | Purpose |
|------|----------|---------|
| useUsers | GET /api/users | Loads user list |

## Reused Existing Components
[List components that were reused, not recreated]

## Test Results
[Test output]

## Manual Testing Checklist
- [ ] Page loads at [route]
- [ ] Loading state shows while fetching
- [ ] Error state shows when API fails
- [ ] [Key interaction] works
- [ ] Responsive on mobile
- [ ] Dark mode works (if applicable)
```
