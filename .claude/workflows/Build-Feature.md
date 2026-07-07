---
name: Build-Feature
description: End-to-end workflow for building a new feature from scratch. Orchestrates researcher → planner → parallel implementation (backend + frontend) → testing → security review → documentation.
---

# Build-Feature Workflow

## Purpose
Orchestrate the complete lifecycle of building a new feature: from requirements research through implementation, testing, security review, and documentation.

## When to Use
- Adding a new user-facing feature
- Implementing a new business capability
- Building a new module or section of the application

## Workflow Stages

```
Stage 1: Research (researcher)
         ↓
Stage 2: Planning (planner)
         ↓
Stage 3: Implementation [PARALLEL]
    ├── Backend (backend-engineer)
    ├── Frontend (frontend-engineer)
    └── Database (database-engineer) [if schema changes needed]
         ↓
Stage 4: Testing (testing-engineer)
         ↓
Stage 5: Review [PARALLEL]
    ├── Security (security-reviewer)
    └── Architecture (architecture-reviewer)
         ↓
Stage 6: Documentation (documentation-writer)
```

## Orchestrator Prompt Template

```markdown
You are orchestrating the build of a new feature: [FEATURE NAME]

## Feature Description
[Detailed description of what needs to be built]

## Acceptance Criteria
- [Criterion 1]
- [Criterion 2]

## Stage 1 — Research
Spawn `researcher` with this task:
> Research the existing codebase to understand:
> 1. Where this feature should live in the codebase
> 2. What existing patterns to follow (auth, data access, component structure)
> 3. What existing components/services can be reused
> 4. What new models/tables may be needed
> Return a research report with: key files, patterns to follow, recommended approach.

## Stage 2 — Planning
After researcher completes, spawn `planner` with:
> Create an implementation plan for [FEATURE NAME] based on this research:
> [INSERT RESEARCHER OUTPUT]
> The plan must specify exact file paths, agent assignments, and task sequencing.

## Stage 3 — Implementation (Parallel)
After planner completes, spawn implementation agents simultaneously:

Spawn `database-engineer` (if schema changes needed):
> [Schema task from plan]

Spawn `backend-engineer`:
> [Backend task from plan — include researcher findings and plan details]

Spawn `frontend-engineer`:
> [Frontend task from plan — include researcher findings and plan details]

Wait for all implementation agents to complete before proceeding.

## Stage 4 — Testing
Spawn `testing-engineer`:
> Write comprehensive tests for the feature implemented in Stage 3.
> Files implemented: [list from Stage 3 output]
> Test: all happy paths, edge cases, error cases, auth requirements.

## Stage 5 — Review (Parallel)
Spawn `security-reviewer` and `architecture-reviewer` simultaneously:

Security reviewer:
> Review the following new files for security vulnerabilities:
> [list of files from Stage 3]

Architecture reviewer:
> Review the architectural quality of this implementation:
> [list of files from Stage 3]
> Does it follow the existing patterns? Are there structural concerns?

## Stage 6 — Documentation
Spawn `documentation-writer`:
> Document the new [FEATURE NAME] feature.
> Files implemented: [list from Stage 3]
> Write: API endpoint docs (if applicable), usage guide, and update README if needed.

## Completion Criteria
- All stages complete
- All tests pass
- No Critical or High security findings unresolved
- Documentation written
- Produce a final summary of everything built
```

## Handling Failures

| Stage | Failure | Recovery |
|-------|---------|---------|
| Research | Files not found | Correct paths, re-run researcher |
| Planning | Ambiguous requirements | Ask user for clarification before proceeding |
| Implementation | Compilation errors | Re-run engineer with specific error |
| Testing | Tests fail | Re-run engineer to fix failing behavior |
| Security | Critical finding | Block until engineer fixes; re-run security review |

## Output Summary Template

```markdown
# Feature Built: [Feature Name]

## Implementation
[List of all files created/modified]

## API Changes
[New endpoints or changed interfaces]

## Database Changes
[Schema changes and migrations]

## Test Coverage
[What was tested]

## Review Results
- Security: [PASS | ISSUES RESOLVED]
- Architecture: [PASS | RECOMMENDATIONS LOGGED]

## How to Test Manually
[Step-by-step to verify the feature works]
```
