---
name: AI-Workflow
description: Workflow for building AI/LLM-powered features. Orchestrates researcher → prompt-engineer → backend-engineer → integration-engineer → testing-engineer → security-reviewer. Covers RAG systems, AI agents, chatbots, and LLM-powered automations.
---

# AI-Workflow

## Purpose
Design and implement production-ready AI/LLM-powered features: chatbots, AI agents, RAG systems, content generation, classification pipelines, and intelligent automations.

## When to Use
- Adding an AI assistant or chatbot to the application
- Building a RAG (retrieval-augmented generation) pipeline
- Adding LLM-powered content generation, classification, or extraction
- Building an AI agent that takes actions on behalf of users
- Integrating any LLM API (Claude, OpenAI, Gemini) into the product

## Workflow Stages

```
Stage 1: Research (researcher)
         ↓
Stage 2: Prompt Design (prompt-engineer)   ← Human review checkpoint
         ↓
Stage 3: Integration Layer (integration-engineer)
         ↓
Stage 4: API & Business Logic (backend-engineer)
         ↓
Stage 5: Testing (testing-engineer)
         ↓
Stage 6: Security Review (security-reviewer)
```

> **Human Review Checkpoint at Stage 2**: System prompts and AI behavior should be reviewed before implementation, as they define how the AI will behave in production.

## Key Concepts

### Model Selection (as of 2025)
| Model | Use For | Speed | Cost |
|-------|---------|-------|------|
| claude-sonnet-4-6 | General-purpose, coding, complex reasoning | Fast | Medium |
| claude-haiku-4-5 | Simple classification, extraction, low-latency | Very fast | Low |
| claude-opus-4-8 | Most complex reasoning, highest accuracy needs | Slower | High |

Always use the `claude-sdk:` skill or official Anthropic documentation for current model IDs — never hardcode from memory.

### Architecture Patterns

**Direct LLM Call** (simplest)
```
User request → Backend → LLM API → Response
```

**RAG Pattern**
```
User query → Embedding → Vector DB search → Retrieved context + Query → LLM → Response
```

**AI Agent Pattern**
```
User request → Orchestrator LLM → Tool calls (search, DB, API) → LLM → Final response
```

**Streaming Pattern**
```
User request → Backend SSE/WebSocket → LLM stream → Progressive client updates
```

## Orchestrator Prompt Template

```markdown
You are orchestrating the build of an AI-powered feature.

## Feature Requirements
**AI Feature Name**: [e.g., Customer Support Chatbot, Document Summarizer, Code Review Bot]
**What it does**: [Description of the AI behavior]
**Inputs**: [What the user/system provides to the AI]
**Outputs**: [What the AI should produce]
**Model preference**: [claude-sonnet-4-6 | let prompt-engineer decide]
**Streaming required**: [yes | no]
**Context sources**: [database, documents, API data, none]
**Tool use required**: [yes — list tools | no]

---

## Stage 1 — Research
Spawn `researcher`:
> Research the codebase to understand:
> 1. The existing API integration pattern (how external APIs are called)
> 2. The existing auth and session system (for user context in AI calls)
> 3. Where AI-related code would logically live
> 4. Any existing LLM integrations to follow as patterns
> 5. The frontend streaming/SSE pattern if streaming is needed
> Return: relevant file paths, patterns, integration points.

## Stage 2 — Prompt Design  ⚠️ HUMAN REVIEW REQUIRED
Spawn `prompt-engineer`:
> Design the production prompt system for [AI FEATURE NAME].
> 
> Feature requirements:
> [FROM ORIGINAL REQUEST]
> 
> Design:
> 1. System prompt (persona, task, constraints, output format)
> 2. User message template with {{variables}}
> 3. Few-shot examples if needed
> 4. Edge case handling (off-topic, refusal, ambiguous input)
> 5. Token estimate and recommended model
> 6. Evals — how will we know if the prompts are working correctly?
> 
> Existing patterns from research: [INSERT RESEARCH]

⚠️ STOP HERE. Present the prompt design to the human for review.
AI behavior must be reviewed before implementation.

## Stage 3 — Integration Layer
After prompt approval, spawn `integration-engineer`:
> Build the LLM API integration layer for [AI FEATURE NAME].
> 
> Approved prompt design: [INSERT STAGE 2 OUTPUT]
> Integration patterns from research: [INSERT RESEARCH]
> 
> Build:
> 1. LLM client initialization and configuration (using Anthropic SDK)
> 2. The AI service class/module that wraps the LLM calls
> 3. Streaming support if required
> 4. Retry logic for transient errors (rate limits, timeouts)
> 5. Cost/token logging
> 6. Error handling for LLM-specific failures (content filtering, context limit)
> 
> Environment variables needed:
> - ANTHROPIC_API_KEY (or equivalent)
> 
> Do NOT implement business logic — that's Stage 4.

## Stage 4 — Business Logic & API
Spawn `backend-engineer`:
> Implement the business logic and API endpoint for [AI FEATURE NAME].
> 
> Integration layer from Stage 3: [list files]
> Approved prompts: [INSERT STAGE 2 OUTPUT]
> Existing API patterns: [INSERT RESEARCH]
> 
> Implement:
> 1. API endpoint (route handler) that accepts user input
> 2. Business logic: prepare context, call AI service, process response
> 3. Conversation history management (if multi-turn)
> 4. User input validation
> 5. Rate limiting per user (AI calls are expensive)
> 6. Response formatting

## Stage 5 — Testing
Spawn `testing-engineer`:
> Write tests for the AI feature.
> Files: [list from Stages 3-4]
> 
> Testing strategy for LLM features:
> - Mock the LLM API — never make real API calls in tests
> - Test the prompt construction (does the final prompt contain the right context?)
> - Test error handling (what happens when LLM returns error? rate limit? content filter?)
> - Test streaming handler (if applicable)
> - Test conversation history accumulation (if multi-turn)
> - Do NOT test the LLM's actual output quality — that's what evals are for

## Stage 6 — Security Review
Spawn `security-reviewer`:
> Security review of the AI feature.
> Files: [list from Stages 3-4]
> 
> AI-specific security concerns to check:
> - Prompt injection: can user input manipulate the system prompt or escape its constraints?
> - Data leakage: does the AI have access to data it shouldn't share with the user?
> - PII in prompts: is user PII being sent to the LLM provider? (check data processing agreement)
> - Cost abuse: can a user trigger unlimited LLM calls? (rate limiting check)
> - Output safety: is the AI output sanitized before rendering (XSS if rendered as HTML)?
```

## AI Feature Patterns

### Streaming Response (Server-Sent Events)
```typescript
// Backend: stream LLM output to client
app.get('/api/ai/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  
  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    messages: [{ role: 'user', content: req.query.message }],
    system: systemPrompt,
    max_tokens: 1024,
  });
  
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
    }
  }
  res.end();
});
```

### Structured Output
```typescript
// Use JSON mode or XML tags for reliable structured output
const systemPrompt = `
Extract the requested fields and return them as valid JSON.
Do not include any text outside the JSON object.
Schema: { "name": string, "email": string | null, "phone": string | null }
`;
```

### RAG Context Injection
```typescript
const userMessage = `
Context from knowledge base:
${retrievedChunks.map(c => c.content).join('\n\n---\n\n')}

User question:
${userQuery}
`;
```

## Output Summary Template

```markdown
# AI Feature Built: [Feature Name]

## Model Used
[Model ID and rationale]

## Prompts
- System prompt: [token count]
- User template: [token count]
- Avg cost per call: ~$[X]

## Files Created
[Complete list]

## API Endpoint
[Method + URL + description]

## Rate Limits Implemented
[Requests per user per minute/hour]

## Security Checks
- Prompt injection: [MITIGATED | REVIEW NEEDED]
- PII handling: [CONFIRMED COMPLIANT | REVIEW NEEDED]
- Cost controls: [rate limit details]

## Test Coverage
[What's tested, mock strategy]

## Eval Criteria
[How to measure prompt quality in production]
```
