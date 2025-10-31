// Serverless function on Vercel
// POST /api/chat { messages: [{role: 'user'|'system'|'assistant', content: '...'}] }
// Uses OpenAI Chat Completions API
const https = require('https');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }
  try {
    let body = '';
    await new Promise((resolve) => {
      req.on('data', chunk => body += chunk.toString());
      req.on('end', resolve);
    });
    const { messages } = JSON.parse(body || '{}');

    if (!process.env.OPENAI_API_KEY) {
      res.statusCode = 500;
      return res.end('Missing OPENAI_API_KEY environment variable');
    }

    const payload = JSON.stringify({
      model: "gpt-4o-mini",
      messages: messages && Array.isArray(messages) && messages.length ? messages : [
        { role: "system", content: "You are LuxeMind, a calm, bilingual (English/Español) AI coach focusing on mindfulness, psychology, and gentle growth." },
        { role: "user", content: "Give me a 1-minute morning reset." }
      ]
    });

    const options = {
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      }
    };

    const apiRes = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => resolve({ status: response.statusCode, data }));
      });
      request.on("error", reject);
      request.write(payload);
      request.end();
    });

    res.setHeader("Content-Type", "application/json");
    res.statusCode = apiRes.status;
    res.end(apiRes.data);
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message || String(err) }));
  }
};
