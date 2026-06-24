export default async function handler(req, res) {
  // CORS Configuration Header Elements
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "No text provided" });
  }

  // BACKEND CHARACTER LIMIT SANITIZATION
  if (text.length > 250) {
    return res.status(200).json({
      flagged: true,
      reason: "Message exceeds 250 characters",
      message: "Message blocked for safety"
    });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  let flagged = false;
  let reasons = [];

  // NORMALIZATION STRATEGY (Converts basic substitutions back to letters)
  let normalizedText = text.toLowerCase();
  normalizedText = normalizedText.replace(/3/g, 'e');
  normalizedText = normalizedText.replace(/1/g, 'i');
  normalizedText = normalizedText.replace(/0/g, 'o');
  normalizedText = normalizedText.replace(/4/g, 'a');
  normalizedText = normalizedText.replace(/5/g, 's');
  normalizedText = normalizedText.replace(/7/g, 't');

  // CUSTOM STRING BLOCKLIST
  const badWords = [
    "fuck", "shit", "asshole", "bitch", "bastard", "cunt", "dick", "nigger"
  ];

  const containsSwear = badWords.some(word => {
    const regex = new RegExp(`\\b${word}\\b|${word}`, "i");
    return regex.test(normalizedText);
  });

  if (containsSwear) {
    flagged = true;
    reasons.push("restricted vocabulary / hate speech language detected");
  }

  // ADVANCED AUTOMATED POLICY COMPLIANCE
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

  // STANDARD REGEX PATTERN VALIDATIONS
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

  return res.status(200).json({
    flagged,
    reason: flagged ? reasons.join(", ") : "Clean",
    message: flagged ? "Message blocked for safety" : "Message approved"
  });
}
