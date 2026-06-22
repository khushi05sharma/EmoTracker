import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getAIInsight(emotion, journalText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a supportive journal companion inside a mood tracking app.

The user selected this emotion: ${emotion}

Their journal entry for today:
"${journalText}"

Based on BOTH the emotion and what they wrote, respond with:
1. encouragement — a short, warm, specific message (1-2 sentences) that responds to what they actually wrote, not generic praise.
2. reflection — one sentence offering a thoughtful observation about their entry.
3. suggestion — one small, realistic action they could take tomorrow related to what they wrote.

Keep the tone natural and human, not robotic or overly cheerful.
Keep each field under 40 words.

Respond ONLY with valid JSON in exactly this format, with no extra text before or after:
{
  "encouragement": "...",
  "reflection": "...",
  "suggestion": "..."
}`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  const cleanedText = rawText.replace(/```json|```/g, "").trim();

  const parsed = JSON.parse(cleanedText);

  return parsed;
}
