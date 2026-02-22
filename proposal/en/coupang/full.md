# PLURA-XDR Proposal — Executive Brief

Autonomous Layer-2 Defense for Brute-Force Authentication  
Under Key Leakage & Offboarding Visibility Gaps

## Business Impact (CEO Perspective)

By implementing PLURA-XDR, Coupang can proactively prevent large-scale credential stuffing and data-exfiltration incidents that may result in significant financial losses, regulatory penalties, and compliance violations.  

At the same time, this approach strengthens security without requiring additional engineering feature development, minimizing resource waste and operational disruption.

---

## Why This Matters (CISO Lens)

Operationally, security cannot rely on timely engineering change notifications or HR offboarding events to stay ahead of intrusion and data-exfiltration attempts.

Valid signatures do not guarantee benign intent.

If signing/authentication keys leave controlled environments, attackers can send requests that appear legitimate at the header/signature level.

Access Logs alone (URL/status/IP) rarely provide decisive evidence; the signal is typically in request payloads and response outcomes.

---

## What We Are Proposing

Establish an autonomous operating standard — **“Observability + Enforcement”** — so security can detect and control brute-force/automation attempts based on system behavior signals, without waiting for perfect cross-team collaboration.

### Layer 1 (Mandatory)
Key rotation / revocation to reduce exposure.

### Layer 2 (Proposed)
Behavior-based detection and staged enforcement for brute-force attempts — even when requests are signed with valid keys.

---

## At-a-Glance: What Changes

### If We Only Rotate Keys
- Windows of exposure remain (pre/post-rotation gaps, delays).
- Signed requests appear normal.
- Limited evidence for rapid triage.

### With PLURA-XDR Layer-2
- Behavior signals trigger containment during gaps.
- Threshold + session behavior correlates by key/account/session.
- Request-body + outcome signals improve investigation quality.

---

## Core Idea: Request Bodies + Response Outcome Signals

Collect:

- Request bodies (POST Body)
- Response outcome signals (success/failure + reason)

at the HTTPS termination point (web server / WAF / API gateway).

When full response storage is unnecessary, collect structured outcome fields only.

---

## Detection Model (High Level)

Stage 1 — Threshold Trigger  
Abnormal failures/retries exceed baseline for key/account/session.

Stage 2 — Session Behavior Confirmation  
Repetitive/automated authentication flows detected.

Enforcement is staged:
Throttle → Step-up → Block/Quarantine

---

## Security-Led Deployment (Minimal Engineering Dependency)

Designed for security to execute primarily via configuration at the termination point.

### Pilot Scope
Login / Auth / Token endpoints

### 4-Week Pilot
Week 1-2: Enable visibility with masking & retention controls  
Week 2-3: Baseline behavior  
Week 3-4: Enable staged enforcement  

Deliverables:
- Baseline profile
- Detection & enforcement policy set
- Operational playbook

---

## Minimal Approvals Required

1. Authorization for termination-point visibility
2. Approval of sensitive-data handling controls
3. Approval of staged enforcement scope

---

## Expected Impact

- Detect brute-force automation even with valid keys
- Reduce dependence on HR/engineering awareness
- Improve triage and forensic precision
- Complement existing WAF/SIEM/Bot defenses

---

## Reference Demo

https://youtu.be/l6JeCeWeVSo
