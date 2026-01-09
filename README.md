# ENA — Everyday Navigator Assistant (First Home Savings) 🏠💬
<img width="1689" height="846" alt="image" src="https://github.com/user-attachments/assets/e03433c0-f145-492b-83f5-31cd1436b8e8" />


ENA (**E**veryday **N**avigator **A**ssistant) is a **context-aware chatbot** built to guide users through the confusing early stage of home buying—specifically **First Home Savings** decisions. Instead of making users jump between pages, calculators, and FAQs, ENA brings everything into one conversation: **clear explanations, next-step guidance, and tool-driven calculations (with consent).**

> **Designed for:** First-time buyers + savers planning their first home  
> **Goal:** Make “first home savings” feel simple, structured, and actionable.

---

## Why ENA for First Home Savings?

First-time home buyers usually struggle with:
- **Not knowing where to start** (save vs buy timeline)
- Confusion between **down payment**, **closing costs**, and **monthly affordability**
- Difficulty estimating **how much to save per month** to reach a target
- Overwhelm from too many options (loan types, eligibility, documents, steps)
- Fear of making a wrong decision due to unclear info

ENA was designed to solve these exact problems by acting like a **step-by-step home savings navigator** inside the banking experience.

<img width="1811" height="825" alt="image" src="https://github.com/user-attachments/assets/e222729e-9dbb-496f-8fd5-9af29f842d87" />


---

## What ENA Does

### ✅ 1) Turns “I want to buy a home” into a clear savings plan
ENA converts vague goals into structured steps:
- Target home price range
- Down payment goal (and options)
- Estimated closing costs
- Savings timeline + monthly savings estimate
- “What if” scenarios (income changes, timeline changes, rate changes)

### ✅ 2) Explains everything in beginner-friendly language
ENA is built for first-time buyers:
- Defines banking terms simply (APR, escrow, PMI, pre-approval, etc.)
- Gives short summaries first, then deeper detail on request
- Helps users understand trade-offs rather than pushing choices

### ✅ 3) Context-aware navigation (page + intent aware)
ENA understands what the user is currently viewing and responds accordingly:
- If user is on “First Home Savings” page → focuses on planning + saving
- If user is on mortgage calculator → focuses on affordability + payment drivers
- If user is on document/steps pages → provides checklists + timelines

### ✅ 4) Executes tasks (with consent)
ENA doesn’t just “tell” users what to do—it can **do it**:
- Extracts inputs from chat (home price, down payment, ZIP, credit tier)
- Prefills calculators (mortgage affordability / payment estimates)
- Runs calculations and summarizes results clearly
- Generates savings checklists and “next-step” guidance

### ✅ 5) Trust-first behavior
- Consent before running tools or navigating
- Shows the inputs it used (editable)
- Uses grounded responses and tool outputs
- Safe boundaries + human handoff when needed

---

## Two User Modes

### Mode 1 — Logged Out: **First Home Savings Navigator**
For public browsing:
- Understands “how much should I save?” questions
- Provides savings roadmaps + checklists
- Helps users explore options without requiring login

<img width="1862" height="811" alt="image" src="https://github.com/user-attachments/assets/9ee7c74d-da25-4c45-b328-70df099d7baa" />


### Mode 2 — Logged In (Opt-in): **Personalized Home Savings Companion**
For authenticated users:
- Can use user-provided financial context (income, expenses, existing savings)
- Suggests realistic monthly savings ranges
- Provides progress-style guidance (“you’re X months away at current pace”)
- Still maintains boundaries: education + estimates, not personal financial advice

<img width="1851" height="827" alt="image" src="https://github.com/user-attachments/assets/34edb614-c4e2-4799-8d3f-1c437c544c49" />


---

## How We Built It (Hackathon Prototype)

ENA was built as an **agentic AI assistant** with tool-calling + strong governance.

### High-level Architecture

1. **Web Chat Widget (UI)**
   - Floating assistant embedded in the first home savings journey
   - Text + optional voice input/output
   - Displays consent prompts and editable inputs

2. **Agent Orchestrator (LLM Brain)**
   - Prototype developed using **Google AI Studio**
   - Agent flow:
     - detect intent (save / plan / calculate / documents)
     - extract structured fields
     - choose tools
     - run tools with consent
     - summarize results clearly

3. **Knowledge Grounding (RAG / Content Grounding)**
   - Grounded using:
     - First Home Savings content + product/FAQ pages
     - Curated guardrails and disclaimers
   - Reduces hallucinations by prioritizing verified sources and tool results

4. **Tool Layer (Function Calling)**
   ENA can call tools like:
   - Savings plan estimator (monthly savings needed for goal + timeline)
   - Mortgage/affordability calculator runner
   - Closing-cost explainer + checklist generator
   - Next-step navigator (pre-approval, docs, timelines)
   - Summary generator (“what this means for you”)

5. **Safety + Governance**
   - Consent gates
   - PII minimization / masking
   - Audit-friendly transparency: what inputs were used and why
   - Human handoff suggestions when needed

---

## Example User Journey (First Home Savings)

**User:** “I want to buy my first home in 2 years. I have $8k saved. I can save $600/month. What home price is realistic?”

ENA:
1. Clarifies goal + constraints (timeline, savings, flexibility)
2. Estimates down payment + closing cost targets
3. Offers: “Want me to run affordability estimate using a calculator?” → **Consent**
4. Summarizes:
   - realistic home price range
   - recommended monthly savings plan
   - next steps: credit check, pre-approval readiness, documents checklist
   - “what if” levers (add $100/month, extend timeline, adjust down payment)

---

## Demo Prompts

**Savings Planning**
- “I want to buy my first home in 18 months. How much should I save monthly?”
- “I have $12k saved—how close am I to a 10% down payment goal?”

**Affordability**
- “If I buy a $350k home, what would my monthly payment look like?”
- “What happens if I increase my down payment by $5k?”

**Beginner Questions**
- “What’s the difference between pre-qualification and pre-approval?”
- “Explain PMI like I’m new to this.”

---

## Roadmap
- Deeper page-level grounding for first home savings content
- Expanded tool coverage (more planning + progress tracking)
- Evaluation suite for tool accuracy + hallucination resistance
- Accessibility improvements (keyboard-first, captions, readable contrast)
- Enterprise governance (RBAC, audit logs, policy-as-code)

---

## Team
Built as part of the PNC hackathon project by **Team ENA**.

---

## Disclaimer
ENA is a prototype assistant created for demonstration purposes. Outputs are **informational estimates** based on user-provided inputs. For official product details, eligibility, and financial decisions, refer to official documentation or a qualified professional.


#Working Screenshots

<img width="1813" height="817" alt="image" src="https://github.com/user-attachments/assets/667437db-bf01-417d-bb40-e5efa0426085" />

<img width="1761" height="753" alt="image" src="https://github.com/user-attachments/assets/741ceb6e-4be1-4058-aec4-7a1f8e896f6a" />

<img width="1797" height="826" alt="image" src="https://github.com/user-attachments/assets/c767e44f-7877-4092-9312-204e644adfa9" />

<img width="776" height="420" alt="image" src="https://github.com/user-attachments/assets/68c2d187-f997-45cc-b5e2-5645f02b3904" />














































*Instructions*


<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DZiPfconO5ASVsPlz6m95ObNMSSBJJai

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
