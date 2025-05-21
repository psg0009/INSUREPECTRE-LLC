export default async function handler(req, res) {
  // Only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  const HF_API_URL = "https://api-inference.huggingface.co/models/psg009/finetuned-phi2-insureadvisor";
  const HF_TOKEN = process.env.HF_TOKEN; // Set in Vercel env vars

  const hfResponse = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: `Question: ${question}\nAnswer:` })
  });

  if (!hfResponse.ok) {
    const error = await hfResponse.text();
    return res.status(500).json({ error });
  }

  const data = await hfResponse.json();
  const answer = data?.[0]?.generated_text?.split("Answer:")[1]?.trim() || "Sorry, no answer available.";

  res.status(200).json({ answer });
}
