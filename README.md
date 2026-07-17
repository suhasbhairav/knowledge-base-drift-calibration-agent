# Knowledge Base Drift Calibration Agent

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?style=for-the-badge&logo=react&logoColor=white)
![OpenAI Agents SDK](https://img.shields.io/badge/OpenAI-Agents_SDK-412991?style=for-the-badge&logo=openai&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Only-f7df1e?style=for-the-badge&logo=javascript&logoColor=111)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Detect stale knowledge, calibrate agent answers, and preserve trust in RAG systems.**

Built by **[Suhas Bhairav](https://suhasbhairav.com)** as part of **[AI Templates](https://suhasbhairav.com/ai-templates)**.

> A production-minded Next.js JavaScript starter that runs a two-agent OpenAI Agents SDK workflow on the server and presents the output in a polished responsive workbench.

## Template Links

| Destination | URL |
| --- | --- |
| AI Templates Hub | [https://suhasbhairav.com/ai-templates](https://suhasbhairav.com/ai-templates) |
| This Template Page | [https://suhasbhairav.com/ai-templates/knowledge-base-drift-calibration-agent](https://suhasbhairav.com/ai-templates/knowledge-base-drift-calibration-agent) |
| Creator | [https://suhasbhairav.com](https://suhasbhairav.com) |

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsuhasbhairav%2Fknowledge-base-drift-calibration-agent&env=OPENAI_API_KEY%2COPENAI_AGENT_MODEL&envDescription=Add+server-side+OpenAI+settings+for+this+AI+Templates+starter.&envLink=https%3A%2F%2Fgithub.com%2Fsuhasbhairav%2Fknowledge-base-drift-calibration-agent%23environment-variables)

The deploy flow asks for `OPENAI_API_KEY` and optionally `OPENAI_AGENT_MODEL`. Keep these values server-side only.

## Executive Overview

Knowledge Base Drift Calibration Agent is built for teams researching **knowledge base drift detection ai agent calibration**. It includes a domain-specific first-pass agent and a reviewer agent so the output is not just a chat response, but an operating plan with controls, implementation steps, and human approval points.

The app is intentionally simple to adapt: the frontend is a single responsive workbench, the workflow is isolated in `lib/agents/workflow.js`, and the API key never leaves the server route.

## Agents Included

| Agent | Responsibility |
| --- | --- |
| Drift Detection Analyst | Identifies policy, factual, ownership, and freshness drift across knowledge sources. |
| Calibration Remediation Agent | Creates calibration tests, update tickets, and answer quality guardrails. |

## Best-Fit Use Cases

- KB drift detection
- Agent calibration
- RAG QA
- Freshness reviews

## Search And Discovery Keywords

`knowledge base drift detection ai agent calibration` · `RAG calibration` · `knowledge drift agent` · `AI Templates` · `OpenAI Agents SDK starter` · `Next.js AI template`

## Architecture

```text
Browser workbench
   ↓
Next.js App Router page
   ↓
POST /api/agents/chat
   ↓
Drift Detection Analyst
   ↓
Calibration Remediation Agent
   ↓
Reviewed operating plan
```

## Project Structure

- `app/page.js` - responsive workbench UI
- `app/api/agents/chat/route.js` - server-side workflow endpoint
- `lib/agents/workflow.js` - OpenAI Agents SDK setup
- `app/globals.css` - theme and responsive layout
- `.env.example` - environment variable reference

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open the app:

```text
http://localhost:3000
```

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

## Environment Variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Yes | - | Server-side OpenAI API key. |
| `OPENAI_AGENT_MODEL` | No | `gpt-5-nano` | Model used by both agents. |

## API Surface

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/agents/chat` | `POST` | Runs the two-agent workflow for the submitted scenario. |

Example request:

```json
{
  "prompt": "Analyze our support knowledge base for drift after a product pricing change."
}
```

## Production Hardening Checklist

| Area | Recommended Upgrade |
| --- | --- |
| Authentication | Add Clerk, Auth.js, Supabase Auth, or your organization identity provider. |
| Authorization | Scope runs by user, team, tenant, and workspace. |
| Persistence | Store agent runs, reviewer decisions, and evidence artifacts. |
| Observability | Add structured logs, traces, latency metrics, and error capture. |
| Cost Controls | Add quotas, model allowlists, token budgets, and abuse monitoring. |
| Safety | Add input validation, output review, and approval gates for high-risk actions. |
| Evaluation | Save golden prompts and compare outputs before production changes. |

## Security Notes

- Never expose `OPENAI_API_KEY` in client components.
- Do not commit `.env.local`.
- Validate request bodies before calling model APIs.
- Add rate limits before public launch.
- Review prompts and logs for sensitive data before persistence.

## Verification

```bash
npm run lint
npm run build
```

## License

MIT. Use this starter freely, adapt it for your product, and keep creator attribution where appropriate.
