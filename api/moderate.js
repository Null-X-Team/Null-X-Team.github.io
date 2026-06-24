export default async function handler(req, res) {
  // --- ADDED THIS TO FIX THE GITHUB PAGES CONNECTION ---
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // ------------------------------------------------------

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

  // 1. ADD LOCAL PROFANITY FILTER (To catch what OpenAI ignores)
  const badWords = [
    "fuck", "shit", "asshole", "bitch", "bastard", "cunt", "dick"
  ];
  
  const cleanText = text.toLowerCase();
  const containsSwear = badWords.some(word => {
    // Uses word boundaries so it doesn't accidentally trigger on words like "assess"
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(cleanText);
  });

  if (containsSwear) {
    flagged = true;
    reasons.push("profanity detected");
  }

  // 2. RUN OPENAI AI ADVANCED MODERATION PIPELINE
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

  // 3. RUN PII SAFETY REGEX CHECKS
  const phoneRegex = /\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  if (phoneRegex.test(text)) {
    flagged = true;
    reasons.push("phone number");
  }

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailRegex.test(text)) {
    flagged = true;
    reasons.push("email address");
  }

  const addressKeywords = /\b(\d+\s+[A-Za-z]+\s+(street|st|avenue|ave|road|rd|lane|ln|boulevard|blvd|drive|dr))\b/i;
  if (addressKeywords.test(text)) {
    flagged = true;
    reasons.push("address");
  }

  const namePatterns = /\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\b/g;
  const nameMatches = text.match(namePatterns) || [];
  if (nameMatches.length >= 1) {
    // Optional: Flip flagged to true here if you want to block full names completely
    // flagged = true;
    reasons.push("possible personal name");
  }

  // RETURN COMPLIANCE RESULTS
  return res.status(200).json({
    flagged,
    reason: flagged ? reasons.join(", ") : "Clean",
    message: flagged ? "Message blocked for safety" : "Message approved"
  });
}
