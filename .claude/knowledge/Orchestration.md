# Orchestration Patterns

## What Is an Orchestrator?

An orchestrator is an agent whose sole job is to break down a goal, assign work to specialist subagents, track progress, and integrate results. It does not write production code — it writes plans, delegates, and synthesizes.

## Writing an Effective Orchestrator Prompt

A well-structured orchestrator prompt contains:

1. **Goal statement** — what must be achieved
2. **Available agents** — which specialists exist and what they do
3. **Decomposition rules** — how to split the goal
4. **Output format** — how to return the final synthesized result
5. **Error handling rules** — what to do when a subagent fails

```markdown
You are an orchestrator for [goal].

Available agents:
- researcher: gathers information and requirements
- planner: creates a step-by-step implementation plan
- backend-engineer: implements server-side code
- frontend-engineer: implements client-side code
- testing-engineer: writes and runs tests

Process:
1. Spawn researcher to gather requirements
2. Spawn planner with researcher output
3. Spawn engineer agents in parallel per the plan
4. Spawn testing-engineer to validate output
5. Return summary of all changes made
```

## Delegation Contract

When delegating to a subagent, always specify:
- **What to do** — precise task, not a vague directive
- **What files to touch** — specific paths or glob patterns
- **What to return** — exact output format expected
- **Constraints** — what NOT to change, style rules, dependencies

```markdown
Task for backend-engineer:
- Implement POST /api/users endpoint in src/routes/users.ts
- Use the UserService class at src/services/UserService.ts
- Follow the pattern established in src/routes/products.ts
- Return: list of files modified with a one-line summary of each change
- Do not modify existing tests or the database schema
```

## Parallel vs Sequential

| When to use parallel | When to use sequential |
|----------------------|------------------------|
| Tasks are independent | Task B needs Task A's output |
| Same input, different domains | Pipeline processing |
| Speed is important | Order matters for correctness |

## Result Synthesis

After collecting subagent outputs, the orchestrator must:
1. Check each result for completeness
2. Resolve conflicts (e.g., two agents editing the same file)
3. Verify cross-cutting concerns (imports, type compatibility)
4. Produce a unified summary

## Orchestrator Anti-Patterns

- **God orchestrator** — tries to do implementation itself
- **Vague delegation** — "fix the bug" with no file paths or context
- **Over-decomposition** — spawning 10 agents for a 20-line change
- **Missing synthesis** — returning raw subagent dumps without integration
- **Context dumping** — passing full codebases to every agent

## Nested Orchestration

For very large tasks, an orchestrator can delegate to sub-orchestrators:

```
Root Orchestrator
├── Feature Orchestrator A
│   ├── Backend Engineer
│   └── Frontend Engineer
└── Feature Orchestrator B
    ├── Database Engineer
    └── API Designer
```

Keep nesting shallow (max 2-3 levels) to avoid coordination overhead.
