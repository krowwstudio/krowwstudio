---
name: Bug-Fix
description: Workflow for investigating and fixing a bug. Orchestrates bug-investigator → appropriate engineer → testing-engineer → security-reviewer (if auth/data bug).
---

# Bug-Fix Workflow

## Purpose
Systematically investigate a bug, find its root cause, implement a targeted fix, and verify it works without regressions.

## When to Use
- Production bug reports
- Test failures that need diagnosis
- Unexpected behavior reports
- Performance regression investigation

## Workflow Stages

```
Stage 1: Investigation (bug-investigator)
         ↓
Stage 2: Fix (backend-engineer | frontend-engineer | database-engineer)
         ↓
Stage 3: Regression Testing (testing-engineer)
         ↓
Stage 4: Security Check (security-reviewer) [only if auth/data bug]
```

## Orchestrator Prompt Template

```markdown
You are orchestrating the investigation and fix of a bug.

## Bug Report
**Description**: [What's happening]
**Expected**: [What should happen]
**Reproduction steps**:
1. [Step 1]
2. [Step 2]
3. [Observed error/behavior]

**Error message / stack trace** (if available):
```
[Paste error here]
```

**Environment**: [production | staging | local | all]
**When did it start?**: [after deploy X | always | intermittent]

---

## Stage 1 — Investigation
Spawn `bug-investigator`:
> Investigate the following bug:
> [FULL BUG REPORT ABOVE]
> 
> Produce a diagnosis document that identifies:
> 1. The root cause (file path and line number)
> 2. The full call chain leading to the bug
> 3. Why this is the root cause (evidence)
> 4. Recommended fix strategy
> Do NOT fix the bug — diagnose only.

## Stage 2 — Fix
After investigator completes, determine the appropriate engineer based on the root cause:
- Backend logic bug → `backend-engineer`
- Frontend/UI bug → `frontend-engineer`
- Database/query bug → `database-engineer`

Spawn the appropriate engineer:
> Fix the following bug based on this diagnosis:
> 
> ## Diagnosis
> [INSERT BUG INVESTIGATOR OUTPUT]
> 
> ## Fix Requirements
> - Make the minimal change that fixes the root cause
> - Do NOT refactor surrounding code
> - Do NOT change behavior beyond what's needed to fix the bug
> - Verify the fix compiles/runs after implementing

## Stage 3 — Testing
Spawn `testing-engineer`:
> Add tests that would have caught the following bug before it reached production:
> 
> ## Bug
> [Description]
> 
> ## Root Cause (from investigation)
> [Root cause summary]
> 
> ## Files Fixed
> [Files modified in Stage 2]
> 
> Requirements:
> - Add a regression test that fails before the fix and passes after
> - Check for similar patterns in nearby code and add tests for those too
> - Run the full test suite to confirm no regressions

## Stage 4 — Security Check (conditional)
If the bug involved authentication, authorization, data access, or user input handling, spawn `security-reviewer`:
> Review the fix applied to [files] for security implications.
> The bug was: [description]
> The fix was: [description from Stage 2]
> Check: does the fix introduce any new vulnerabilities? Does the root cause suggest a broader security pattern that needs checking elsewhere?

## Completion
Produce a final bug fix summary.
```

## Bug Fix Summary Template

```markdown
# Bug Fix: [Bug Title]

## Root Cause
[One sentence from the investigation]

## Fix Applied
**File**: `src/...`
**Change**: [What was changed and why]

## Regression Test Added
**File**: `src/.../__tests__/...`
**Test name**: "[test description]"

## Verification
- [ ] Fix compiles
- [ ] New regression test passes
- [ ] Full test suite passes
- [ ] Manual reproduction steps no longer reproduce the bug

## Related Areas to Monitor
[Any similar code that may have the same bug pattern]
```

## Escalation

If the `bug-investigator` cannot find the root cause:
1. Gather more reproduction information from the user
2. Add temporary logging around the suspected area
3. Re-run investigation with additional context
4. If still unresolved, escalate to human engineer with the investigation findings
