// ============================================================
// VDLV-JBCC KNOWLEDGE BASE — Offline Fallback Responses
// ============================================================
// When no API key is set, this module provides keyword-matched
// answers for the most common JBCC contract questions.
// ============================================================

const JBCC_KNOWLEDGE = [
  {
    keywords: ['practical completion', 'works completion', 'pc', 'complete'],
    title: 'Practical Completion (Clause 28.0)',
    response: `**Practical Completion** under the JBCC PBA refers to the stage at which the works are complete enough to be used for their intended purpose, even if minor outstanding items (snags) remain.

**Key Points:**
- Defined under **Clause 28.0** of the JBCC PBA 6th Edition
- The Contractor must notify the Principal Agent in writing when the works are practically complete
- The Principal Agent must issue a **Practical Completion Certificate** within 5 working days of inspection
- Works must be free of defects that would prevent reasonable use
- Outstanding items must be listed and agreed upon — non-material

**What triggers Practical Completion:**
- Occupation of the building by the Employer
- Commencement of the Defects Liability Period
- Release of half the retention (if applicable)
- Delay damages cease to apply

**Critical Notice:** The Contractor's written notification triggers the inspection process. If the Principal Agent fails to respond within the required timeframe, escalate formally in writing citing **Clause 28.1**.`
  },
  {
    keywords: ['payment', 'certificate', 'payment certificate', 'recovery statement', 'interim payment'],
    title: 'Payment Process (Clauses 31.0–32.0)',
    response: `**JBCC Payment Process** — Clause 31.0 (Interim Payments) & Clause 32.0 (Final Payment)

**Interim Payment Cycle:**
1. Contractor submits a **Recovery Statement** (payment application) by the agreed date each month
2. Principal Agent issues an **Interim Payment Certificate** within **7 days** of receiving the Recovery Statement
3. Employer pays within **7 days** of receiving the certificate (or as stated in the Contract Data)
4. Total cycle: typically **14 days** from submission to payment

**Key Rules:**
- Late payment triggers interest under **Clause 31.12** — interest may be compounded
- The Principal Agent cannot reduce a certified amount without written reasons
- Retentions: typically 10% retained up to practical completion, then reduced to 5% during defects period
- **Overdue certificates** give the Contractor grounds for suspension under **Clause 31.13**

**Final Account (Clause 32.0):**
- Contractor submits Final Recovery Statement within 90 days of Practical Completion
- Principal Agent certifies within 21 days
- Employer pays within 14 days of certification

⚠️ **Always track your Recovery Statement submission dates and follow up in writing if a certificate is overdue.**`
  },
  {
    keywords: ['extension of time', 'eot', 'delay', 'time claim', 'programme', 'completion date'],
    title: 'Extension of Time (Clause 25.0)',
    response: `**Extension of Time (EOT) Claims** — JBCC PBA Clause 25.0

**Grounds for EOT (Clause 25.3):**
- Employer risk events (delays by Employer or their agents)
- Late information or instructions from Principal Agent
- Force majeure or exceptional adverse weather
- Civil commotion, strikes affecting the works
- Variations instructed that impact the programme
- Employer-supplied materials not delivered timeously

**Procedure — Critical Deadlines:**
1. **Notify within 14 days** of becoming aware of the delay event (written notice to Principal Agent)
2. Submit detailed particulars of the claim within **14 days** of notification
3. Submit final particulars when the effect of the delay can be fully assessed
4. Principal Agent must grant or refuse EOT within **7 days** of receiving particulars

⚠️ **Missing the 14-day notification window can bar your claim entirely — act immediately.**

**Documentation Required:**
- Updated construction programme showing delay impact
- Daily site records / weather reports
- Correspondence records proving the delay cause
- Cost impact (if claiming concurrent damages)

**Concurrent Delays:** If both Contractor and Employer delays occur simultaneously, generally no EOT is granted for that period but delay damages are also not applied.`
  },
  {
    keywords: ['adjudication', 'dispute', 'mediation', 'asaqs', 'afsa', 'arbitration'],
    title: 'Dispute Resolution (Clauses 40.0–42.0)',
    response: `**JBCC Dispute Resolution** — Clauses 40.0–42.0

**Three-tier process:**

**1. Mediation (Clause 40.0)**
- Either party may refer a dispute to mediation
- A mediator is appointed by agreement or by ASAQS / AFSA
- Mediation must occur within **20 working days** of appointment
- Non-binding unless parties agree to accept the outcome

**2. Adjudication (Clause 41.0)**
- The primary binding dispute mechanism under JBCC
- Either party can refer to adjudication at any time
- Adjudicator appointed from ASAQS or AFSA panel
- Adjudicator decides within **28 days** of receiving all submissions (extendable by agreement)
- Decision is **immediately binding and enforceable** — parties must comply even if challenging
- Can be reviewed by arbitration afterwards

**3. Arbitration (Clause 42.0)**
- Final and binding — conducted under AFSA rules
- Only after adjudication has been concluded (or refused)

**Key Tips:**
- Always issue a formal **Notice of Dispute** in writing, citing the clause and dispute value
- Preserve all evidence: correspondence, site instructions, certificates, photos
- Engage a construction lawyer or ASAQS member for disputes above R500 000`
  },
  {
    keywords: ['principal agent', 'pa', 'architect', 'duties', 'certifier', 'agent duties'],
    title: 'Principal Agent Duties (Clause 6.0)',
    response: `**Principal Agent (PA) — Role & Duties** — JBCC PBA Clause 6.0

The Principal Agent acts as the **contract administrator** and has duties to both parties — they must act fairly and impartially in their certificate-issuing role.

**Core Duties:**
- Issue all certificates required under the contract (payment, completion, defects, etc.)
- Issue instructions and variations in accordance with Clause 23.0
- Maintain and monitor the construction programme
- Inspect works and record progress
- Coordinate other Employer consultants and nominated subcontractors
- Administer the contract strictly in accordance with its terms

**Powers of the PA:**
- Instruct variations (additions, omissions, changes)
- Reject non-compliant work
- Order removal of defective materials from site
- Issue notice of delay under Clause 25.0
- Certify Practical Completion, Works Completion, and the Final Account

**Limits on PA Powers (Clause 6.3):**
- The PA cannot waive or alter the terms of the contract
- Cannot bind the Employer beyond the contract provisions
- Must act within the scope of their appointment

**If the PA is acting improperly:**
- Issue a formal written complaint to the Employer
- Refer to Adjudication if the PA refuses to issue a certificate you believe is due`
  },
  {
    keywords: ['termination', 'cancel', 'cancellation', 'breach', 'insolvency', 'liquidation'],
    title: 'Contract Termination (Clauses 35.0–38.0)',
    response: `**Contract Termination** — JBCC PBA Clauses 35.0–38.0

**Termination by Employer (Clause 35.0):**

*For Contractor default:*
- Contractor fails to proceed with the works regularly and diligently
- Contractor becomes insolvent or placed in liquidation
- Contractor abandons the contract
- Contractor ignores a valid Principal Agent instruction for 7 days

**Procedure:** Employer issues written notice identifying the breach → Contractor has **7 days** to remedy → If unremedied, Employer issues Notice of Termination

**Termination by Contractor (Clause 36.0):**

*Grounds include:*
- Employer fails to pay a certified amount for more than **7 days** after due date
- Employer prevents the Contractor from carrying out the works
- Employer becomes insolvent

**Procedure:** Contractor issues written notice → **14-day** remedy period → If unremedied, Contractor may terminate

**Consequences of Termination:**
- Works are measured at date of termination
- All materials on site and plant remain for use by Employer (until account settled)
- Final account prepared — includes all costs incurred, loss of profit, overhead recovery

⚠️ **Do not abandon site before following the correct termination procedure — this constitutes breach and exposes you to damages claims.**`
  },
  {
    keywords: ['defects', 'defect', 'snag', 'snagging', 'liability period', 'dlp', 'works completion'],
    title: 'Defects Liability (Clauses 29.0–30.0)',
    response: `**Defects Liability Period (DLP)** — JBCC PBA Clauses 29.0–30.0

**Defects Liability Period:**
- Typically **12 months** from the date of Practical Completion (stated in Contract Data)
- Some contracts specify different periods for different elements
- During the DLP, the Contractor must remedy all defects within **reasonable timeframes**

**Works Completion (Clause 29.0):**
- After the DLP expires, the Principal Agent inspects for outstanding defects
- Issues a **Works Completion Certificate** once all defects are remedied
- Remaining retention (5%) is released on Works Completion

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

**Key Tip:** Issue a detailed snagging list at Practical Completion and agree timelines for each item in writing. Document all remediation work with photos and sign-off sheets.`
  },
  {
    keywords: ['penalty', 'penalties', 'delay damages', 'liquidated damages', 'ld'],
    title: 'Penalty / Delay Damages (Clause 25.4)',
    response: `**Delay Damages (Penalties)** — JBCC PBA Clause 25.4

Under JBCC, delay damages are referred to as **'Delay Damages'** (not 'penalties' in the strict legal sense), governed by **Clause 25.4** and the Contract Data.

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
- Apply formally for an EOT (Clause 25.0) — this suspends and may extinguish accrued delay damages
- If the EOT is retrospective, all delay damages for that period must be refunded/credited

⚠️ **Delay damages can accumulate rapidly on large contracts. Apply for EOT immediately when any delay event occurs.`
  },
  {
    keywords: ['variation', 'variations', 'change', 'instruction', 'vo', 'variation order'],
    title: 'Variations (Clause 23.0)',
    response: `**Variations & Adjustments** — JBCC PBA Clause 23.0

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

**Valuation of Variations (Clause 23.5):**
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
- Keep a variation register updated and reconcile against the Contract Sum monthly`
  },
  {
    keywords: ['insurance', 'guarantee', 'performance bond', 'retention bond', 'risk'],
    title: 'Insurance & Guarantees (Clauses 8.0–13.0)',
    response: `**Insurance & Guarantees** — JBCC PBA Clauses 8.0–13.0

**Contractor's Insurance Obligations (Clause 8.0):**
- **Contract Works/All Risk Insurance** — covers the full replacement value of the works
- **Public Liability Insurance** — minimum R5 million (or as stated in Contract Data)
- **Employer's Liability / COIDA** — mandatory for all employees on site
- Policies must be in joint names of Contractor and Employer

**Employer's Insurance (Clause 9.0):**
- Employer may insure existing structures if applicable
- Professional Indemnity insurance for the Principal Agent and consultants

**Performance Guarantee (Clause 13.0):**
- Contractor must provide a Performance Guarantee typically equal to **10% of the Contract Sum**
- Issued by an approved bank or insurance company (ASISA-member insurer)
- Remains in force until issue of the Works Completion Certificate
- The Employer may only call on the guarantee after following the correct breach/termination procedure

**Retention Guarantee (Alternative to Cash Retention):**
- A bank-backed guarantee in lieu of cash retention deductions
- Must be agreed in the Contract Data at the outset
- Gives the Contractor access to full cash flow during the project

**Key Tip:** Ensure all insurance policies are in place and certified copies submitted to the Employer **before work commences** — lack of insurance can be grounds for stopping work.`
  },
  {
    keywords: ['subcontractor', 'nominated', 'selected', 'nssc', 'ns subcontract', 'domestic sub'],
    title: 'Subcontractors (Clause 16.0 & N/S Subcontract)',
    response: `**Subcontractor Management** — JBCC PBA Clause 16.0 & the N/S Subcontract

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

**Key Rules (Clause 16.0):**
- Contractor cannot subcontract the whole of the works without Employer written consent
- Domestic subcontractors require Principal Agent approval
- Contractor remains fully liable to the Employer for all subcontractor work

**N/S Subcontract Key Provisions:**
- Payment must be paid to N/S Subcontractor within **5 days** of Contractor receiving payment
- "Pay when paid" provisions are **not permitted** under the Housing Protection Measures Act
- Subcontractor EOT provisions mirror the main contract

⚠️ **Nominated subcontractor delays are generally Employer-risk events for EOT purposes (Clause 25.3.5).**`
  }
];

// ─── Matcher Function ───────────────────────────────────────
function getOfflineResponse(userMessage) {
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
    return { title: bestMatch.title, text: bestMatch.response };
  }

  // Generic fallback
  return {
    title: 'VDLV-JBCC Assistant',
    text: `I have comprehensive knowledge of the **JBCC Suite of Contracts** including the PBA 6th Edition, Minor Works Agreement, and N/S Subcontract. To get live AI responses, please add your **Anthropic API key** in Settings (⚙️ top right).

**Topics I can help with:**
- Practical Completion & Works Completion
- Payment certificates & Recovery Statements
- Extensions of Time (EOT) claims
- Variations & Site Instructions
- Delay Damages / Penalties
- Defects Liability Period
- Adjudication & Dispute Resolution
- Principal Agent duties
- Insurance & Performance Guarantees
- Subcontractor management

Try asking about any of these topics, or click a quick prompt below.`
  };
}
