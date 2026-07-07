---
name: Refactor
description: Workflow for safely refactoring existing code. Orchestrates repository-analyzer → architecture-reviewer → planner → engineer → testing-engineer. Ensures refactors are behavior-preserving and don't introduce regressions.
---

# Refactor Workflow

## Purpose
Safely improve the structure, readability, or design of existing code without changing its external behavior.

## When to Use
- Extracting reusable services or utilities from large files
- Reorganizing modules to improve separation of concerns
- Applying a consistent pattern across the codebase
- Paying down significant technical debt before adding new features

## Core Constraint

**A refactor must not change observable behavior.** Every refactor must be verifiable by the existing test suite. If tests don't exist, write them first before refactoring.

## Workflow Stages

```
Stage 1: Analysis (repository-analyzer + architecture-reviewer) [PARALLEL]
         ↓
Stage 2: Planning (planner)
         ↓
Stage 3: Test Coverage (testing-engineer) [if coverage is insufficient]
         ↓
Stage 4: Refactor Implementation (backend-engineer | frontend-engineer)
         ↓
Stage 5: Verification (testing-engineer)
```

## Orchestrator Prompt Template

```markdown
You are orchestrating a refactor of: [DESCRIBE WHAT'S BEING REFACTORED]

## Refactor Goal
[What problem does this refactor solve? What will be better after?]

## Scope
- In scope: [specific files, modules, or patterns]
- Out of scope: [what must NOT be changed]

---

## Stage 1 — Analysis (Parallel)
Spawn `repository-analyzer` and `architecture-reviewer` simultaneously.

Repository Analyzer task:
> Analyze the following files/modules that are being refactored:
> [List of files or directories in scope]
> Focus on: current structure, dependencies, what calls what, what is public vs internal.

Architecture Reviewer task:
> Review the following files for structural problems that the refactor should address:
> [List of files or directories]
> Identify: layering violations, coupling issues, responsibility imbalances.
> Report findings that the refactor should fix.

## Stage 2 — Planning
Spawn `planner` with both analysis outputs:
> Create a refactor plan for [goal] based on this analysis:
> 
> ## Current Structure Analysis
> [INSERT repository-analyzer OUTPUT]
> 
> ## Architecture Issues to Address  
> [INSERT architecture-reviewer OUTPUT]
> 
> Plan requirements:
> - List exact file changes (create, modify, delete, move)
> - Sequence steps so the codebase is never broken mid-refactor
> - Each step must keep existing tests passing
> - No new features — structure only

## Stage 3 — Test Coverage (conditional)
If the analysis reveals insufficient test coverage for the code being refactored:

Spawn `testing-engineer`:
> Write tests for the following code BEFORE it is refactored.
> These tests will serve as the safety net during refactoring.
> Files: [list]
> Test: all public interfaces and key behaviors.
> Goal: ensure the refactor doesn't break observable behavior.

## Stage 4 — Implementation
Spawn the appropriate engineer:
> Execute this refactor plan:
> [INSERT PLAN FROM STAGE 2]
> 
> CRITICAL REQUIREMENTS:
> - Run tests after each major step to confirm nothing is broken
> - If tests fail at any step, STOP and report rather than continuing
> - Do NOT add features or change behavior
> - Do NOT optimize for performance (separate concern)
> - Follow the plan exactly — do not improvise

## Stage 5 — Verification
Spawn `testing-engineer`:
> Verify the refactor is complete and correct:
> Files changed: [list from Stage 4]
> 
> 1. Run the full test suite
> 2. Report: all passing, any regressions, any new failures
> 3. Check that no public interface signatures changed unexpectedly
> 4. Check that no test was deleted or disabled during the refactor
```

## Refactor Safety Rules

The engineer implementing the refactor must follow these rules in order:

1. **Make it work the same** — behavior preservation above all
2. **Run tests after each file change** — catch regressions immediately
3. **Commit logically** — one logical change per commit (e.g., "extract UserService from UserController")
4. **Stop on red** — if tests fail, stop and report; do not push forward

## Output Template

```markdown
# Refactor Complete: [Name]

## What Changed
| Change Type | Files | Summary |
|-------------|-------|---------|
| Extracted | src/services/UserService.ts | Moved business logic from controller |
| Modified | src/controllers/UserController.ts | Now delegates to UserService |
| Deleted | — | No files deleted |

## Behavior Preserved
- All N existing tests pass
- No public API signatures changed
- No database queries modified

## Improvements Achieved
- [Specific architectural improvement]
- [Coupling/cohesion improvement]

## What Was NOT Changed (Out of Scope)
- [Anything explicitly excluded]
```
