import { GoogleGenAI, Type } from "@google/genai";
import type { XaiData, FinancialData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
You are "FinCoach AI", an expert financial advisor integrated into a small business financial dashboard. You have been provided with a real-time snapshot of the business's key financial data.

**Core Directives:**
1.  **Data is Primary:** Your advice MUST be grounded in the provided financial data. Always reference specific figures from the dashboard (e.g., "I see your monthly revenue is $45,000 and expenses are $35,000, resulting in a $10,000 net cash flow...") to build trust.
2.  **Be Specific and Actionable:** Do not give generic advice. Provide concrete, actionable steps. Instead of "manage expenses," analyze the expense breakdown and suggest specific areas for review, like "Your payroll at $20,000 is your largest expense. Have you considered optimizing scheduling?"
3.  **Forward-Looking:** Use the cash flow forecast data to inform your advice about the future. For example, "I notice a projected cash flow dip in January. Let's plan now to ensure you have enough reserves."
4.  **No Hallucinations:** Do not invent financial data or products. Your analysis is strictly limited to the data provided in the prompt.

**Example Scenario:**
*   **Provided Data:** Net Cash Flow: $10,000. Expense Breakdown: Payroll $20,000. Cash Flow Forecast: Dip in 3 months.
*   **User Query:** "Should I hire a new employee for $5,000/month?"
*   **A GOOD \`recommendation\` would be:** "Hiring a new employee for $5,000/month would reduce your net cash flow to $5,000. While your current cash reserves of $85,000 can support this, we should be cautious given the projected cash flow dip in 3 months. I recommend a 3-month contract-to-hire position to start, which gives us flexibility."
*   **The \`modelInputs\` should include:** 'Net Cash Flow: $10,000', 'Projected cash flow dip in Jan 2026', 'User query about $5,000/month hire'.

**Output Format:**
For EVERY response, you MUST follow this strict JSON format. Do not add any text, markdown, or any characters outside of the JSON structure.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        recommendation: {
            type: Type.STRING,
            description: "The core financial advice you are providing, directly referencing the user's provided financial data. This should be a clear, concise, and easy-to-understand string.",
        },
        confidenceScore: {
            type: Type.NUMBER,
            description: "A number between 0.0 and 1.0 representing your confidence in this recommendation based on the provided data. For example, 0.95.",
        },
        modelInputs: {
            type: Type.ARRAY,
            description: "A list of the key pieces of financial data and user queries you used. Be specific. For example: 'Monthly Revenue: $45,000' or 'Expense Breakdown: Payroll at 57%'.",
            items: {
                type: Type.STRING
            }
        },
        alternatives: {
            type: Type.ARRAY,
            description: "A list of 2-3 distinct alternative strategies or options the user could consider. For example: 'Delay the hire by one quarter to build more cash reserves.' or 'Explore part-time options to reduce the initial payroll impact.'",
            items: {
                type: Type.STRING
            }
        },
    },
    required: ["recommendation", "confidenceScore", "modelInputs", "alternatives"]
};

const formatFinancialDataForPrompt = (data: FinancialData): string => {
    const kpis = Object.values(data.kpis).map(k => `- ${k.title}: $${k.value.toLocaleString()}`).join('\n');
    const expenses = data.expenseBreakdown.map(e => `- ${e.name}: $${e.value.toLocaleString()}`).join('\n');
    const forecastSummary = `Forecast shows revenue peaking at $${Math.max(...data.cashFlowForecast.map(m => m.revenue)).toLocaleString()} and expenses reaching a high of $${Math.max(...data.cashFlowForecast.map(m => m.expenses)).toLocaleString()}.`;

    return `
--- FINANCIAL DASHBOARD SNAPSHOT ---
Company: ${data.companyName}
Last Updated: ${data.lastUpdated}

Key Performance Indicators:
${kpis}

Current Month Expense Breakdown:
${expenses}

12-Month Forecast Summary:
${forecastSummary}
------------------------------------
`;
};


export const getFinancialAdvice = async (conversationHistory: string[], financialData: FinancialData): Promise<XaiData> => {
    try {
        const financialContext = formatFinancialDataForPrompt(financialData);
        const prompt = `${financialContext}\n\nConversation History:\n${conversationHistory.join('\n')}\n\nBased on the financial snapshot and the last user message, provide your specific, data-driven financial advice. Your response MUST be a JSON object adhering to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.4, 
            },
        });

        const jsonText = response.text.trim();
        const parsedData: XaiData = JSON.parse(jsonText);
        return parsedData;
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get financial advice from AI: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching financial advice.");
    }
};