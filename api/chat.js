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
            const errorMsg = data?.error?.message || JSON.stringify(data) || '';

            // Rate limited
            if (anthropicRes.status === 429) {
                return res.status(429).json({
                    error: 'Rate limit reached. Please try again in a few minutes.',
                    errorType: 'rate_limit'
                });
            }

            // Quota / credit / billing issues (Anthropic returns 400 or 402 for these)
            if (anthropicRes.status === 402 || anthropicRes.status === 403 ||
                errorMsg.toLowerCase().includes('credit') ||
                errorMsg.toLowerCase().includes('billing') ||
                errorMsg.toLowerCase().includes('balance')) {
                return res.status(402).json({
                    error: 'Usage credits depleted. Please add credits to the Anthropic account.',
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

            // Any other API error — always include errorType
            return res.status(anthropicRes.status).json({
                error: errorMsg || 'An unexpected error occurred.',
                errorType: 'api_error'
            });
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
