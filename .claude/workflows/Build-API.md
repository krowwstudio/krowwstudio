---
name: Build-API
description: Workflow for designing and building a complete REST API. Orchestrates researcher → api-designer → database-engineer → backend-engineer → testing-engineer → security-reviewer → documentation-writer.
---

# Build-API Workflow

## Purpose
Design and implement a production-ready REST API from scratch, with proper contract design, database schema, implementation, tests, security review, and documentation.

## When to Use
- Building a new API resource (e.g., `/api/products`, `/api/orders`)
- Adding a new API module or service
- Building an API for a new third-party consumer

## Workflow Stages

```
Stage 1: Research (researcher)
         ↓
Stage 2: API Design (api-designer)   ← Human review checkpoint
         ↓
Stage 3: Database Design (database-engineer)
         ↓
Stage 4: Implementation (backend-engineer)
         ↓
Stage 5: Testing (testing-engineer)
         ↓
Stage 6: Security Review (security-reviewer)
         ↓
Stage 7: Documentation (documentation-writer)
```

> **Human Review Checkpoint at Stage 2**: The API contract should be reviewed and approved before implementation begins. Do not proceed to Stage 3 without confirmation.

## Orchestrator Prompt Template

```markdown
You are orchestrating the design and implementation of a new API.

## API Requirements
**Resource(s)**: [e.g., Products, Orders, UserProfiles]
**Operations needed**: [e.g., CRUD, plus search and bulk operations]
**Consumers**: [web app, mobile app, third-party partners]
**Auth requirement**: [JWT | API key | none]
**Special requirements**: [pagination, filtering, rate limiting, etc.]

---

## Stage 1 — Research
Spawn `researcher`:
> Research the existing codebase to understand:
> 1. The existing API patterns (URL structure, response envelope, error format, auth middleware)
> 2. The existing database schema and related models
> 3. The existing service layer pattern
> 4. The testing approach for existing API routes
> Return: key files to follow, patterns in use, relevant existing code.

## Stage 2 — API Design  ⚠️ HUMAN REVIEW REQUIRED
Spawn `api-designer`:
> Design the REST API contract for [RESOURCE NAME].
> 
> Requirements:
> [FROM ORIGINAL REQUEST]
> 
> Existing patterns to follow:
> [INSERT RESEARCHER OUTPUT — patterns, URL structure, response envelope]
> 
> Produce a complete API contract document including:
> - All endpoints with URL, method, auth requirement
> - Request body schemas with validation rules
> - Response body schemas
> - All error cases and status codes
> - Pagination approach for list endpoints

⚠️ STOP HERE. Present the API contract to the human for review.
Do not proceed to Stage 3 until the contract is approved.

## Stage 3 — Database Design
After API contract approval, spawn `database-engineer`:
> Design the database schema to support this API contract:
> [INSERT APPROVED API CONTRACT]
> 
> Existing schema location: [path to schema file]
> 
> Produce:
> - Schema additions/modifications (Prisma schema | SQL | TypeORM entities)
> - Migration file
> - Index design
> - Explain any denormalization decisions

## Stage 4 — Implementation
Spawn `backend-engineer`:
> Implement the approved API contract.
> 
> API Contract: [INSERT APPROVED CONTRACT]
> Database Schema: [INSERT Stage 3 output]
> Patterns to follow: [INSERT RESEARCHER FINDINGS]
> 
> Implement:
> - Route handlers at [path pattern from research]
> - Service methods at [path pattern from research]  
> - Input validation (DTOs/schemas)
> - Error handling following existing patterns
> - Do NOT implement tests — that's Stage 5

## Stage 5 — Testing
Spawn `testing-engineer`:
> Write a comprehensive test suite for the API implemented in Stage 4.
> Files implemented: [list from Stage 4]
> API Contract: [INSERT CONTRACT]
> 
> Write:
> - Integration tests for every endpoint
> - Test all success cases, validation errors, auth failures, and edge cases
> - Use the existing test patterns from: [path from research]

## Stage 6 — Security Review
Spawn `security-reviewer`:
> Security review of the new API:
> Files: [list from Stages 3-4]
> 
> Check specifically:
> - Auth enforcement on every endpoint that requires it
> - Input validation on all user-provided fields
> - IDOR vulnerabilities (can user A access user B's data?)
> - SQL injection if raw queries are used
> - Sensitive data in responses (passwords, tokens, internal IDs)

## Stage 7 — Documentation
Spawn `documentation-writer`:
> Write API reference documentation for the new API.
> API Contract: [INSERT CONTRACT]
> Files: [list from Stage 4]
> 
> Produce:
> - API reference in Markdown with curl examples for every endpoint
> - Add to existing API docs at [path] or create new file
```

## Output Summary Template

```markdown
# API Built: [Resource Name]

## Endpoints
| Method | URL | Auth | Purpose |
|--------|-----|------|---------|
| GET | /api/products | None | List products (paginated) |
| POST | /api/products | JWT | Create product |
| GET | /api/products/:id | None | Get single product |
| PATCH | /api/products/:id | JWT + admin | Update product |
| DELETE | /api/products/:id | JWT + admin | Delete product |

## Files Created
[Complete file list]

## Schema Changes
[Tables/columns added]

## Test Coverage
[What was tested, test count]

## Security: [PASS | ISSUES RESOLVED]

## Documentation: [Path to docs file]
```
