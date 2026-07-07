# Failure Recovery

## Failure Categories

| Category | Description | Recovery Strategy |
|----------|-------------|------------------|
| **Input failure** | Required file missing, invalid context | Validate inputs; fail fast with clear message |
| **Tool failure** | Bash command fails, file write rejected | Retry once; report if still failing |
| **Logic failure** | Agent produces wrong output | Re-run with clearer constraints |
| **Context exhaustion** | Agent hits token limit mid-task | Break task into smaller subtasks |
| **Conflict** | Two agents modified the same file | Manual merge or re-run with partitioned scope |
| **Dependency failure** | Upstream agent failed | Halt downstream; recover upstream first |

## Fail-Fast Principle

Agents should detect and report failures as early as possible. An agent that discovers on step 1 that a required file is missing should fail immediately — not attempt workarounds that produce incorrect output which then propagates.

```markdown
## FAIL-FAST CHECKLIST (run before starting work)
1. Do all required files exist at stated paths?
2. Are all required environment variables / config values available?
3. Is the task description unambiguous?
4. Are the output format requirements clear?

If any check fails → report FAILED immediately with the specific blocker.
```

## Structured Failure Reports

When an agent fails, it must produce a structured report that the orchestrator can act on:

```markdown
## Status: FAILED

## Error Type
[INPUT_MISSING | TOOL_ERROR | LOGIC_ERROR | CONTEXT_LIMIT | CONFLICT]

## Description
[What went wrong, specifically. Include file paths, line numbers, exact error messages.]

## What Was Completed
[List any steps that completed successfully before the failure]

## What Was NOT Completed
[List remaining steps]

## Files Modified Before Failure
[List any files changed, even partially]

## Recommended Recovery
[Specific action the orchestrator should take to resolve this]
```

## Recovery Strategies

### Retry with Refinement
If an agent produced output that doesn't meet requirements, re-run it with:
- More specific constraints
- Corrected file paths
- A concrete example of the expected output
- Explicit note about what went wrong in the prior run

### Task Decomposition
If an agent failed due to scope overload or context exhaustion, break its task into smaller pieces and run them as separate agents.

### Fallback Agents
For critical steps, have an alternative agent definition with simpler scope that handles the most common failure case.

### Checkpoint Recovery
If an agent checkpointed its progress, re-run it starting from the last successful checkpoint rather than from scratch.

### Partial Acceptance
If an agent partially completed its task, accept the completed portions and create a new task for only the remaining work.

## Orchestrator Recovery Logic

```markdown
For each completed subagent:
  IF status == COMPLETE:
    validate output format
    proceed to next step
  IF status == PARTIAL:
    assess what was completed
    create follow-up task for remaining work
  IF status == FAILED:
    read error type
    IF error is recoverable: apply recovery strategy and re-run
    IF error is not recoverable: halt pipeline, report to user
```

## Conflict Resolution

When two parallel agents modify the same file:

1. **Identify the conflict** — diff both versions against the original
2. **Determine priority** — which agent's changes are primary?
3. **Merge manually or re-run** — spawn a merge agent with both versions and clear merge instructions
4. **Validate the merge** — run tests after merging

### Merge Agent Prompt Template
```markdown
Two agents modified the same file. Your job is to merge their changes correctly.

Original file: [path]
Agent A changes: [description or diff]
Agent B changes: [description or diff]

Rules:
- Agent A's changes to [section] take priority
- Agent B's changes to [section] take priority
- Both agents' additions should be preserved
- Resolve any conflicts in [section] by [rule]
```

## Preventing Failures

- Define explicit file scope per agent before spawning
- Validate all file paths exist before handing off
- Prefer read-then-write over in-place mutation
- Run lightweight validation (e.g., TypeScript compile) inside each agent before reporting COMPLETE
- Test agent prompts on simple cases before using them in complex orchestrations
