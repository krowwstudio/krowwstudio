# Prompting for Multi-Agent Systems

## The Anatomy of an Effective Agent Prompt

Every agent prompt has five parts:

```
1. ROLE        — who the agent is and what it specializes in
2. CONTEXT     — relevant background the agent needs
3. TASK        — exactly what it must do
4. CONSTRAINTS — what it must not do
5. OUTPUT      — the exact format it must return
```

Never omit any part. Missing role → generic output. Missing constraints → agents over-reach. Missing output format → unparseable results.

## Role Definition

Be specific. "You are an engineer" produces worse output than "You are a senior TypeScript engineer specializing in NestJS REST APIs."

**Weak:** `You are a developer. Fix the bug.`

**Strong:** `You are a senior backend engineer specializing in Express.js and PostgreSQL. You write clean, typed TypeScript and never bypass error handling. You are investigating a bug in the user authentication flow.`

## Task Specification

Use numbered steps for multi-step tasks. Never assume the agent will infer the right sequence.

**Weak:** `Implement user authentication.`

**Strong:**
```markdown
1. Read src/routes/auth.ts to understand the existing route structure
2. Read src/services/auth.service.ts to understand the service layer
3. Implement the refreshToken endpoint at POST /auth/refresh following the exact pattern used by the login endpoint
4. Add input validation using the existing zod schemas in src/schemas/auth.ts
5. Write a unit test in src/routes/__tests__/auth.test.ts for the new endpoint
```

## Constraint Specification

Be explicit about what the agent must not do. This is as important as the task itself.

```markdown
CONSTRAINTS:
- Do NOT modify any existing tests
- Do NOT change the database schema
- Do NOT add new dependencies without listing them in your output for human review
- Do NOT refactor code outside of the files explicitly listed above
- Do NOT change TypeScript compiler settings
```

## Output Format Definition

Define the exact structure you expect. Include an example when the format is non-obvious.

```markdown
Return your output in this format:

## Files Modified
- `src/routes/auth.ts` — added POST /auth/refresh endpoint
- `src/routes/__tests__/auth.test.ts` — added 3 tests for refresh endpoint

## Decisions Made
- Used 15-minute token expiry to match existing access tokens

## Open Questions
- Should refresh tokens be stored in Redis or the database? (currently using database)

## Status
COMPLETE | PARTIAL | FAILED
```

## Context Injection Patterns

### File Reference (preferred)
```markdown
Read the service layer at src/services/user.service.ts before beginning.
The relevant section is around the createUser method (approximately lines 45-80).
```

### Inline Excerpt (when file is large and only a section matters)
```markdown
The existing error handling pattern is:
```typescript
if (!user) {
  throw new AppError('User not found', 404);
}
```
Follow this exact pattern for all new error cases.
```

### Prior Agent Output
```markdown
The researcher agent found the following relevant files:
- src/models/User.ts — User model with auth fields
- src/middleware/auth.ts — JWT verification middleware
- src/config/auth.config.ts — Token expiry configuration

Use this as your starting point.
```

## Tone and Specificity

| Principle | Example |
|-----------|---------|
| Use imperative mood | "Read the file" not "You should read the file" |
| Be quantitative | "Write 3 unit tests" not "write some tests" |
| Name exact paths | "src/services/user.service.ts" not "the user service" |
| Specify the pattern | "Follow the pattern in routes/products.ts" |
| Define done | "Task is complete when all tests pass" |

## Common Prompting Mistakes

- **Ambiguous scope** — "update the user module" (which files? which behavior?)
- **Missing constraints** — agent refactors everything it touches
- **No output format** — orchestrator cannot parse the result
- **Vague role** — agent applies generic rather than specialized reasoning
- **Context overload** — pasting 50 files when only 3 are relevant
- **Missing success criteria** — agent doesn't know when it's done
