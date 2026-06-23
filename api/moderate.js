// api/moderate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "No text provided" });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  let flagged = false;
  let reasons = [];

  // 1. OpenAI Moderation (Toxicity, Hate, etc.)
  try {
    const modResponse = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        input: text,
        model: "omni-moderation-latest"
      })
    });

    const modData = await modResponse.json();
    const result = modData.results?.[0];

    if (result?.flagged) {
      flagged = true;
      reasons.push("inappropriate content");
    }
  } catch (err) {
    console.error("Moderation API error:", err);
  }

  // 2. Phone Number Detection
  const phoneRegex = /\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  if (phoneRegex.test(text)) {
    flagged = true;
    reasons.push("phone number");
  }

  // 3. Email Detection
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailRegex.test(text)) {
    flagged = true;
    reasons.push("email address");
  }

  // 4. Basic Address / Personal Info Detection
  const addressKeywords = /\b(\d+\s+[A-Za-z]+\s+(street|st|avenue|ave|road|rd|lane|ln|boulevard|blvd|drive|dr))\b/i;
  if (addressKeywords.test(text)) {
    flagged = true;
    reasons.push("address");
  }

  // 5. Full Name Detection (Heuristic)
  const namePatterns = /\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\b/g;
  const nameMatches = text.match(namePatterns) || [];
  if (nameMatches.length >= 1) {
    // OPTION A: If you want to strictly BLOCK names, uncomment the line below:
    // flagged = true; 
    reasons.push("possible personal name");
  }

  return res.status(200).json({
    flagged,
    // If flagged is true, send the reasons. Otherwise, return "Clean"
    reason: flagged ? reasons.join(", ") : "Clean",
    message: flagged ? "Message blocked for safety" : "Message approved"
  });
}
