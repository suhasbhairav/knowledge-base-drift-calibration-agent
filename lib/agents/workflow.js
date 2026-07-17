import { Agent, run } from "@openai/agents";

const MODEL = process.env.OPENAI_AGENT_MODEL || "gpt-5-nano";

const workflowContext = {"title":"Knowledge Base Drift Calibration Agent","query":"knowledge base drift detection ai agent calibration","keywords":["knowledge base drift detection ai agent calibration","RAG calibration","knowledge drift agent"],"useCases":["KB drift detection","Agent calibration","RAG QA","Freshness reviews"]};

export const primaryAgent = new Agent({
  name: "Drift Detection Analyst",
  model: MODEL,
  instructions: `
You are Drift Detection Analyst for Knowledge Base Drift Calibration Agent.

Purpose:
- Identifies policy, factual, ownership, and freshness drift across knowledge sources.
- Work only within this domain: knowledge base drift detection ai agent calibration.
- Ask for missing facts only when they block a safe recommendation.
- Avoid claiming external browsing, private data access, or live system access.

Return with these exact headings:
Situation
Signals
Risks
Recommended Actions
Evidence To Capture
`.trim(),
});

export const reviewerAgent = new Agent({
  name: "Calibration Remediation Agent",
  model: MODEL,
  instructions: `
You are Calibration Remediation Agent for Knowledge Base Drift Calibration Agent.

Purpose:
- Creates calibration tests, update tickets, and answer quality guardrails.
- Review the first agent's work for gaps, unsafe assumptions, missing controls, and implementation clarity.
- Produce an operator-ready checklist that can be used by a product, operations, or engineering team.
- Keep the answer concise, concrete, and domain-specific.

Return with these exact headings:
Review Summary
Gaps Found
Control Checklist
Implementation Plan
Human Approval Points
`.trim(),
});

export async function runAgentWorkflow(prompt) {
  const cleanPrompt = String(prompt || "").trim();

  if (!cleanPrompt) {
    throw new Error("Prompt is required.");
  }

  const enrichedInput = `
Template: ${workflowContext.title}
Target query: ${workflowContext.query}
Discovery keywords: ${workflowContext.keywords.join(", ")}
Use cases: ${workflowContext.useCases.join(", ")}

User request:
${cleanPrompt}
`.trim();

  const primaryResult = await run(primaryAgent, enrichedInput);
  const primaryOutput = String(primaryResult.finalOutput || "").trim();

  const reviewerInput = `
Template: ${workflowContext.title}
Original user request:
${cleanPrompt}

First agent output:
${primaryOutput}

Review and convert this into a production-ready operating plan.
`.trim();

  const reviewerResult = await run(reviewerAgent, reviewerInput);
  const reviewerOutput = String(reviewerResult.finalOutput || "").trim();

  return {
    originalPrompt: cleanPrompt,
    model: MODEL,
    template: workflowContext,
    agents: [
      { name: primaryAgent.name, role: "Identifies policy, factual, ownership, and freshness drift across knowledge sources.", output: primaryOutput },
      { name: reviewerAgent.name, role: "Creates calibration tests, update tickets, and answer quality guardrails.", output: reviewerOutput },
    ],
  };
}
