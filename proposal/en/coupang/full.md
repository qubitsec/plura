# PLURA-XDR Proposal

---

## 0️⃣ Proposal Summary

The security organization must be able to detect and control intrusion and data-exfiltration attempts autonomously — without depending on engineering change notifications or HR events.

In reality, engineering hires/offboarding, privilege changes, and deployment/development changes are not always visible to the security organization first — and often arrive late.

Any design that only works “when collaboration is perfect” inevitably creates blind spots.

What Coupang needs is not “security that reacts when people/processes tell us,” but an operational security standard that can detect and enforce controls autonomously based on system behavior signals — even if security is informed late.

PLURA-XDR is proposed on the following four points:

1. **Key rotation / revocation (Layer 1)** is mandatory.
   However, it cannot fully cover pre/post-rotation gaps, delays, and automated attacks.
   → A **behavior-based brute-force detection and blocking layer (Layer 2)** is required — even when “the attacker already has the key.”

2. Evidence of brute-force attacks rarely appears in Access Log surfaces (URL/status/IP).
   It exists in **request bodies (POST Body)** and **response outcome signals (success/failure + reason).**
   → Only request-body + response-outcome analysis reliably connects detection to blocking.

3. Even under distributed IP attacks, the essence is not IP count.
   It is repetition, time density, automation patterns, and deviation from baseline.
   → Detection must operate at the account/key/session/endpoint level.

4. Remove dependence on organizational events.
   Even without real-time offboarding/change sharing, security must operate autonomously via **Observability + Enforcement**.

---

## 1️⃣ Reframe the assumption: Offboarding is a security event

When key custodians leave, the possibility that keys moved outside controlled environments becomes a risk in itself.

The correct starting assumption:

> Not “keys were probably not taken.”
> But “they may already have been taken.”

Security often learns facts late.
HR-triggered key rotation alone leaves gaps.

We need security that works even when we **don’t know**.

---

## 2️⃣ Why key rotation alone is insufficient

Rotation is necessary — but gaps remain:

* Pre-rotation exposure windows
* Operational delays
* Sustained automation by attackers already holding keys

Key control = asset governance
Brute-force defense = behavior control

Both are required.

---

## 3️⃣ Why access-log-centric detection fails

Access logs show:

* IP
* Time
* Method
* URL
* Status code

Example:

```
POST /login ... 200
```

Looks normal.

But attack payload exists inside the **request body**.

Many systems return HTTP 200 while embedding failure reasons inside response JSON.

Without body/outcome signals → attacks look normal.

---

## 4️⃣ Core proposal: analyze request bodies + response outcome signals

### 4-1 Request body is foundational

Decisive attack evidence is inside POST Body.

In HTTPS environments:

* Network devices cannot see payload
* Only termination point (WAF/API Gateway/Web server) can collect it

Partial collection is unsafe.

Full collection recommended.

Security can implement via configuration at termination point — no major engineering dependency.

---

### 4-2 Response outcome signals enable safe blocking

Brute-force is defined by:

* Success/failure patterns
* Failure reasons
* Token issuance behavior

Combining:

**Request body + outcome signal**
→ Accurate detection
→ Safe automated enforcement

Structured outcome collection reduces privacy and performance risk.

---

## 5️⃣ Detection logic: thresholds + session behavior

Even with valid keys:

* Time density anomalies
* Repetitive login/token calls
* Baseline deviation
* Automation persistence

PLURA-XDR uses:

Stage 1 — Threshold trigger
Stage 2 — Session behavior confirmation

Not IP blacklists.

---

## 6️⃣ Distributed IP ≠ undetectable

IP count is irrelevant.

Detection focuses on:

* Repetition
* Time density
* Automation
* Deviation

Behavior correlation neutralizes distributed IP evasion.

---

## 7️⃣ Autonomous deployment architecture

### 7-1 Security-owned foundation

Security must directly own:

1. Observability pipeline
2. Detection rules
3. Enforcement policy

Privacy handled via masking, hashing, retention control.

---

### 7-2 Implementation flow

1. Collect request bodies + outcome signals at termination point
2. Apply behavior detection in PLURA-XDR
3. Stage enforcement:

   * Throttle
   * Step-up
   * Block/quarantine

Parallel key rotation minimizes exposure windows.

---

## 8️⃣ One-sentence summary

Even if keys are taken and legitimate signatures are possible, attacks reveal themselves through repetitive/automated behavior captured in request bodies and response outcome signals.

PLURA-XDR provides a Layer-2 defense based on thresholds + session behavior.

---

## 9️⃣ Security-led pilot

Start immediately:

* Scope: login/auth/token endpoints
* Configuration-driven
* Staged enforcement
* Minimal engineering dependency

Deliverables:

* Baseline profile
* Detection/enforcement policy
* Operational playbook

---

## 🔟 Final takeaway

* Assume keys may be leaked
* Defense in depth
* Visibility foundation
* Autonomous security operation

---

🎥 Demo
[https://youtu.be/l6JeCeWeVSo](https://youtu.be/l6JeCeWeVSo)

---
