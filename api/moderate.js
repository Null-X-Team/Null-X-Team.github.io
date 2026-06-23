export default async function handler(req, res) {
  // CORS Headers if you are calling this from a different subdomain/origin
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

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "No text provided" });
  }

  // Safety constraint: Guard against excessively long spam inputs crashing the API
  if (text.length > 2000) {
    return res.status(413).json({ error: "Payload too large" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        input: text.trim(),
        model: "omni-moderation-latest"
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error Status:", response.status, errorData);
      // Fail-secure: If the filter breaks, err on the side of caution or fallback
      return res.status(502).json({ error: "Moderation engine unavailable" });
    }

    const data = await response.json();
    const result = data.results?.[0];

    // Optional feature: Extract the exact categories that caused the flag
    let flagReasons = [];
    if (result?.categories) {
      flagReasons = Object.keys(result.categories).filter(cat => result.categories[cat]);
    }

    return res.status(200).json({
      flagged: result?.flagged || false,
      categories: flagReasons,
      reason: result?.flagged ? `Flagged categories: ${flagReasons.join(", ")}` : "Clean"
    });
  } catch (err) {
    console.error("System catch error:", err);
    return res.status(500).json({ error: "Internal validation failure" });
  }
}
