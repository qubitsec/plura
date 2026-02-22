# PLURA-XDR Proposal — Executive Brief

*Autonomous Layer-2 defense for brute-force authentication under key leakage & offboarding visibility gaps*

> **Business impact:** Reduce financial loss and legal/compliance exposure by containing large-scale credential stuffing and data-exfiltration attempts early - without consuming engineering cycles.
> **CISO reality:** If security must be told what changed, security will miss what matters. Valid signatures do not guarantee benign intent.
> **Ask:** Approve a security-led pilot and three operating approvals (visibility, data controls, staged enforcement).

## Why this matters (CISO lens)

- Offboarding, privilege changes, and deployment changes are often discovered late by security — creating unavoidable blind spots.
- If signing/authentication keys leave controlled environments, attackers can send requests that look legitimate at the header/signature level.
- Access Logs alone (URL/status/IP) rarely provide decisive evidence; the signal is typically in request payloads and outcomes.

## What we are proposing

Establish an autonomous operating standard — “Observability + Enforcement” — so the security organization can detect and control brute-force/automation attempts based on system behavior signals, without waiting for perfect cross-team collaboration.

- Layer 1 (mandatory): Key rotation / revocation to reduce exposure.
- Layer 2 (proposed): Behavior-based detection and staged enforcement for brute-force attempts — even when requests are signed with valid keys.

## At-a-glance: what changes

| If we only rotate keys | With PLURA-XDR Layer-2 |
| --- | --- |
| Windows of exposure remain (pre/post-rotation gaps, delays, sustained automation). | Behavior signals trigger containment even during gaps or delayed awareness. |
| Signed requests can appear normal; distributed IPs dilute IP-only rules. | Threshold + session-behavior logic correlates by key/account/session/endpoint (not IP). |
| Limited evidence for fast triage and scope assessment. | Request-body + outcome signals improve confidence, triage speed, and investigation quality. |

## Core idea: request bodies + response outcome signals

- Collect request bodies (POST Body) and response outcome signals (success/failure + reason) at the HTTPS termination/decryption point (web server / WAF / API gateway).
- When full response-body retention is unnecessary, collect only structured outcome fields — reducing privacy/performance/cost risk while improving enforcement accuracy.

## How detection works (high level)

- Stage 1 — Threshold trigger: abnormal failures/retries exceed the normal baseline for the same key/account/session.
- Stage 2 — Session-behavior confirmation: repetitive/automated authentication or token-issuance flows are observed in-session.
- Enforcement is staged (throttle → step-up → block/quarantine) to reduce false positives and maintain service stability.

## Security-led deployment (minimal engineering dependency)

This approach is designed so security can execute primarily through configuration and policy at the termination point — without waiting on application feature work. Engineering involvement is optional for later optimization, not a prerequisite to start.

- Pilot scope: start with the highest-risk endpoints (login / auth / token issuance).
- Week 1–2: enable collection at the termination point with field-level masking/hashing, access separation, and retention controls.
- Week 2–3: baseline normal behavior; enable threshold + session-behavior detection rules.
- Week 3–4: enable staged enforcement; tune false-positive controls (exceptions/rollback).
- Pilot deliverables: baseline profile, detection & enforcement policy set, and an operational playbook for SOC/IR.

## Decisions and minimal approvals required

- Authorize collection at the termination point (request bodies + outcome signals) as the visibility foundation.
- Approve sensitive-data handling principles (masking/hashing, access separation, retention) to keep compliance risk controlled.
- Approve staged enforcement scope (throttle → step-up → block/quarantine) for rapid containment with operational safety.

## Expected impact

- Detect and contain brute-force automation even when requests are signed with valid keys.
- Reduce dependence on organizational event awareness (offboarding, deployments) by operating on behavior signals.
- Improve investigation quality and scope assessment through structured request/outcome evidence.
- Complement existing WAF/SIEM/bot defenses by strengthening the visibility foundation they depend on.

## Reference demo

### 🎥 Demo video: defending against high-volume API access using a stolen JWT

- https://youtu.be/l6JeCeWeVSo
