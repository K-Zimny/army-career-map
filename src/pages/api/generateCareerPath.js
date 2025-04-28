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

  const prompt = `You are an expert Army career advisor and simulation designer. Based on the user’s responses to five interest and career planning questions & their choices, your job is to create a realistic 20-year Army career path. You will generate one milestone at a time, with each milestone occurring every 5 years (Year 1, 5, 10, 15, and 20).
  
  User Preferences:
  - Do you plan to go to college: ${answers.q1 || "Not answered"}
  - What kind of work interests you the most: ${answers.q2 || "Not answered"}
  - Are you open to being deployed or stationed internationally: ${
    answers.q4 || "Not answered"
  }
  - What kind of environment do you see yourself in: ${
    answers.q3 || "Not answered"
  }
  - What are your personal goals: ${answers.q5 || "Not answered"}

    User Choices So Far: ${choices ? JSON.stringify(choices) : "None"}

    Career Path So Far: ${path ? JSON.stringify(path) : "None"}

    Generate the next milestone in the career path, including the user's likely career progression, financial growth, and achievements over time. Each milestone must include:
        - id: string (e.g. "custom-1")
        - year: number (starting at 1, then 5, 10, 15, 20)
        - age: number (starting around 18–22, increasing accordingly)
        - rank: string (e.g. “PVT”, “CPT”, “MAJ”)
        - currentSalary: current salary (e.g. 50000)
        - savings: total saved by that year
        - retirementAccount: estimated TSP balance
        - debt: student or personal debt
        - benefitValueToDate: cumulative military benefit value
        - benefits: {
            housing: number,
            food: number,
            healthcare: number,
            education: number,
            training: number
        }
        - description: Friendly & somwhat detailed summary of what happened during this stage. Here's an example: "Congratulations, you are joining the Army as an 11B, Infantryman! You are heading to Fort Benning, GA for Basic Combat Training and will remain there for Advanced Individual Training. You will learn to be a Soldier first, and then Infantry specialties like battle drills and warfighting skills. Once your training is complete, you are heading to your first duty station: Schoefield Barracks, Hawaii! You will be there for the next three years, training with your unit and preparing for future Army missions. You will be a Private First Class upon arrival in Hawaii, and will earn the rank of Sergeant by the time you are leaving, congrats, Sarge!"
        - achievements: array of key wins or life events (e.g. “Promoted to CPT”, “Bought a home”)
        - choices: [
          choice 1 object: Short, interesting & fun choice for the user to make at this milestone, with an id & brief description
          choice 2 object: Another short, interesting & fun for the user to make at this milestone, with an id & brief description
        ]
        }

        Special Instructions for Year 20 milestone: This milestone should not include any choices for the user to make, as it is the end of the career path. It should summarize the entire career and include a retirement plan, such as "You are retiring from the Army after 20 years of service. You have achieved the rank of LTC and have a TSP balance of $500,000. You will receive a pension of $3,000 per month and have saved $1 million for retirement. You are looking forward to spending time with family and pursuing new opportunities in civilian life."

        Output a realistic milestone in an Army career path that fits the above inputs, using officer or enlisted tracks as appropriate. Respond with **only valid JSON** as an object containing the next milestone, including the two choices. Do not include any additional text, explanations, or formatting. Do not use Markdown or code blocks.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are an assistant generating Army career paths.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log("Raw OpenAI response:", response.choices[0].message.content);
    const careerPath = JSON.parse(response.choices[0].message.content.trim());
    return res.status(200).json({ careerPath });
  } catch (error) {
    console.error("Error generating career path:", error);
    return res.status(500).json({ error: "Failed to generate career path" });
  }
}
