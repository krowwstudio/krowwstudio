# Parallelism in Multi-Agent Systems

## When to Parallelize

Parallelize when tasks are **independent** — that is, when neither task requires the output of the other to begin or complete.

**Good candidates for parallelism:**
- Backend implementation and frontend implementation of the same feature
- Writing unit tests and writing integration tests
- Reviewing security and reviewing performance
- Generating documentation while running tests

**Must be sequential:**
- Planning → Implementation (engineer needs the plan)
- Implementation → Testing (tester needs working code)
- Research → Design (designer needs research findings)

## Fan-Out Pattern

The orchestrator spawns N agents simultaneously, then waits for all to complete before synthesizing:

```
Orchestrator receives task
         │
    ┌────┼────┐
    ↓    ↓    ↓
Agent A  B   C   (all start simultaneously)
    │    │    │
    └────┼────┘
         ↓
   Orchestrator collects results
         ↓
   Synthesize & return
```

### Implementation Guidance

When writing an orchestrator that fans out:
1. Describe all parallel tasks in the orchestrator prompt
2. Explicitly note which tasks run in parallel vs sequentially
3. Define how conflicts are resolved if agents touch the same files
4. Specify the merge order if output order matters

## Conflict Prevention

Parallel agents writing to the same files create merge conflicts. Prevent this by:

**Domain partitioning** — each agent owns a distinct slice of the codebase:
- Agent A owns `src/features/auth/`
- Agent B owns `src/features/billing/`
- Agent C owns `src/features/notifications/`

**Interface-first** — define shared interfaces and types before spawning parallel agents. Both agents code against the interface, reducing coupling.

**Read-only for shared files** — if multiple agents need `package.json` or `tsconfig.json`, only one agent is allowed to write it. Others read it.

## Parallel Agent Prompt Template

When spawning parallel agents, give each agent a clear scope boundary:

```markdown
You are working in parallel with other agents on this codebase.

YOUR SCOPE:
- You own: src/features/auth/**
- You must NOT touch: src/features/billing/**, src/features/notifications/**
- Shared files you may READ but NOT WRITE: package.json, tsconfig.json, prisma/schema.prisma

If you need something from outside your scope, document it as an open question in your output rather than modifying those files.
```

## Collecting and Merging Results

After parallel agents complete, the orchestrator must:

1. **Check for file conflicts** — did two agents modify the same file?
2. **Check for interface mismatches** — do the types/APIs produced by each agent agree?
3. **Check for dependency conflicts** — did both agents add different versions of the same package?
4. **Synthesize a unified summary** — combine per-agent outputs into a coherent result

## Performance Gains

| Task Type | Sequential Time | Parallel Time | Speedup |
|-----------|----------------|---------------|---------|
| Backend + Frontend | 20 min | 11 min | ~1.8x |
| 4 independent modules | 40 min | 12 min | ~3.3x |
| Research (3 areas) | 15 min | 6 min | ~2.5x |

Speedup is bounded by the longest-running agent (Amdahl's Law). Ensure parallel tasks are roughly equal in complexity for maximum benefit.

## Anti-Patterns

- **False parallelism** — parallelizing tasks that share state without a conflict resolution strategy
- **Too many agents** — spawning 10+ agents for a small task; coordination overhead exceeds the benefit
- **Unequal task sizes** — one agent finishes in 2 minutes while another takes 20; the speedup is lost
- **Missing merge step** — collecting outputs without checking for conflicts produces broken code
