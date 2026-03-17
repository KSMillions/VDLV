// ============================================================
// VDLV-JBCC KNOWLEDGE BASE — Offline Fallback Responses
// ============================================================
// When no API key is set, this module provides keyword-matched
// answers for the most common JBCC contract questions.
// Supports Edition 5.0 (2007) and Edition 6.2 (2018).
// ============================================================

const JBCC_KNOWLEDGE = [
  {
    keywords: ['practical completion', 'works completion', 'pc', 'complete'],
    title: 'Practical Completion',
    response: `**Practical Completion** under the JBCC PBA refers to the stage at which the works are complete enough to be used for their intended purpose, even if minor outstanding items (snags) remain.

**Key Points:**
- The Contractor must notify the Principal Agent in writing when the works are practically complete
- The Principal Agent must issue a **Practical Completion Certificate** within the required timeframe of inspection
- Works must be free of defects that would prevent reasonable use
- Outstanding items must be listed and agreed upon — non-material

**What triggers Practical Completion:**
- Occupation of the building by the Employer
- Commencement of the Defects Liability Period
- Release of half the retention (if applicable)
- Delay damages cease to apply

**Critical Notice:** The Contractor's written notification triggers the inspection process. If the Principal Agent fails to respond within the required timeframe, escalate formally in writing.`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Defined under **Clause 28.0**\n- PA must issue certificate within **5 working days** of inspection\n- **Works Completion** exists as a separate subsequent stage (Clause 29.0)\n- Remaining retention released at Works Completion\n- If PA fails to respond, escalate citing **Clause 28.1**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Defined under **Clause 24.0**\n- PA response period revised\n- **Works Completion** as a separate stage has been **removed** in this edition\n- Remaining retention released after defects liability period\n- Includes explicit provisions for force majeure and direct contractor default as grounds for PC date adjustment`
    }
  },
  {
    keywords: ['payment', 'certificate', 'payment certificate', 'recovery statement', 'interim payment'],
    title: 'Payment Process',
    response: `**JBCC Payment Process**

**Interim Payment Cycle:**
1. Contractor submits a **Recovery Statement** (payment application) by the agreed date each month
2. Principal Agent issues an **Interim Payment Certificate** within the required period
3. Employer pays within the stipulated timeframe after receiving the certificate
4. Late payment triggers interest — interest may be compounded
5. The Principal Agent cannot reduce a certified amount without written reasons

**Final Account:**
- Contractor submits Final Recovery Statement after Practical Completion
- Principal Agent certifies within the required period
- Employer pays within the stipulated timeframe of certification

⚠️ **Always track your Recovery Statement submission dates and follow up in writing if a certificate is overdue.**`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clause 31.0** (Interim Payments) & **Clause 32.0** (Final Payment)\n- Payment certificate within **7 days** of Recovery Statement\n- Employer pays within **7 days** of certificate (or as stated in Contract Data)\n- Late payment interest under **Clause 31.12**\n- Retention: typically 10% up to PC, then 5% during defects period\n- Final Recovery Statement within **90 days** of PC (calendar days)\n- PA certifies final account within **21 days** (calendar days)\n- **Overdue certificates** give Contractor grounds for suspension under **Clause 31.13**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 25.0** (Interim Payments) & **Clause 28.0** (Final Account)\n- Payment certificate within **5 days** of Recovery Statement (Clause 25.1)\n- Employer pays within **14 days** of certificate (Clause 25.7)\n- Off-site materials payment re-inserted (subclauses 25.4.1–3)\n- Final account periods now in **working days** (60 days issue, 30 days acceptance)\n- Contractor must provide **reasons** when objecting to the final account\n- Compensatory and default interest defined in definitions section`
    }
  },
  {
    keywords: ['extension of time', 'eot', 'delay', 'time claim', 'programme', 'completion date'],
    title: 'Extension of Time (EOT)',
    response: `**Extension of Time (EOT) Claims** under JBCC PBA

**Grounds for EOT:**
- Employer risk events (delays by Employer or their agents)
- Late information or instructions from Principal Agent
- Force majeure or exceptional adverse weather
- Civil commotion, strikes affecting the works
- Variations instructed that impact the programme
- Employer-supplied materials not delivered timeously

**Procedure — Critical Deadlines:**
1. **Notify in writing** within the required window of becoming aware of the delay event
2. Submit detailed particulars of the claim within the required period
3. Submit final particulars when the effect of the delay can be fully assessed

⚠️ **Missing the notification window can bar your claim entirely — act immediately.**

**Documentation Required:**
- Updated construction programme showing delay impact
- Daily site records / weather reports
- Correspondence records proving the delay cause
- Cost impact (if claiming concurrent damages)

**Concurrent Delays:** If both Contractor and Employer delays occur simultaneously, generally no EOT is granted for that period but delay damages are also not applied.`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clause 29.0–29.2** (Adjustment of Date for Practical Completion)\n- Written notice within **14 days** of delay event\n- Submit particulars within **14 days** of notification\n- PA must grant or refuse EOT within **7 days** of receiving particulars\n- Delay Damages under **Clause 29.4**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 23.0–23.2** (Adjustment of Date for Practical Completion)\n- Written notice requirements apply — act within the contractual window\n- PA response period extended to **20 working days**\n- Now explicitly includes **force majeure**, **statutory body actions**, and **direct contractor default** as grounds (Clause 23.1)\n- Delay Damages under **Clause 23.4**`
    }
  },
  {
    keywords: ['adjudication', 'dispute', 'mediation', 'asaqs', 'afsa', 'arbitration'],
    title: 'Dispute Resolution',
    response: `**JBCC Dispute Resolution** — Three-tier process:

**1. Mediation**
- Either party may refer a dispute to mediation
- A mediator is appointed by agreement or by ASAQS / AFSA
- Non-binding unless parties agree to accept the outcome

**2. Adjudication**
- The primary binding dispute mechanism under JBCC
- Either party can refer to adjudication at any time
- Decision is **immediately binding and enforceable** — parties must comply even if challenging
- Can be reviewed by arbitration afterwards

**3. Arbitration**
- Final and binding — conducted under AFSA rules
- Only after adjudication has been concluded (or refused)

**Key Tips:**
- Always issue a formal **Notice of Dispute** in writing, citing the clause and dispute value
- Preserve all evidence: correspondence, site instructions, certificates, photos
- Engage a construction lawyer or ASAQS member for disputes above R500 000`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Mediation: **Clause 40.0** — within **20 working days** of appointment\n- Adjudication: **Clause 41.0** — decision within **28 days**\n- Arbitration: **Clause 42.0** — under AFSA rules\n- Adjudicator appointed from ASAQS or AFSA panel`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Mediation: **Clause 37.0**\n- Adjudication: **Clause 38.0**\n- Arbitration: **Clause 39.0**\n- Now allows use of **local adjudicators, arbitrators, or mediators** — adaptable for other African countries\n- Disagreements: **Clause 30.1**`
    }
  },
  {
    keywords: ['principal agent', 'pa', 'architect', 'duties', 'certifier', 'agent duties'],
    title: 'Principal Agent Duties',
    response: `**Principal Agent (PA) — Role & Duties**

The Principal Agent acts as the **contract administrator** and has duties to both parties — they must act fairly and impartially in their certificate-issuing role.

**Core Duties:**
- Issue all certificates required under the contract (payment, completion, defects, etc.)
- Issue instructions and variations in accordance with the contract
- Maintain and monitor the construction programme
- Inspect works and record progress
- Coordinate other Employer consultants and nominated subcontractors
- Administer the contract strictly in accordance with its terms

**Powers of the PA:**
- Instruct variations (additions, omissions, changes)
- Reject non-compliant work
- Order removal of defective materials from site
- Certify Practical Completion and the Final Account

**Limits on PA Powers:**
- The PA cannot waive or alter the terms of the contract
- Cannot bind the Employer beyond the contract provisions
- Must act within the scope of their appointment

**If the PA is acting improperly:**
- Issue a formal written complaint to the Employer
- Refer to Adjudication if the PA refuses to issue a certificate you believe is due`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clause 6.0**\n- PA limitations under **Clause 6.3**\n- Variations instructed under **Clause 23.0**\n- Issue notice of delay under **Clause 25.0**\n- Certifies Works Completion (separate stage exists in this edition)`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 4.0**\n- PA response period for EOT extended to **20 working days**\n- Variations instructed under **Clause 21.0**\n- No separate Works Completion stage in this edition`
    }
  },
  {
    keywords: ['termination', 'cancel', 'cancellation', 'breach', 'insolvency', 'liquidation'],
    title: 'Contract Termination',
    response: `**Contract Termination** under JBCC PBA

**Termination by Employer:**
*For Contractor default:*
- Contractor fails to proceed with the works regularly and diligently
- Contractor becomes insolvent or placed in liquidation
- Contractor abandons the contract
- Contractor ignores a valid Principal Agent instruction for 7 days

**Termination by Contractor:**
*Grounds include:*
- Employer fails to pay a certified amount after due date
- Employer prevents the Contractor from carrying out the works
- Employer becomes insolvent

**Consequences of Termination:**
- Works are measured at date of termination
- All materials on site and plant remain for use by Employer (until account settled)
- Final account prepared — includes all costs incurred, loss of profit, overhead recovery

⚠️ **Do not abandon site before following the correct termination procedure — this constitutes breach and exposes you to damages claims.**`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- **4 separate termination clauses:** Clauses 35.0–38.0\n- Termination by Employer: **Clause 35.0** — 7-day remedy notice\n- Termination by Contractor: **Clause 36.0** — 14-day remedy period\n- No standalone suspension clause`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Termination consolidated into **single Clause 30.0**\n- Previous 4 clauses collapsed into 1 for clarity\n- **New standalone suspension clause** introduced (**Clause 29.0**)\n- Employer pays within **7 days** after due date for contractor termination ground`
    }
  },
  {
    keywords: ['defects', 'defect', 'snag', 'snagging', 'liability period', 'dlp', 'works completion'],
    title: 'Defects Liability',
    response: `**Defects Liability Period (DLP)** under JBCC PBA

**Defects Liability Period:**
- Typically **12 months** from the date of Practical Completion (stated in Contract Data)
- Some contracts specify different periods for different elements
- During the DLP, the Contractor must remedy all defects within **reasonable timeframes**

**Contractor's Obligations:**
- Attend to defect notifications promptly — within agreed timeframes
- Access must be granted to the building (coordinate with occupants)
- Keep records of all defect repair visits

**Employer's Obligations:**
- Must notify defects in writing within the DLP
- Cannot use the defects process to claim for items outside the original scope

**Latent Defects:**
- Defects that become apparent after the DLP (hidden defects)
- May be claimed under common law for up to **3 years** (prescription)
- If fraudulent concealment, prescription period is extended

**Key Tip:** Issue a detailed snagging list at Practical Completion and agree timelines for each item in writing. Document all remediation work with photos and sign-off sheets.`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clauses 29.0–30.0**\n- **Works Completion** exists as a separate stage — PA inspects after DLP\n- **Works Completion Certificate** triggers release of remaining retention (5%)\n- Remaining retention released on Works Completion`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 26.0**\n- **Works Completion** as a separate stage has been **removed**\n- Retention released after DLP and defect remediation\n- Streamlined completion process`
    }
  },
  {
    keywords: ['penalty', 'penalties', 'delay damages', 'liquidated damages', 'ld'],
    title: 'Penalty / Delay Damages',
    response: `**Delay Damages (Penalties)** under JBCC PBA

Under JBCC, delay damages are referred to as **'Delay Damages'** (not 'penalties' in the strict legal sense).

**Key Principles:**
- The Contractor pays delay damages for every **calendar day** the contract overruns the Completion Date
- The amount is pre-agreed in the Contract Data (e.g., R5 000/day)
- Delay damages are the Employer's sole remedy for late completion — they cannot claim additional consequential losses unless fraud is proven

**When Delay Damages Apply:**
- Completion Date passes without Practical Completion
- No valid EOT has been granted to cover the period
- The delay is the Contractor's risk

**When Delay Damages DO NOT Apply:**
- During periods covered by a granted EOT
- After a new Completion Date has been agreed in writing
- If the Employer has contributed to the delay (prevention principle)

**Reduction/Cancellation of Delay Damages:**
- Apply formally for an EOT — this suspends and may extinguish accrued delay damages
- If the EOT is retrospective, all delay damages for that period must be refunded/credited

⚠️ **Delay damages can accumulate rapidly on large contracts. Apply for EOT immediately when any delay event occurs.**`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clause 29.4** and the Contract Data\n- EOT procedure under **Clause 29.0–29.2**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 23.4** and the Contract Data\n- EOT procedure under **Clause 23.0–23.2**\n- PA response period for EOT extended to **20 working days**`
    }
  },
  {
    keywords: ['variation', 'variations', 'change', 'instruction', 'vo', 'variation order'],
    title: 'Variations',
    response: `**Variations & Adjustments** under JBCC PBA

**What Constitutes a Variation:**
- Any change, alteration, addition, or omission to the works instructed by the Principal Agent
- Changes to the sequence or timing of the works
- Changes to the specification or drawings
- Omission of work subsequently given to another contractor

**Procedure:**
1. Principal Agent issues a written **Site Instruction (SI)** or **Variation Order (VO)**
2. Contractor must comply immediately with all reasonable instructions
3. Contractor must provide a **Cost Adjustment Paper (CAP)** — priced variation — within a reasonable time
4. Principal Agent approves, negotiates, or refers to determination under the contract

**Valuation of Variations:**
- Use contract rates where applicable
- Pro-rata rates where work is similar in character
- Daywork rates if nature is fundamentally different — must be agreed in advance
- Reasonable cost + markup if no other method is applicable

**Oral Instructions:**
- If the PA gives an oral instruction, confirm it in writing within **24 hours**
- If PA does not withdraw within **48 hours**, the written confirmation stands as a valid instruction

**Key Tips:**
- Never carry out variations without a written instruction
- Price variations **before** commencing where possible
- Keep a variation register updated and reconcile against the Contract Sum monthly`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clause 23.0**\n- Valuation rules under **Clause 23.5**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 21.0**\n- Revised valuation provisions`
    }
  },
  {
    keywords: ['insurance', 'guarantee', 'performance bond', 'retention bond', 'risk'],
    title: 'Insurance & Guarantees',
    response: `**Insurance & Guarantees** under JBCC PBA

**Contractor's Insurance Obligations:**
- **Contract Works/All Risk Insurance** — covers the full replacement value of the works
- **Public Liability Insurance** — minimum R5 million (or as stated in Contract Data)
- **Employer's Liability / COIDA** — mandatory for all employees on site
- Policies must be in joint names of Contractor and Employer

**Performance Guarantee:**
- Contractor must provide a Performance Guarantee typically equal to **10% of the Contract Sum**
- Issued by an approved bank or insurance company (ASISA-member insurer)
- The Employer may only call on the guarantee after following the correct breach/termination procedure

**Retention Guarantee (Alternative to Cash Retention):**
- A bank-backed guarantee in lieu of cash retention deductions
- Must be agreed in the Contract Data at the outset
- Gives the Contractor access to full cash flow during the project

**Key Tip:** Ensure all insurance policies are in place and certified copies submitted to the Employer **before work commences** — lack of insurance can be grounds for stopping work.`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clauses 8.0–13.0**\n- Performance Guarantee: **Clause 13.0** — remains until Works Completion Certificate\n- Employer insurance: **Clause 9.0**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clauses 8.0–11.0**\n- Insurance **expanded** — now covers direct contractors, free issue items, and marine transit of imported materials\n- Policy deductible provisions revised (Clause 10.6 replaces Clause 10.5 from Ed 6.1)`
    }
  },
  {
    keywords: ['subcontractor', 'nominated', 'selected', 'nssc', 'ns subcontract', 'domestic sub'],
    title: 'Subcontractors',
    response: `**Subcontractor Management** under JBCC PBA & the N/S Subcontract

**Types of Subcontractors under JBCC:**

**1. Nominated Subcontractors:**
- Selected and instructed by the Employer/Principal Agent
- Contractor must enter into the JBCC N/S Subcontract Agreement
- Risks flow between main contract and subcontract via "mirror" provisions
- Contractor is responsible to Employer for Nominated Sub's performance

**2. Selected Subcontractors:**
- Listed in the contract documents
- Contractor has limited choice to select from the list
- Same N/S Subcontract Agreement applies

**3. Domestic Subcontractors:**
- Chosen by the Contractor freely
- Standard domestic subcontract may be used
- Contractor bears full risk

**Key Rules:**
- Contractor cannot subcontract the whole of the works without Employer written consent
- Domestic subcontractors require Principal Agent approval
- Contractor remains fully liable to the Employer for all subcontractor work

**N/S Subcontract Key Provisions:**
- Payment must be paid to N/S Subcontractor within **5 days** of Contractor receiving payment
- "Pay when paid" provisions are **not permitted** under the Housing Protection Measures Act
- Subcontractor EOT provisions mirror the main contract

⚠️ **Nominated subcontractor delays are generally Employer-risk events for EOT purposes.**`,
    revisionNotes: {
      '2007': `\n\n📘 **Edition 5.0 (2007) — Specific Notes:**\n- Governed by **Clause 16.0** & the N/S Subcontract Agreement\n- Nominated Sub delays: Employer-risk per **Clause 25.3.5**`,
      '2018': `\n\n📘 **Edition 6.2 (2018) — Specific Notes:**\n- Governed by **Clause 14.0** & the N/S Subcontract Agreement\n- Nominated Sub delays: Employer-risk provisions updated`
    }
  }
];

// ─── Matcher Function ───────────────────────────────────────
function getOfflineResponse(userMessage, revision) {
  const rev = revision || '2018';
  const msg = userMessage.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of JBCC_KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (msg.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    let text = bestMatch.response;
    // Append revision-specific notes if available
    if (bestMatch.revisionNotes && bestMatch.revisionNotes[rev]) {
      text += bestMatch.revisionNotes[rev];
    }
    return { title: bestMatch.title, text };
  }

  // Generic fallback
  const edLabel = rev === '2007' ? 'Edition 5.0 (2007)' : 'Edition 6.2 (2018)';
  return {
    title: 'VDLV-JBCC Assistant',
    text: `I have comprehensive knowledge of the **JBCC Suite of Contracts** — you are currently viewing **${edLabel}**. To get live AI responses, please add your **Anthropic API key** in Settings (⚙️ top right).

**Topics I can help with:**
- Practical Completion & Defects Liability
- Payment certificates & Recovery Statements
- Extensions of Time (EOT) claims
- Variations & Site Instructions
- Delay Damages / Penalties
- Contract Termination & Suspension
- Adjudication & Dispute Resolution
- Principal Agent duties
- Insurance & Performance Guarantees
- Subcontractor management

Try asking about any of these topics, or click a quick prompt below.`
  };
}
