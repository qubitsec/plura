# PLURA-XDR Proposal

## 0️⃣ Proposal Summary

### Business Impact (CEO & Board Perspective)

Implementing PLURA-XDR enables Coupang to proactively prevent large-scale credential stuffing and data-exfiltration incidents that could lead to substantial financial loss, regulatory penalties, and compliance violations.

It strengthens security posture without requiring additional feature development from engineering, minimizing resource overhead and operational friction.

---

The security organization must be able to detect and control intrusion and data-exfiltration attempts autonomously — without depending on engineering change notifications or HR events.

In reality, engineering offboarding, privilege changes, and deployment updates are often discovered late by security.

What Coupang needs is not reactive security, but an autonomous operating standard driven by behavior signals.

---

### PLURA-XDR is proposed on four principles:

1. Key rotation (Layer 1) is mandatory — but insufficient alone.
2. Brute-force evidence lives in request bodies and outcome signals.
3. Behavior (not IP count) defines the attack.
4. Remove dependence on organizational events.

---

## 1️⃣ Reframe the Assumption

Offboarding is not merely an HR event — it is a security event.

Keys may already have left controlled environments.

Design must begin with:
> “Keys may already be leaked.”

Security often learns changes late.

Therefore:
Security must still work even when we don’t know.

---

## 2️⃣ Why Key Rotation Alone Is Insufficient

Key rotation leaves:

- Pre-rotation gaps
- Rotation delays
- Ongoing automation by attackers

Key control = asset governance  
Brute-force defense = behavior control  

Both are required.

---

## 3️⃣ Why Access-Log-Centric Detection Fails

Access Logs record:
- IP
- URL
- Status code

Example:
POST /login 200

Actual attack payload lives in the request body.

Failure reasons may exist only in response bodies.

Without body visibility, attacks appear normal.

---

## 4️⃣ Core Proposal: Request Bodies + Outcome Signals

### 4-1 POST Body Is Foundational

Attack evidence typically resides in the POST Body.

HTTPS hides payloads from network devices.

Collection must occur at:
- Web server
- WAF
- API gateway

Partial collection can be bypassed.

Full collection is recommended.

---

### 4-2 Response Outcome Signals Enable Safe Blocking

Key signals:
- Success/failure
- Failure reason
- Token issuance outcome

These reduce false positives and allow safe enforcement.

Structured outcome fields may be collected without storing full response bodies.

---

## 5️⃣ Detection Even with Leaked Keys

Valid signatures do not equal benign intent.

Attack patterns exhibit:
- Time density
- Repetition
- Baseline deviation
- Automation persistence

PLURA-XDR uses:
Threshold (Stage 1) + Session Behavior (Stage 2)

Detection remains effective under distributed IP scenarios.

---

## 6️⃣ Distributed IP ≠ Undetectable

IP count is not the signal.

Signal = repetition + density + deviation.

Defense must shift to:
Account / Key / Session / Endpoint behavior.

---

## 7️⃣ Autonomous Security Architecture

Security must own:

### 1. Observability
- Collect request bodies
- Collect outcome signals
- Apply masking / retention controls

### 2. Detection
- Threshold logic
- Correlation rules
- Baseline deviation analysis

### 3. Enforcement
- Throttle
- Step-up authentication
- Block / quarantine
- Exception / rollback controls

---

### Recommended Flow

1. Termination-point visibility
2. PLURA-XDR behavior detection
3. Staged automated enforcement
4. Parallel key rotation

---

## 8️⃣ One-Sentence Summary

Even if keys are taken and valid signatures are possible, attacks reveal themselves through repetitive and automated behavior captured in request bodies and response outcome signals.

PLURA-XDR provides a Layer-2 defense that detects and blocks brute-force attacks using thresholds + session behavior.

Security can operate autonomously — even when organizational awareness is delayed.

---

## 9️⃣ Execution Plan: Security-Led Pilot

Start with:

- Login / Auth / Token endpoints
- Configuration at termination point
- Minimal engineering dependency

Enable:
- Body collection with masking
- Outcome signal normalization
- Threshold + session detection
- Staged enforcement

---

## 🔟 Final Takeaway

- Assume keys may be leaked.
- Deploy defense in depth.
- Build visibility foundation.
- Remove organizational dependence.

---

## Demo

https://youtu.be/l6JeCeWeVSo
