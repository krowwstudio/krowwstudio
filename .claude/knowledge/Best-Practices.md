# Best Practices for Multi-Agent Systems

## Agent Design

### Single Responsibility
Each agent does exactly one thing. A backend engineer writes backend code — it does not also design the schema, write tests, or create documentation. Specialization produces higher quality output and makes agents easier to reason about.

### Explicit Contracts
Define what each agent accepts (inputs) and what it must return (outputs) before building it. Treat these like function signatures. Never leave output format to interpretation.

### Idempotency
Design agents so they can be re-run safely. If an agent creates a file, it should overwrite cleanly. If it calls an external API, prefer read operations over writes when possible.

### Minimal Tool Access
Grant each agent only the tools it needs:
- Researchers get `Read, Glob, Grep, WebSearch, WebFetch`
- Engineers get `Read, Edit, Write, Bash, Glob, Grep`
- Reviewers get `Read, Glob, Grep` only

## Orchestration

### Decompose Before Delegating
The orchestrator must have a complete plan before spawning any subagents. Partial plans lead to coordination failures and wasted work.

### Verify Before Proceeding
After each major stage, verify the output meets requirements before moving to the next stage. Catching failures early is cheaper than propagating them.

### Prefer Parallel Over Sequential
When tasks are independent, run agents in parallel. Sequential pipelines are slower and failures block all downstream agents.

### Limit Delegation Depth
Keep orchestration hierarchies shallow (2-3 levels max). Deep hierarchies create coordination overhead and make failure diagnosis difficult.

## Prompting

### Be Precise About File Paths
Always specify exact file paths. "Update the user service" is ambiguous. "Update `src/services/user.service.ts`" is not.

### State Constraints Explicitly
Tell each agent what it must NOT change, as clearly as what it must change. This prevents agents from "helpfully" refactoring code they weren't asked to touch.

### Include Examples
When defining output format, include a concrete example. An agent that sees `[list files like this: "src/foo.ts — added GET /users endpoint"]` will produce cleaner output than one given only a description.

## Error Handling

### Validate Inputs Early
Check that required files exist and required context is present before starting work. Fail fast with a clear error message.

### Expect Partial Failures
Design workflows so a single agent failure doesn't invalidate all completed work. Checkpoint results after each stage.

### Structured Error Reporting
Agents should report failures in a parseable format:
```markdown
**Status**: FAILED
**Error**: Could not find UserService at src/services/user.service.ts
**Action required**: Confirm file path and re-run
```

## Quality

### Always Review Generated Code
Never ship agent-generated code without a human review pass. Use the `architecture-reviewer` or `security-reviewer` agents to catch issues before they reach production.

### Test What Agents Build
Pair every implementation agent with a testing agent. Untested agent output should not be merged.

### Audit Tool Calls
Agents can call destructive tools (`rm`, `git reset`, etc.). Review tool call logs for anything unexpected before accepting agent output.

## Performance

### Cache Research Results
If multiple agents need the same research (e.g., codebase overview), run the researcher once and pass its output to all consumers. Don't spawn redundant research agents.

### Right-size Agent Scope
An agent tasked with "implement the entire auth system" will produce worse output than three agents each handling a focused slice. Break tasks until each fits comfortably within a third of the context budget.
