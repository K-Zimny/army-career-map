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
  - Do you want to work full-time or part-time: ${answers.q3 || "Not answered"}
  - What are your personal goals: ${answers.q4 || "Not answered"}

    User Choices So Far: ${choices ? JSON.stringify(choices) : "None"}

    Career Path So Far: ${path ? JSON.stringify(path) : "None"}

    Generate the next milestone in the career path, including the user's likely career progression, financial growth, and achievements over time. Each milestone must include:
        - id: string (e.g. "custom-1")
        - year: number (starting at 1, then 5, 10, 15, 20)
        - age: number (starting around 18–22, increasing accordingly)
        - rank: {
          shortTitle: string (e.g. "PVT")
          title: string (e.g. "Private")
          description: one-two sentence string describing rank (e.g. "The entry-level rank for enlisted Soldiers. Soldiers at this rank are new to the Army and are learning basic skills and duties.")
        }
        - currentSalary: current salary (e.g. 50000) Note: Make sure to use realistic salary figures for the rank and year, especially for part-time Army careers.
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
        - benefitInfo: choose one benefit from the mileestone to highlight, with the following. Special note for Milestone 5 (Year 20): This benefit should be about the user's pension and include the monthly value {
          title: short title describing a benefit specific to this milestone "e.g. ROTC, Tuition Assistance, Healthcare, etc."
          description: description of the benefit "e.g. 'You are receiving full tuition coverage for your college education through the ROTC program, which will help you graduate debt-free.'"
        }
        - description: 1-3 sentence friendly summary of what happened during this stage. You must include some detail about a personal goal the user has achieved based on their goals from ${
          answers.q5
        }, if provided.
        - achievements: array of key wins or life events (e.g. “Promoted to CPT”, “Bought a home”)
        - choices: [
          choice 1 object: Short, interesting & fun choice for the user to make at this milestone, with an id & brief description
          choice 2 object: Another short, interesting & fun for the user to make at this milestone, with an id & brief description
        ]
        }

        Special Instructions for Year 20 milestone: This milestone should not include any choices for the user to make, as it is the end of the career path. It should summarize the entire career and include a retirement plan

        Here is an example description for each milestone for a 20 year enslited career path:

        Year 1: "Welcome to the greatest fighting force on Earth! After enlisting and meeting the initial requirements, you headed to Fort Jackson, SC and completed Basic Combat Training. From there, you went to Fort Sill, OK to complete Advanced Individual Training (AIT) where you learned the skills needed to complete your job: Avenger Crewmember! You are now heading to your first duty station: Camp Humphreys, South Korea! During your training, you have promoted from a Private to a Private Second Class, and the Army is paying for all of your goods to ship to South Korea. You have been earning a check through every step of training, and it is time to get started on your Army career! Good luck, Soldier! "

        Year 5: "Over the last four years, you have promoted three times and have obtained the rank of Sergeant! You showed leadership skills while at Camp Humphreys, and requested Fort Bragg, NC as your next duty station. You have completed Basic Leaders Course, furthering your skills as an Army leader, and also successfully completed Airborne school en route to Fort Bragg! You are now qualified to complete Airborne missions anywhere in the world with your unit, and you are settling into your role as a Team Leader, in charge of a small team of Soldiers. As a Non-Commissioned Officer, you are part of the backbone of the Army, and your promotion to Staff Sergeant is just around the corner! "

        Year 10: "Congratulations, you recently promoted to Sergeant First Class! You are finishing up the Senior Leaders Course, which will prepare you to take over the enlisted leadership of an entire platoon- 35+ Soldiers! In the last five years, you were able to earn your Associate’s degree, which helped you gain promotion points on your way to Sergeant First Class. After spending time stateside, you and your family decide to request Platoon Sergeant position at Fort Vicenza, Italy! You, your spouse, and two kids will get to explore Italy for three years in free, on base housing. Take in the sights of Italy and Europe on holidays and weekends, and during the week continue your successful career with the Air Defense Artillery. "

        Year 15: "Congratulations on your promotion to First Sergeant! You are now the senior enlisted leader of an entire company, over 200 Soldiers. You will work hand in hand with the Company Commander, the senior Officer over the Company, to ensure the company is trained and ready for an upcoming deployment. The Company’s success on the deployment rests on the shoulders of your Soldiers, but as the 1SG you are more than ready to get them prepared. Your current duty station is Schoefield Barracks, HI, and your family is enjoying the sunshine and beaches. You are now a senior Army leader, and enlisted Soldiers of all ranks look to you for mentorship and guidance in their own careers. "

        Year 20: "Congratulations, Sergeant Major, you did it! You earned one of the highest enlisted ranks across the entire Army, and had a storied career. You have served the full 20 years in the Army, and can now retire with unmatched benefits. You will be eligible to receive half of your last year’s salary every month for the rest of your life, as well as healthcare for you, and your spouse can be added to the healthcare plan after they turn 60. You served honorably, and can now pursue whatever career on the civilian side appeals to you most. You leave the Army not only with a full pension and benefits, but also with  a unique skill set of defense and air defense, proven leadership of over 500 Soldiers, and a noble background that employers across the US seek out. Thank you for your service! Enjoy your next chapter. "

        Based on the above instructions, output a realistic milestone in an Army career path that fits the above inputs, using officer or enlisted tracks as appropriate. Respond with **only valid JSON** as an object containing the next milestone, including the two choices. Do not include any additional text, explanations, or formatting. Do not use Markdown or code blocks.`;

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
