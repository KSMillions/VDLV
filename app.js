// ============================================================
// VDLV-JBCC ASSISTANT — Core Application Logic
// J.C. Van der Linde & Venter Projects (Pty) Ltd
// ============================================================

'use strict';

// ─── SYSTEM PROMPT ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the VDLV-JBCC Contracts Assistant — an expert AI for J.C. Van der Linde & Venter Projects (Pty) Ltd (VDLV), a South African construction company operating under the JBCC Suite of Contracts. You combine the expertise of a senior contracts manager, a construction law specialist, and a seasoned site administrator.

═══════════════════════════════════════
CONTRACT EXPERTISE
═══════════════════════════════════════
You have comprehensive, clause-level knowledge of:
• JBCC Principal Building Agreement (PBA) — 6th Edition (all clauses 1–46)
• JBCC Minor Works Agreement (MWA)
• JBCC Nominated/Selected Subcontract (N/S) Agreement
• JBCC Series 2000 (legacy projects)
• NEC3/NEC4 (overview for comparison)
• FIDIC Red/Yellow Book (overview for comparison)

═══════════════════════════════════════
SOUTH AFRICAN CONSTRUCTION LAW & REGULATORY FRAMEWORK
═══════════════════════════════════════
You understand the full regulatory environment VDLV operates in:

CIDB (Construction Industry Development Board):
• CIDB Act 38 of 2000 and Regulations
• Contractor grading designations (1–9) and their monetary thresholds
• Register of Contractors — mandatory registration, renewal, upgrading
• Register of Projects — compulsory registration of all public sector projects
• Best Practice requirements and contractor development
• Penalties for unregistered contractors performing graded work

NHBRC (National Home Builders Registration Council):
• Housing Consumers Protection Measures Act 95 of 1998
• Mandatory enrolment of residential units before construction
• Home Builder registration requirements and responsibilities
• Late enrolment penalties and implications for payment
• Warranty obligations (5-year structural, 1-year roof waterproofing, 90-day other defects)

OHS Act & Construction Regulations 2014:
• Occupational Health and Safety Act 85 of 1993
• Construction Regulations 2014 (GNR 84) — mandatory compliance
• Principal Contractor obligations (Section 7 OHS Act)
• Health & Safety Plan: what it must contain, who approves it
• Notice of Construction (NOC): application to Dept of Labour, stamping, timelines
• Mandatory appointments: Construction Manager, Construction Health & Safety Manager, Supervisors
• Fall protection plans, risk assessments, method statements
• OHS file compilation and audit compliance
• Consequences of non-compliance (criminal liability, site stoppages)

South African Contract Law:
• Construction contracts governed by common law (lex contractus)
• The Prevention of Illegal Eviction Act (PIE Act) — irrelevant but context aware
• Prescribed Rate of Interest Act 55 of 1975 — interest on late payments
• Prescription Act 68 of 1969 — 3-year prescription on contractual debts
• Alienation of Land Act and property liens (Welsh v Breytenbach principles)
• Construction industry insolvency (business rescue, curatorship implications)
• SARS Tax Compliance — withholding 3% on foreign subcontractors (s51B ITA)

Dispute Resolution:
• ASAQS adjudication rules (Rule 3: 10-day response window — a common trap)
• AFSA arbitration rules
• Mediation as first step under JBCC Clause 40
• Adjudication under JBCC Clause 41 — binding pending review
• Arbitration under JBCC Clause 42 — final and binding

Payment & Certificates:
• Payment certified within 5 days of Recovery Statement (JBCC Clause 31.1)
• Employer must pay within 14 days of certificate (Clause 31.7)
• Late payment: interest accrues at Prescribed Rate + 2%
• Final payment: within 90 days of Practical Completion (Clause 32)
• Retention: 5% held, reduced to 2.5% at Practical Completion, released at Works Completion

═══════════════════════════════════════
COMPLEX SCENARIO REASONING
═══════════════════════════════════════
When a user describes a complex real-world situation (a dispute, claim, non-payment, delay, defect, or instruction), structure your response as follows:

**📋 Contract Position**
What the JBCC clauses say about this situation (cite specific clauses)

**⚡ Immediate Actions — Protect Your Position**
Urgent steps within days. Time-sensitive actions, notice periods, documentation

**📄 Documentation Required**
Exact records, letters, forms, and evidence to compile

**📊 Likely Outcomes / Risk Assessment**
Realistic assessment of the probable outcomes, including risks if action is delayed

**🔜 Recommended Next Step**
The single most important action to take right now

For straightforward questions (clause explanations, process queries), respond concisely without this full structure.

═══════════════════════════════════════
COMMON SA CONSTRUCTION DISPUTES — YOU HANDLE WELL
═══════════════════════════════════════
• Concurrent delay: where both Employer and Contractor risk events overlap. SA law (unlike English law) applies a "dominant cause" test. EOT is awarded for the dominant cause. Advise on documentation of daily resource allocation.
• Payment disputes: non-certification, under-certification, set-off without notice (prohibited under JBCC unless notified 5 days before payment)
• Unlawful set-off: Employer withholding for disputed defects without issuing a valid Defects List
• EOT claims refused due to late notice: Clause 25 requires written notice within 14 days of delay event — strictly enforced
• Variation disputes: oral instructions (not valid under JBCC — must be written), Principal Agent refusing to value instructed extras
• Practical Completion disputes: PA withholding certificate unreasonably — contractor's right to refer under Clause 40/41
• Termination disputes: correct vs incorrect termination procedures and their consequences
• Subcontractor default: Contractor's obligations under N/S Subcontract when a nominated sub defaults
• Insurance disputes: contractor required to insure works, third party, employer's loss of revenue

═══════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════
• Always cite specific clause numbers prominently, e.g. **Clause 25.1**, **Clause 31.7**
• Use **bold** for key terms, clause numbers, and critical deadlines
• Use bullet points for procedures and lists
• Highlight critical deadlines and notice periods with ⚠️
• Be practical and actionable — the team is often on site needing immediate guidance
• Use South African context throughout — ZAR, South African legislation, local industry norms
• For matters beyond contract administration (e.g. criminal liability, SARS matters), recommend a construction lawyer or relevant professional
• Keep responses well-structured and readable — not overly academic

You serve a professional construction team that needs fast, accurate, practical guidance in the field. Be direct, be precise, and always prioritise protecting VDLV's contractual position.`;

// ─── STATE ────────────────────────────────────────────────────
const state = {
    conversationHistory: [],
    isTyping: false,
    apiKey: localStorage.getItem('vdlv_api_key') || '',
    sidebarOpen: true,
    refPanelOpen: false,
    docPanelOpen: false,
    startupPanelOpen: false,
};

// ─── DOM REFERENCES ───────────────────────────────────────────
const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const sidebar = document.getElementById('sidebar');
const refPanel = document.getElementById('refPanel');
const docPanel = document.getElementById('docPanel');
const startupPanel = document.getElementById('startupPanel');
const settingsModal = document.getElementById('settingsModal');
const apiKeyInput = document.getElementById('apiKeyInput');
const apiStatusEl = document.getElementById('apiStatus');

// ─── INIT ─────────────────────────────────────────────────────
function init() {
    // Restore API key field
    if (apiKeyInput && state.apiKey) {
        apiKeyInput.value = state.apiKey;
    }
    updateApiStatus();

    // Mobile: default sidebar closed
    if (window.innerWidth <= 768) {
        state.sidebarOpen = false;
        sidebar.classList.remove('open');
    }

    userInput.addEventListener('input', autoResize);
    userInput.addEventListener('keydown', handleKey);
}

// ─── TIME ─────────────────────────────────────────────────────
function getTime() {
    return new Date().toLocaleTimeString('en-ZA', {
        hour: '2-digit', minute: '2-digit'
    });
}

// ─── TEXTAREA AUTO-RESIZE ─────────────────────────────────────
function autoResize() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 130) + 'px';
}

// ─── HANDLE ENTER KEY ─────────────────────────────────────────
function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// ─── SEND FROM QUICK CHIP ─────────────────────────────────────
function sendQuick(text) {
    userInput.value = text;
    sendMessage();
}

// ─── SEND MESSAGE ─────────────────────────────────────────────
async function sendMessage() {
    if (state.isTyping) return;
    const text = userInput.value.trim();
    if (!text) return;

    // Hide welcome screen if present
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) welcomeScreen.remove();

    // Append user message
    appendMessage(text, 'sent');
    state.conversationHistory.push({ role: 'user', content: text });

    // Reset input
    userInput.value = '';
    userInput.style.height = 'auto';
    state.isTyping = true;
    sendBtn.disabled = true;
    showTyping();

    try {
        let reply;

        if (state.apiKey) {
            reply = await callClaudeAPI(text);
        } else {
            // Offline fallback — simulate brief delay
            await new Promise(r => setTimeout(r, 900));
            const offline = getOfflineResponse(text);
            reply = `**${offline.title}**\n\n${offline.text}`;
            if (!state.apiKey) {
                reply += '\n\n---\n💡 *Add your Anthropic API key in ⚙️ Settings for full AI responses.*';
            }
        }

        removeTyping();
        appendMessage(reply, 'received');
        state.conversationHistory.push({ role: 'assistant', content: reply });

    } catch (err) {
        removeTyping();
        let errMsg = '⚠️ Connection error. Please check your internet connection and try again.';
        if (err.message && err.message.includes('401')) {
            errMsg = '⚠️ Invalid API key. Please check your Anthropic API key in ⚙️ Settings.';
        } else if (err.message && err.message.includes('CORS')) {
            errMsg = `⚠️ CORS restriction: Your browser is blocking the API call when running from a local file. **Solutions:**\n\n1. Serve this folder with a simple server:\n   Open Terminal → \`npx serve "JBCC Chatbot"\`\n   Then open the localhost URL shown.\n2. Or use the VS Code Live Server extension.\n\nThe offline knowledge base is still available without an API key!`;
        }
        appendMessage(errMsg, 'received');
    }

    state.isTyping = false;
    sendBtn.disabled = false;
}

// ─── CALL CLAUDE API ──────────────────────────────────────────
// Routes through /api/chat (Vercel serverless proxy) when deployed.
// Falls back to direct Anthropic call for local dev if a client key is set.
async function callClaudeAPI(userText) {
    const messages = state.conversationHistory.map(m => ({
        role: m.role,
        content: m.content
    }));

    const payload = {
        model: 'claude-opus-4-5',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages
    };

    // ── Try serverless proxy first (/api/chat on Vercel) ──────────
    try {
        const proxyRes = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // If /api/chat returned a real response (deployed on Vercel)
        if (proxyRes.status !== 404) {
            if (!proxyRes.ok) {
                const errData = await proxyRes.json().catch(() => ({}));
                throw new Error(String(proxyRes.status) + ' ' + (errData.error?.message || JSON.stringify(errData)));
            }
            const data = await proxyRes.json();
            return data.content?.[0]?.text || 'Sorry, no response. Please try again.';
        }
        // 404 means we're running from a local file — fall through to direct call
    } catch (err) {
        // If it's a network error (file:// with no server), fall through to direct call
        if (!err.message.includes('404') && !err.message.startsWith('Failed to fetch') && !err.message.startsWith('NetworkError')) {
            throw err; // Real API error — re-throw
        }
    }

    // ── Local dev fallback: direct browser → Anthropic call ───────
    if (!state.apiKey) {
        throw new Error('No API key set. Open ⚙️ Settings and enter your Anthropic API key.');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': state.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-allow-browser': 'true'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(String(response.status) + ' ' + (errData.error?.message || ''));
    }

    const data = await response.json();
    return data.content?.[0]?.text || 'Sorry, I could not process that. Please try again.';
}



// ─── APPEND MESSAGE ───────────────────────────────────────────
function appendMessage(text, type) {
    const row = document.createElement('div');
    row.className = `message-row ${type} spaced`;

    const bubble = document.createElement('div');
    bubble.className = `bubble ${type}`;

    const time = getTime();

    if (type === 'received') {
        bubble.innerHTML = formatResponse(text) +
            `<div class="msg-meta"><span class="msg-time">${time}</span></div>`;
    } else {
        bubble.innerHTML = escapeHtml(text) +
            `<div class="msg-meta"><span class="msg-time">${time}</span><span class="msg-ticks">✓✓</span></div>`;
    }

    row.appendChild(bubble);
    chatArea.appendChild(row);
    scrollToBottom();
}

// ─── FORMAT AI RESPONSE ───────────────────────────────────────
function formatResponse(text) {
    // Escape HTML first, then selectively re-introduce formatting
    let safe = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Section titles: lines starting with # or ##
    safe = safe.replace(/^#{1,2}\s+(.+)$/gm,
        '<div class="section-title">$1</div>');

    // Bold **text**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    safe = safe.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

    // Clause references — highlight
    safe = safe.replace(/\b(Clause\s+\d+[\.\d]*)\b/gi,
        '<span class="clause-ref">$1</span>');

    // Warning/critical lines starting with ⚠️
    safe = safe.replace(/⚠️\s*\*\*(.*?)\*\*(.*?)(?=\n|$)/g,
        '<div class="warning-block">⚠️ <strong>$1</strong>$2</div>');
    safe = safe.replace(/⚠️\s*(.*?)(?=\n|$)/g,
        '<div class="warning-block">⚠️ $1</div>');

    // Horizontal rules
    safe = safe.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(245,194,0,0.2);margin:8px 0;">');

    // Bullet lists
    safe = safe.replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>');
    safe = safe.replace(/(<li>[\s\S]*?<\/li>)/g, match => {
        if (!match.includes('<ul>')) return `<ul>${match}</ul>`;
        return match;
    });

    // Numbered lists
    safe = safe.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Inline code
    safe = safe.replace(/`([^`]+)`/g,
        '<code style="background:rgba(245,194,0,0.1);color:#F5C200;padding:1px 5px;border-radius:3px;font-size:12px;font-family:monospace">$1</code>');

    // Italic *text* catch with underscores
    safe = safe.replace(/_(.*?)_/g, '<em>$1</em>');

    // Paragraph breaks
    safe = safe.replace(/\n\n/g, '<br><br>');
    safe = safe.replace(/\n/g, '<br>');

    return safe;
}

// ─── ESCAPE HTML ──────────────────────────────────────────────
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
}

// ─── TYPING INDICATOR ─────────────────────────────────────────
function showTyping() {
    const row = document.createElement('div');
    row.className = 'message-row received';
    row.id = 'typingRow';
    row.innerHTML = `<div class="typing-bubble">
    <span></span><span></span><span></span>
  </div>`;
    chatArea.appendChild(row);
    scrollToBottom();
}

function removeTyping() {
    document.getElementById('typingRow')?.remove();
}

// ─── SCROLL ───────────────────────────────────────────────────
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// ─── SIDEBAR TOGGLE ───────────────────────────────────────────
function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    } else {
        state.sidebarOpen = !state.sidebarOpen;
        sidebar.classList.toggle('collapsed', !state.sidebarOpen);
    }
}

function openSidebar() {
    sidebar.classList.add('open');
    sidebar.style.width = '';
    showOverlay();
    setBottomNavActive('menu');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    hideOverlay();
    setBottomNavActive('chat');
}

// ─── REF PANEL TOGGLE ─────────────────────────────────────────
function toggleRefPanel() {
    // Close doc panel if open
    if (state.docPanelOpen) toggleDocPanel();

    state.refPanelOpen = !state.refPanelOpen;
    refPanel.classList.toggle('hidden', !state.refPanelOpen);
    refPanel.classList.toggle('visible-mobile', state.refPanelOpen);

    document.getElementById('btn-clauses')?.classList.toggle('active', state.refPanelOpen);

    if (state.refPanelOpen) {
        showOverlay();
        setBottomNavActive('clauses');
    } else {
        hideOverlay();
        setBottomNavActive('chat');
    }
}

function closeRefPanel() {
    state.refPanelOpen = false;
    refPanel.classList.add('hidden');
    refPanel.classList.remove('visible-mobile');
    document.getElementById('btn-clauses')?.classList.remove('active');
    hideOverlay();
    setBottomNavActive('chat');
}

// ─── DOC PANEL TOGGLE ─────────────────────────────────────────
function toggleDocPanel() {
    if (state.refPanelOpen) closeRefPanel();

    state.docPanelOpen = !state.docPanelOpen;
    docPanel.classList.toggle('hidden', !state.docPanelOpen);
    docPanel.classList.toggle('visible-mobile', state.docPanelOpen);

    document.getElementById('btn-docs')?.classList.toggle('active', state.docPanelOpen);

    if (state.docPanelOpen) {
        showOverlay();
        setBottomNavActive('docs');
    } else {
        hideOverlay();
        setBottomNavActive('chat');
    }
}

function closeDocPanel() {
    state.docPanelOpen = false;
    docPanel.classList.add('hidden');
    docPanel.classList.remove('visible-mobile');
    document.getElementById('btn-docs')?.classList.remove('active');
    hideOverlay();
    setBottomNavActive('chat');
}

// ─── STARTUP PANEL TOGGLE ─────────────────────────────────────────
function toggleStartupPanel() {
    if (state.refPanelOpen) closeRefPanel();
    if (state.docPanelOpen) closeDocPanel();

    state.startupPanelOpen = !state.startupPanelOpen;
    startupPanel.classList.toggle('hidden', !state.startupPanelOpen);
    startupPanel.classList.toggle('visible-mobile', state.startupPanelOpen);

    if (state.startupPanelOpen) {
        showOverlay();
        setBottomNavActive('startup');
    } else {
        hideOverlay();
        setBottomNavActive('chat');
    }
}

function closeStartupPanel() {
    state.startupPanelOpen = false;
    startupPanel.classList.add('hidden');
    startupPanel.classList.remove('visible-mobile');
    hideOverlay();
    setBottomNavActive('chat');
}

// ─── SETTINGS MODAL ───────────────────────────────────────────
function openSettings() {
    settingsModal.classList.add('visible');
    if (apiKeyInput) apiKeyInput.value = state.apiKey;
}

function closeSettings() {
    settingsModal.classList.remove('visible');
}

function saveSettings() {
    const key = apiKeyInput ? apiKeyInput.value.trim() : '';
    state.apiKey = key;
    if (key) {
        localStorage.setItem('vdlv_api_key', key);
    } else {
        localStorage.removeItem('vdlv_api_key');
    }
    updateApiStatus();
    closeSettings();
    showToast(key ? '✓ API key saved — live AI responses enabled!' : 'API key cleared — using offline mode', key ? 'success' : '');
}

function clearApiKey() {
    if (apiKeyInput) apiKeyInput.value = '';
    state.apiKey = '';
    localStorage.removeItem('vdlv_api_key');
    updateApiStatus();
    showToast('API key cleared');
}

function updateApiStatus() {
    if (!apiStatusEl) return;
    if (state.apiKey) {
        apiStatusEl.className = 'api-status has-key';
        apiStatusEl.innerHTML = '● Live AI mode active';
    } else {
        apiStatusEl.className = 'api-status no-key';
        apiStatusEl.innerHTML = '● Offline knowledge base mode';
    }
}

// Close modal on overlay click
settingsModal?.addEventListener('click', function (e) {
    if (e.target === settingsModal) closeSettings();
});

// ─── MOBILE OVERLAY ───────────────────────────────────────────
function showOverlay() {
    const overlay = document.getElementById('mobileOverlay');
    if (overlay && window.innerWidth <= 768) {
        overlay.classList.add('visible');
    }
}

function hideOverlay() {
    const overlay = document.getElementById('mobileOverlay');
    if (overlay) overlay.classList.remove('visible');
}

function closeMobileOverlay() {
    closeSidebar();
    closeRefPanel();
    closeDocPanel();
    closeStartupPanel();
}

// ─── BOTTOM NAV ACTIVE STATE ──────────────────────────────────
function setBottomNavActive(tab) {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.classList.remove('active'));
    const target = document.getElementById(`bn-${tab}`);
    if (target) target.classList.add('active');
}

// ─── MOBILE BOTTOM NAV HANDLER ────────────────────────────────
function mobileNav(view) {
    switch (view) {
        case 'chat':
            closeMobileOverlay();
            setBottomNavActive('chat');
            break;
        case 'clauses':
            closeDocPanel();
            closeSidebar();
            if (state.refPanelOpen) {
                closeRefPanel();
            } else {
                toggleRefPanel();
            }
            break;
        case 'docs':
            closeRefPanel();
            closeStartupPanel();
            closeSidebar();
            if (state.docPanelOpen) {
                closeDocPanel();
            } else {
                toggleDocPanel();
            }
            break;
        case 'startup':
            closeRefPanel();
            closeDocPanel();
            closeSidebar();
            if (state.startupPanelOpen) {
                closeStartupPanel();
            } else {
                toggleStartupPanel();
            }
            break;
        case 'menu':
            closeRefPanel();
            closeDocPanel();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
            break;
        case 'settings':
            closeMobileOverlay();
            setBottomNavActive('settings');
            openSettings();
            break;
    }
}

// ─── CLAUSE REFERENCE CLICK ───────────────────────────────────
function askAboutClause(clauseNum, topic) {
    const question = `Please explain ${clauseNum} of the JBCC PBA — ${topic}`;
    sendQuick(question);
    // On mobile, close the panel
    closeRefPanel();
}

// ─── CLEAR CHAT ───────────────────────────────────────────────
function clearChat() {
    state.conversationHistory = [];
    // Remove all message rows
    const rows = chatArea.querySelectorAll('.message-row');
    rows.forEach(r => r.remove());
    // Re-show welcome screen
    showWelcome();
    showToast('Chat cleared');
}

function showWelcome() {
    const existing = document.getElementById('welcomeScreen');
    if (existing) return;
    const el = document.createElement('div');
    el.id = 'welcomeScreen';
    el.className = 'welcome-screen';
    el.innerHTML = `
    <div class="welcome-logo">VV</div>
    <div class="welcome-title">VDLV-JBCC Assistant</div>
    <div class="welcome-sub">
      Your dedicated AI assistant for 
      <strong>J.C. Van der Linde &amp; Venter Projects (Pty) Ltd</strong>.<br><br>
      Ask me anything about the <strong>JBCC Suite of Contracts</strong>, 
      or tap a quick prompt below to get started.
    </div>
    <div class="welcome-tags">
      <span class="welcome-tag">JBCC PBA 6th Ed</span>
      <span class="welcome-tag">Minor Works</span>
      <span class="welcome-tag">N/S Subcontract</span>
      <span class="welcome-tag">South African Construction</span>
    </div>
  `;
    chatArea.insertBefore(el, chatArea.firstChild);
}

// ─── TOAST ────────────────────────────────────────────────────
function showToast(message, type = '') {
    let toast = document.getElementById('appToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'appToast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── DOCUMENT ATTACH ──────────────────────────────────────────
function attachDoc() {
    showToast('📎 Document upload — coming in next update!');
    appendMessage(
        "📎 **Document Upload** — Coming soon!\n\nThis feature will let you upload PDF contract documents for clause-specific analysis. For now, describe your contract issue and I'll assist with my built-in JBCC knowledge.",
        'received'
    );
    state.conversationHistory.push({
        role: 'assistant',
        content: 'Document upload feature coming soon.'
    });
}

// ─── SIDEBAR NAV CLICK (desktop) ──────────────────────────────
function sidebarNav(view) {
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (view === 'clauses') {
        closeDocPanel();
        closeStartupPanel();
        toggleRefPanel();
    } else if (view === 'docs') {
        closeRefPanel();
        closeStartupPanel();
        toggleDocPanel();
    } else if (view === 'startup') {
        closeRefPanel();
        closeDocPanel();
        toggleStartupPanel();
    } else if (view === 'clear') {
        clearChat();
    } else if (view === 'settings') {
        openSettings();
    }

    // On mobile, close sidebar after nav
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
}

// ─── INIT ON LOAD ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
