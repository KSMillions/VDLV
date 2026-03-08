// ============================================================
// VDLV-JBCC — Vercel Serverless API Proxy
// Proxies requests to Anthropic Claude, keeping the API key
// secure on the server (never exposed to the browser).
// ============================================================

module.exports = async function handler(req, res) {
    // CORS headers (allow Vercel preview URLs + custom domain)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: 'ANTHROPIC_API_KEY environment variable not set. Add it in Vercel → Settings → Environment Variables.'
        });
    }

    const { messages, system, model, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    try {
        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model || 'claude-opus-4-5',
                max_tokens: max_tokens || 1500,
                system: system || '',
                messages
            })
        });

        const data = await anthropicRes.json();

        if (!anthropicRes.ok) {
            return res.status(anthropicRes.status).json(data);
        }

        return res.status(200).json(data);

    } catch (err) {
        console.error('VDLV proxy error:', err);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
};
