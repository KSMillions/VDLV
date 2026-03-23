// ============================================================
// VDLV-JBCC ASSISTANT — Core Application Logic
// J.C. Van der Linde & Venter Projects (Pty) Ltd
// ============================================================

'use strict';

// ─── SYSTEM PROMPTS — REVISION-AWARE ──────────────────────────
const SYSTEM_PROMPT_COMMON_HEADER = `You are the VDLV-JBCC Contracts Assistant — an expert AI for J.C. Van der Linde & Venter Projects (Pty) Ltd (VDLV), a South African construction company operating under the JBCC Suite of Contracts. You combine the expertise of a senior contracts manager, a construction law specialist, and a seasoned site administrator.

`;

const REVISION_CONTEXT = {
    '2007': `═══════════════════════════════════════
ACTIVE JBCC REVISION: PBA EDITION 5.0 (2007)
═══════════════════════════════════════
The user is working with the JBCC PBA Edition 5.0 (2007). All clause references, procedures, and advice MUST be specific to this edition. When the user asks about clauses, always reference the Edition 5.0 clause numbering.

Edition 5.0 Key Characteristics:
• Separate EC (Employer-Contractor) and CE (Contractor-Employer) Contract Data documents
• 1 clause dedicated to definitions and interpretation
• "Works Completion" exists as a separate completion stage after Practical Completion
• No standalone suspension clause
• 4 separate termination clauses (Clauses 35.0–38.0)
• EOT / adjustment to PC date: Clause 29.1–29.2
• PA response period for EOT: 7 days
• Final account periods in calendar days
• No provision for off-site materials payment
• JBCC Preliminaries discontinued — ASAQS published its own
• Payment certified within 5 days of Recovery Statement (Clause 31.1)
• Employer must pay within 14 days of certificate (Clause 31.7)
• Retention: 5% held, reduced to 2.5% at Practical Completion, released at Works Completion

Key Clause Numbers (Edition 5.0):
• Principal Agent: Clause 6.0
• Subcontractors: Clause 16.0
• Variations: Clause 23.0
• Extension of Time / Adjustment of Date for PC: Clause 29.0–29.2
• Delay Damages: Clause 29.4 (or as specified in Contract Data)
• Practical Completion: Clause 28.0
• Works Completion: Clause 29.0 (exists as separate stage)
• Defects Liability: Clause 29.0–30.0
• Interim Payments: Clause 31.0
• Final Account: Clause 32.0
• Termination by Employer: Clause 35.0
• Termination by Contractor: Clause 36.0
• Mediation: Clause 40.0
• Adjudication: Clause 41.0
• Arbitration: Clause 42.0
• Insurance & Guarantees: Clauses 8.0–13.0
`,

    '2018': `═══════════════════════════════════════
ACTIVE JBCC REVISION: PBA EDITION 6.2 (2018)
═══════════════════════════════════════
The user is working with the JBCC PBA Edition 6.2 (2018). All clause references, procedures, and advice MUST be specific to this edition. When the user asks about clauses, always reference the Edition 6.2 clause numbering.

Edition 6.2 Key Characteristics:
• Single consolidated Contract Data (CD) document — replaces separate EC/CE
• 7 clauses dedicated to definitions, administrative issues, and interpretation
• "Works Completion" as a separate stage has been REMOVED
• New standalone suspension clause introduced
• 4 previous termination clauses collapsed into 1 clause
• EOT / adjustment to PC date: Clause 23.1–23.2
• PA response period for EOT: 20 working days
• Final account periods in working days (60 days issue, 30 days acceptance)
• Off-site materials payment re-inserted (subclauses 25.4.1–3)
• JBCC resumed publishing General Preliminaries
• Insurance expanded — covers direct contractors, free issue items, marine transit
• Dispute resolution allows local adjudicators/arbitrators — adaptable for African use
• Electronic notices explicitly exclude social media
• Compensatory and default interest defined in definitions section
• Contractor must provide reasons when objecting to final account
• Payment certified within 5 days of Recovery Statement (Clause 25.1)
• Employer must pay within 14 days of certificate (Clause 25.7)
• Retention: 5% held, reduced to 2.5% at Practical Completion

Key Clause Numbers (Edition 6.2):
• Principal Agent: Clause 4.0
• Subcontractors: Clause 14.0
• Variations: Clause 21.0
• Extension of Time / Adjustment of Date for PC: Clause 23.0–23.2
• Delay Damages: Clause 23.4
• Practical Completion: Clause 24.0
• Defects Liability: Clause 26.0
• Interim Payments: Clause 25.0
• Final Account: Clause 28.0
• Suspension: Clause 29.0
• Termination: Clause 30.0 (single consolidated clause)
• Disagreements: Clause 30.1
• Mediation: Clause 37.0
• Adjudication: Clause 38.0
• Arbitration: Clause 39.0
• Insurance & Guarantees: Clauses 8.0–11.0
`
};

const SYSTEM_PROMPT_BODY = `
═══════════════════════════════════════
CONTRACT EXPERTISE
═══════════════════════════════════════
You have comprehensive, clause-level knowledge of:
• JBCC Principal Building Agreement (PBA) — both Edition 5.0 (2007) and Edition 6.2 (2018)
• JBCC Minor Works Agreement (MWA)
• JBCC Nominated/Selected Subcontract (N/S) Agreement
• JBCC Series 2000 (legacy projects)
• NEC3/NEC4 (overview for comparison)
• FIDIC Red/Yellow Book (overview for comparison)

IMPORTANT: When answering, ALWAYS specify which edition you are referencing. If the user's question could have different answers depending on the edition, highlight the differences.

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
• Mediation as first step under JBCC dispute clauses
• Adjudication — binding pending review
• Arbitration — final and binding

═══════════════════════════════════════
COMPLEX SCENARIO REASONING
═══════════════════════════════════════
When a user describes a complex real-world situation (a dispute, claim, non-payment, delay, defect, or instruction), structure your response as follows:

**📋 Contract Position**
What the JBCC clauses say about this situation (cite specific clauses FOR THE ACTIVE EDITION)

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
• EOT claims refused due to late notice: strictly enforced — act immediately
• Variation disputes: oral instructions (not valid under JBCC — must be written), Principal Agent refusing to value instructed extras
• Practical Completion disputes: PA withholding certificate unreasonably — contractor's right to refer to dispute resolution
• Termination disputes: correct vs incorrect termination procedures and their consequences
• Subcontractor default: Contractor's obligations under N/S Subcontract when a nominated sub defaults
• Insurance disputes: contractor required to insure works, third party, employer's loss of revenue

═══════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════
• Always cite specific clause numbers prominently, e.g. **Clause 25.1**, **Clause 31.7**
• Always mention which JBCC edition you are referencing (Edition 5.0 / 2007 or Edition 6.2 / 2018)
• Use **bold** for key terms, clause numbers, and critical deadlines
• Use bullet points for procedures and lists
• Highlight critical deadlines and notice periods with ⚠️
• Be practical and actionable — the team is often on site needing immediate guidance
• Use South African context throughout — ZAR, South African legislation, local industry norms
• For matters beyond contract administration (e.g. criminal liability, SARS matters), recommend a construction lawyer or relevant professional
• Keep responses well-structured and readable — not overly academic

You serve a professional construction team that needs fast, accurate, practical guidance in the field. Be direct, be precise, and always prioritise protecting VDLV's contractual position.`;

function getSystemPrompt(revision) {
    return SYSTEM_PROMPT_COMMON_HEADER + REVISION_CONTEXT[revision || '2018'] + SYSTEM_PROMPT_BODY;
}

// ─── STATE ────────────────────────────────────────────────────
const state = {
    conversationHistory: [],
    isTyping: false,
    activeRevision: localStorage.getItem('vdlv_revision') || '2018',
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

// ─── INIT ─────────────────────────────────────────────────────
function init() {
    updateRevisionUI();

    // Mobile: default sidebar closed
    if (window.innerWidth <= 768) {
        state.sidebarOpen = false;
        sidebar.classList.remove('open');
    }

    userInput.addEventListener('input', autoResize);
    userInput.addEventListener('keydown', handleKey);
}

// ─── REVISION TOGGLE ──────────────────────────────────────────
function setRevision(rev) {
    if (rev === state.activeRevision) return;
    state.activeRevision = rev;
    localStorage.setItem('vdlv_revision', rev);
    updateRevisionUI();

    // Clear conversation context when switching editions (clause numbers differ)
    state.conversationHistory = [];

    const label = rev === '2007' ? 'Edition 5.0 (2007)' : 'Edition 6.2 (2018)';
    showToast(`📘 Switched to JBCC PBA ${label}`, 'success');
}

function updateRevisionUI() {
    const btn2007 = document.getElementById('revBtn2007');
    const btn2018 = document.getElementById('revBtn2018');
    if (btn2007) btn2007.classList.toggle('active', state.activeRevision === '2007');
    if (btn2018) btn2018.classList.toggle('active', state.activeRevision === '2018');

    // Update welcome tag if visible
    const revTag = document.getElementById('revTagEdition');
    if (revTag) {
        revTag.textContent = state.activeRevision === '2007'
            ? 'JBCC PBA Ed 5.0 (2007)'
            : 'JBCC PBA Ed 6.2 (2018)';
    }
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
        // Always try the server proxy first (centralized API key on Vercel)
        const reply = await callClaudeAPI(text);
        removeTyping();
        appendMessage(reply, 'received');
        state.conversationHistory.push({ role: 'assistant', content: reply });

    } catch (err) {
        removeTyping();
        const errorType = err.errorType || '';
        let errMsg;

        if (errorType === 'rate_limit') {
            errMsg = '⏳ **Usage limit reached** — We\'ve hit the rate limit for now. Please try again in a few minutes.\n\nYour question is still valid — just give the system a moment to reset.';
        } else if (errorType === 'quota_exceeded') {
            errMsg = '📊 **Daily usage limit reached** — The AI assistant has reached its daily quota. Please come back later today or tomorrow.\n\nIn the meantime, you can browse the **JBCC Clause Library** (📋) for quick reference.';
        } else if (errorType === 'overloaded') {
            errMsg = '🔄 **AI service is temporarily busy** — Please try again in a moment. The service is experiencing high demand.';
        } else if (errorType === 'offline') {
            // Server not available — use offline knowledge base
            const offline = getOfflineResponse(text, state.activeRevision);
            errMsg = `**${offline.title}**\n\n${offline.text}\n\n---\n💡 *The AI service is currently unavailable. Showing offline knowledge base results.*`;
        } else {
            errMsg = '⚠️ **Connection error** — Please check your internet connection and try again.\n\nThe offline clause library is available via the 📋 button above.';
        }
        appendMessage(errMsg, 'received');
    }

    state.isTyping = false;
    sendBtn.disabled = false;
}

// ─── CALL CLAUDE API ──────────────────────────────────────────
// Routes through /api/chat (Vercel serverless proxy).
// Falls back to offline knowledge base if server is unavailable.
async function callClaudeAPI(userText) {
    const messages = state.conversationHistory.map(m => ({
        role: m.role,
        content: m.content
    }));

    const payload = {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: getSystemPrompt(state.activeRevision),
        messages
    };

    try {
        const proxyRes = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Parse the response
        const data = await proxyRes.json().catch(() => ({}));

        if (!proxyRes.ok) {
            // Create an error with the errorType from the server
            const err = new Error(data.error || `Server error (${proxyRes.status})`);
            err.errorType = data.errorType || '';

            // If the server says no API key is configured, fall back to offline
            if (data.errorType === 'no_key') {
                err.errorType = 'offline';
            }
            throw err;
        }

        return data.content?.[0]?.text || 'Sorry, no response received. Please try again.';

    } catch (err) {
        // Network error (no server available — local file or offline)
        if (err.message === 'Failed to fetch' || err.message.startsWith('NetworkError')) {
            const networkErr = new Error('Server not available');
            networkErr.errorType = 'offline';
            throw networkErr;
        }
        throw err; // Re-throw API errors with their errorType intact
    }
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
}

function closeSettings() {
    settingsModal.classList.remove('visible');
}

// Close modal on overlay click
settingsModal?.addEventListener('click', function (e) {
    if (e.target === settingsModal) closeSettings();
});

// ─── MOBILE OVERLAY ───────────────────────────────────────────
function showOverlay() {
    const overlay = document.getElementById('mobileOverlay');
    if (overlay && window.innerWidth <= 768) {
        overlay.style.display = 'block';
        // Let display:block paint first, then fade in
        requestAnimationFrame(() => overlay.classList.add('visible'));
    }
}

function hideOverlay() {
    const overlay = document.getElementById('mobileOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    // Remove from layout after fade-out so it can NEVER intercept taps
    setTimeout(() => { overlay.style.display = 'none'; }, 280);
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
    const revLabel = state.activeRevision === '2007' ? 'JBCC PBA Ed 5.0 (2007)' : 'JBCC PBA Ed 6.2 (2018)';
    const el = document.createElement('div');
    el.id = 'welcomeScreen';
    el.className = 'welcome-screen';
    el.innerHTML = `
    <div class="welcome-logo">VV</div>
    <div class="welcome-title">VDLV-JBCC Assistant</div>
    <div class="welcome-sub">
      Your dedicated AI assistant for 
      <strong>J.C. Van der Linde &amp; Venter Projects (Pty) Ltd</strong>.<br><br>
      I have expert knowledge of the entire <strong>JBCC Suite of Contracts</strong> — supporting both
      <strong>Edition 5.0 (2007)</strong> and <strong>Edition 6.2 (2018)</strong>. Use the edition toggle above
      to switch between revisions.
    </div>
    <div class="welcome-tags" id="welcomeTags">
      <span class="welcome-tag" id="revTagEdition">${revLabel}</span>
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
