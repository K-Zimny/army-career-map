import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { query } = req.body;

  console.log("Query received:", query);

  if (!query || typeof query !== "string") {
    console.error("Invalid query received:", query);
    return res.status(400).json({ error: "Query must be a non-empty string" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      tools: [{ type: "web_search_preview", search_context_size: "low" }],
      input: `
Using ONLY web search results from www.goarmy.com, create a short list of informational points related to the following Army career milestone: "${query}".

Each point should:
- Focus on a clear "topic" (a short headline for the idea).
- Provide a brief "information" paragraph (2-4 sentences) written in a friendly, clear, college-brochure style. 
  It should feel human and helpful, like the examples below:
  ---
  Example 1:
  Topic: ROTC Cadet
  Information: You are becoming an Army leader through Reserve Officers’ Training Corps (ROTC), which pays for your tuition while you go to college and train to become an Army Officer. It's offered at more than 1,000 colleges and universities.
  URL: https://www.goarmy.com/rotc

  Example 2:
  Topic: Part-Time Service
  Information: In college, Army ROTC classes normally involve one elective class and one lab per semester. Although the classes involve hands-on fieldwork as well as classroom work, they are standard college classes that fit into a normal academic schedule.
  URL: https://www.goarmy.com/rotc

Return ONLY valid JSON in this format:
[
  { "topic": "Topic 1", "information": "Informative paragraph 1", "url": "https://www.goarmy.com/page1" },
  { "topic": "Topic 2", "information": "Informative paragraph 2", "url": "https://www.goarmy.com/page2" }
]

Important rules:
- Only use information based on www.goarmy.com sources.
- Write clearly, no filler words like 'Here is' or 'Below you will find'.
- Keep information to less than 50 words.
- Do not include any url related text in the information property. Ex: Remove text like: ([goarmy.com](https://www.goarmy.com/benefits/veterans/retirement?utm_source=openai))
- Only output the JSON array. Do not include any commentary, explanations, or notes.
      `.trim(),
    });

    const outputText = response.output_text;
    console.log("Raw OpenAI response:", outputText);

    if (!outputText) {
      throw new Error("Failed to retrieve a valid response from OpenAI.");
    }

    let moreInfoData;
    try {
      const jsonMatch = outputText.match(/\[.*\]/s);
      if (jsonMatch) {
        moreInfoData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON array found in OpenAI response.");
      }

      console.log("Parsed response before filtering:", moreInfoData);

      moreInfoData = moreInfoData.filter(
        (item) => item.topic && item.information && item.url
      );

      console.log("Filtered More Information data:", moreInfoData);
    } catch (err) {
      console.error("Error parsing OpenAI response as JSON:", err.message);
      throw new Error(
        "OpenAI response was not valid JSON or had invalid structure."
      );
    }

    res.status(200).json({ result: moreInfoData });
  } catch (error) {
    console.error("Error during More Information generation:", error.message);
    res.status(500).json({
      error: "Failed to generate More Information",
      details: error.message,
    });
  }
}
