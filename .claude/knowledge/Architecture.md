# Multi-Agent Architecture

## Overview

Multi-agent systems in Claude Code distribute complex tasks across specialized agents orchestrated by a coordinator. Each agent operates within its own context window, enabling work that exceeds what a single context can hold.

## Core Patterns

### Orchestrator → Subagent
The orchestrator decomposes a goal into discrete tasks, delegates each to a specialized subagent, and synthesizes results. The orchestrator never does implementation work — it plans, delegates, and integrates.

```
Orchestrator
├── Researcher Agent      → returns findings
├── Planner Agent         → returns task plan
├── Backend Engineer      → implements server code
└── Frontend Engineer     → implements UI code
```

### Pipeline (Sequential)
Output of one agent feeds as input to the next. Use when each stage depends on the previous stage's result.

```
Researcher → Planner → Engineer → Reviewer → Tester
```

### Fan-Out / Fan-In (Parallel)
Orchestrator spawns multiple agents simultaneously, then collects and merges their outputs. Use for independent subtasks.

```
Orchestrator
├── Agent A (runs in parallel)
├── Agent B (runs in parallel)
└── Agent C (runs in parallel)
         ↓
    Orchestrator merges results
```

### Hierarchical
Orchestrators can themselves be subagents of a higher-level orchestrator. Enables deep decomposition of very large tasks.

## Agent Roles

| Role | Responsibility |
|------|----------------|
| Orchestrator | Decomposes goals, delegates tasks, synthesizes results |
| Specialist | Deep expertise in one domain (backend, frontend, DB, etc.) |
| Reviewer | Evaluates work quality, flags issues |
| Validator | Runs tests, checks constraints, confirms correctness |

## Context Isolation

Each agent starts with a fresh context window. Pass only what the agent needs — file paths, specifications, prior output excerpts. Never dump the entire codebase into an agent prompt.

## State Sharing

Agents do not share memory by default. Coordinate state through:
- **Files**: Write results to disk; next agent reads them
- **Structured output**: Return JSON/Markdown that the orchestrator parses
- **Scratchpad**: Temporary files for intermediate results

## Tool Access

Grant each agent only the tools it needs:
- Read-only agents: `Read, Glob, Grep, WebSearch, WebFetch`
- Implementation agents: `Read, Edit, Write, Bash, Glob, Grep`
- Infrastructure agents: `Bash, Read, Write`
- Review agents: `Read, Glob, Grep`

## Design Principles

1. **Single responsibility** — each agent does one thing well
2. **Minimal context** — pass only what the agent needs
3. **Explicit contracts** — define clear input/output formats
4. **Idempotency** — agents should be safe to re-run
5. **Fail fast** — validate inputs before starting long work
