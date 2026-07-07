# Agent Lifecycle

## Lifecycle Stages

Every agent passes through four stages:

```
INIT → WORKING → COMPLETE | FAILED
```

### 1. INIT
The agent receives its prompt, loads context, and validates that it has everything needed to begin. At this stage it should:
- Confirm required files exist (read key paths)
- Identify ambiguities in the task
- Outline its intended approach before beginning work

If initialization reveals a blocking problem (missing file, contradictory constraints), the agent should report FAILED immediately rather than proceeding on assumptions.

### 2. WORKING
The agent executes the task. It reads files, makes edits, runs commands, and iterates. Progress should be visible through tool call activity.

During work, agents must:
- Stay within their defined file scope
- Verify changes compile/run before reporting completion
- Track what they've changed for the output summary

### 3. COMPLETE
The agent produces a structured output report and halts. It does not take additional actions after reporting completion.

```markdown
## Status: COMPLETE

## Files Modified
- `src/api/users.ts` — added POST /users endpoint
- `src/api/__tests__/users.test.ts` — added 4 endpoint tests

## Decisions Made
- Used 201 status on creation (REST convention)

## Open Questions
- None
```

### 4. FAILED
The agent encountered a blocking problem it cannot resolve. It reports what it tried, why it failed, and what the orchestrator should do next.

```markdown
## Status: FAILED

## Error
Cannot locate UserRepository at src/repositories/user.repository.ts — file does not exist.

## What I tried
- Searched for UserRepository via Grep across src/
- Found reference to it in src/services/user.service.ts but file is absent

## Recommended Action
- Create UserRepository before re-running this agent, or correct the import path in user.service.ts
```

## Agent Initialization Checklist

Before starting implementation work, every agent should verify:

- [ ] All referenced files exist at stated paths
- [ ] The task description is unambiguous
- [ ] Required dependencies/imports are available
- [ ] Scope boundaries are clear (which files are in scope vs out of scope)
- [ ] Output format is understood

## Checkpointing

For long-running agents, checkpoint progress by writing partial results to files. This allows recovery if the agent hits the context limit before completing:

```markdown
# Pattern: write checkpoint after each major step
After completing step 1, write a summary to scratchpad/checkpoint-step1.md
After completing step 2, write a summary to scratchpad/checkpoint-step2.md
```

## Agent Teardown

When an agent completes or fails, it should:
1. Write its final status report
2. List all files it modified
3. List any side effects (processes started, APIs called, packages installed)
4. Clean up any temporary files it created

## Re-running Agents

Agents may need to be re-run after failures. Design agents to be idempotent:
- Writing a file should overwrite cleanly
- Creating a record should check if it already exists
- Installing a package should be a no-op if already installed

## Lifecycle in Orchestrated Systems

```
Orchestrator spawns Agent A
    Agent A: INIT → validates inputs
    Agent A: WORKING → implements task
    Agent A: COMPLETE → returns structured output
Orchestrator receives Agent A output
    Orchestrator validates output
    Orchestrator spawns Agent B with Agent A's output
    ...
```

The orchestrator is responsible for checking agent status before proceeding. A FAILED subagent must stop the pipeline unless the orchestrator has an explicit fallback strategy.
