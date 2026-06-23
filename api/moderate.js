// api/moderate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        input: text,
        model: "omni-moderation-latest"
      })
    });

    const data = await response.json();

    res.status(200).json({
      flagged: data.results?.[0]?.flagged || false,
      reason: "inappropriate content"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
