import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log("API route called");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { answers, choices, path } = req.body || {};

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({
      error: 'Invalid input: "answers" is required and must be an object',
    });
  }

  const prompt = `You are an expert Army career advisor and simulation designer. Your task is to create a final career summary and results page for a user based on their Army career journey.

User Profile:
- Do you plan to go to college: ${answers.q1 || "Not answered"}
- What kind of work interests you the most: ${answers.q2 || "Not answered"}
- Are you open to being deployed or stationed internationally: ${
    answers.q4 || "Not answered"
  }
- What kind of environment do you see yourself in: ${
    answers.q3 || "Not answered"
  }
- What are your personal goals: ${answers.q5 || "Not answered"}

User Choices During the Journey: ${choices ? JSON.stringify(choices) : "None"}

Career Path Milestones: ${path ? JSON.stringify(path) : "None"}

Generate a **final JSON object** with the following structure:
- id: string (e.g., "results-summary-1")
- description: Write a short, friendly **description** that highlights a few key points from the users simulated path and encourages them to explore more resources to begin a career in the Army.
- learnMoreResources: array of 3-5 objects, each containing:
  - id: string (e.g., "learnmore-1")
  - title: string (e.g., "Learn About Army Retirement Benefits")
  - shortDescription: string (1-2 sentences explaining the resource)
    - url: string (link to the resource for more information, ONLY from http://www.goarmy.com)")

**IMPORTANT Instructions:**
- **DO NOT** include any further "choices" — this is the final career summary.
- **DO NOT** output any extra commentary or explanation — just the pure JSON object.
- **DO NOT** use Markdown or code blocks — return raw JSON format only.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant generating final results from an Army career path.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log("Raw OpenAI response:", response.choices[0].message.content);
    const resultsInfo = JSON.parse(response.choices[0].message.content.trim());
    return res.status(200).json({ resultsInfo });
  } catch (error) {
    console.error("Error generating results info:", error);
    return res.status(500).json({ error: "Failed to generate results" });
  }
}
