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
        return res.status(503).json({
            error: 'AI service not configured.',
            errorType: 'no_key'
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
                model: model || 'claude-sonnet-4-20250514',
                max_tokens: max_tokens || 4096,
                system: system || '',
                messages
            })
        });

        const data = await anthropicRes.json();

        if (!anthropicRes.ok) {
            // Rate limited
            if (anthropicRes.status === 429) {
                return res.status(429).json({
                    error: 'Rate limit reached. Please try again in a few minutes.',
                    errorType: 'rate_limit'
                });
            }

            // Quota exceeded / billing issue
            if (anthropicRes.status === 402 || anthropicRes.status === 403) {
                return res.status(anthropicRes.status).json({
                    error: 'Usage limit reached. Please try again later.',
                    errorType: 'quota_exceeded'
                });
            }

            // Overloaded
            if (anthropicRes.status === 529) {
                return res.status(529).json({
                    error: 'AI service is temporarily busy. Please try again shortly.',
                    errorType: 'overloaded'
                });
            }

            return res.status(anthropicRes.status).json(data);
        }

        return res.status(200).json(data);

    } catch (err) {
        console.error('VDLV proxy error:', err);
        return res.status(500).json({
            error: err.message || 'Internal server error',
            errorType: 'server_error'
        });
    }
};
