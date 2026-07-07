# Context Engineering

## The Context Window Problem

Each Claude agent operates within a fixed context window (~200k tokens for Claude Sonnet). Large codebases, long conversations, and verbose tool outputs can exhaust this budget before the task is complete. Context engineering is the discipline of managing what goes into that window.

## Principles

### 1. Minimum Necessary Context
Pass only what the agent needs to complete its task. Before prompting an agent, ask:
- What files must it read to do its job?
- What prior decisions must it know about?
- What constraints apply?

Exclude everything else.

### 2. Summarize, Don't Copy
When passing prior agent output to the next agent, summarize rather than forward verbatim. A 2000-token summary of a 10,000-token output is nearly always sufficient.

### 3. Reference Over Inclusion
Instead of pasting file contents, give the agent a file path and instruct it to read what it needs. This defers token spend until the agent determines what it actually needs.

```markdown
# Instead of pasting the entire schema:
Read the database schema at prisma/schema.prisma and identify tables relevant to user authentication.

# Not:
Here is the entire schema: [10,000 tokens of schema]
```

### 4. Structured Handoffs
Define a standard handoff format between agents so outputs are compact and parseable:

```markdown
## Agent Output Format
- **Files modified**: [list with one-line descriptions]
- **Decisions made**: [key choices and their rationale]
- **Open questions**: [anything the next agent needs to resolve]
- **Constraints for downstream**: [what must not be changed]
```

### 5. Context Budget Allocation

| Context Budget | Use For |
|---------------|---------|
| 10-20% | System prompt + agent persona |
| 20-40% | Task description + relevant file excerpts |
| 20-30% | Tool call results |
| 10-20% | Response generation headroom |

## Techniques

### File Pointer Pattern
Give the agent a list of relevant file paths rather than file contents. The agent reads what it needs.

### Excerpt Pattern
When a specific function or section is relevant, include only that excerpt with line numbers for context.

### Summarization Chain
After each stage in a pipeline, run a summarization step that condenses the output before passing it forward.

### Progressive Disclosure
Start with high-level summaries; let the agent request details via tool calls if needed.

## Context Anti-Patterns

- **Full-repo dumps** — never `cat` an entire codebase into a prompt
- **Unfiltered tool output** — trim verbose bash/test output before including it
- **Conversation history replay** — don't paste the full conversation into each subagent
- **Redundant context** — including the same file twice in different formats
- **Stale context** — passing outdated state that conflicts with current reality

## Token Estimation Guidelines

| Content Type | Approximate Tokens |
|-------------|-------------------|
| 1 line of code | 5-15 tokens |
| 1 KB of source code | ~300 tokens |
| 1 KB of prose | ~250 tokens |
| Typical file (200 lines) | 1,000-3,000 tokens |
| Large file (1,000 lines) | 5,000-15,000 tokens |

Budget carefully — a 200k token context supports roughly 40-60 average source files.
