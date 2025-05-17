export default async function handler(req, res) {
  const { question } = req.body;

  // Call your model's Hugging Face Inference API endpoint here
  const HF_API_URL = "https://api-inference.huggingface.co/models/psg009/finetuned-phi2-insureadvisor";
  const HF_TOKEN = process.env.HF_TOKEN; // Set this in Vercel env vars

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: `Question: ${question}\nAnswer:` })
  });
  const data = await response.json();
  res.status(200).json({ answer: data[0]?.generated_text || "" });
}
