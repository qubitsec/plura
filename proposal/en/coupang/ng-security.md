## 0️⃣ Proposal Summary

**The security organization must be able to detect and control intrusion and data‑exfiltration attempts autonomously—without depending on engineering change notifications or HR events.**

In reality, engineering hires/offboarding, privilege changes, and deployment / development changes are **not always visible to the security organization first**—and often arrive late.  
Any design that only works “when collaboration is perfect” inevitably creates blind spots.

What Coupang needs is not “security that reacts when people/processes tell us,” but an **operational security standard** that can **detect and enforce controls autonomously based on system behavior signals—even if security is not informed (or is informed late).**

PLURA‑XDR is proposed on the following four points:

1. **Key rotation / revocation (Layer 1)** is mandatory.  
   However, it is difficult to fully cover pre/post‑rotation gaps, delays, and automated attacks with rotation alone.  
   → A **behavior‑based brute‑force detection and blocking layer (Layer 2)** is required—even for “an attacker who already has the key.”

2. Evidence of brute‑force attacks is not primarily on the Access Log surface (URL / status code / IP).  
   In most cases, it exists in the **request body (POST Body)** and **response outcome signals** (success/failure + reason).  
   → Only **request‑body + response‑outcome analysis** reliably connects “detection” to “blocking.”

3. Even when IPs are distributed across thousands of sources, the essence of the attack is not the IP count.  
   It is **repetition, time density, automation patterns, and deviation from the normal baseline** (success/failure rates).  
   → Detection and blocking are feasible using **behavior at the account / key / session / endpoint level**, not IP‑centric rules.

4. **Remove dependence on organizational events (key point).**  
   Even if developer offboarding or deployment changes are not shared with security in real time, the security organization must be able to operate **autonomously** through an **Observability + Enforcement** system to continuously detect and mitigate intrusion/exfiltration attempts.

---

## 1️⃣ Reframe the assumption: “Offboarding” is a security event, not just an HR event

When someone who handled keys (signing keys / authentication keys / API keys, etc.) leaves,  
the possibility that keys moved outside of security control—via laptops, personal cloud storage, backups, etc.—becomes a risk in itself.

Therefore, the starting point must be:

> Not “the keys were probably not taken,”  
> but “they **may already have been taken**.”

### (Operational reality) Security often learns facts late

In practice, security teams frequently do not receive advance notice of engineering offboarding, privilege changes, deployment schedules, or development changes—or only learn them after the fact.

A response that relies only on an HR trigger (e.g., “offboarding notice → immediate key rotation”) will inevitably leave gaps.

→ Conclusion: We need security that does not only work when we “know.”  
We need security that **still works even when we don’t**.

---

## 2️⃣ Why key rotation alone does not complete the defense

Key rotation/revocation is necessary, but the following realities remain:

- **Gaps** before rotation takes effect
- Potential **delays** in rotation
- **Sustained automation** by an attacker who already has the key

So Coupang also needs:

> A second line of defense that assumes “the attacker already has the key”  
> = **behavior‑based brute‑force detection and blocking**

Put simply:

- Key control is **asset governance**
- Brute‑force defense is **behavior control**

Both are required to prevent a small issue from becoming a major incident.

---

## 3️⃣ Why access‑log‑centric detection tends to fail

Typical web Access Logs record only IP, time, method, URL, status code, etc.

For example, the following can look normal:

- `POST /login ... 200`

But the real attempt values (account / password / token / parameters) are not in the URL—  
they occur inside the **Body (request payload).**

In many production designs, the HTTP status can remain 200, while failure reasons are only found in the response body (JSON message/code).  
→ Without request/response bodies (or at least outcome signals), it becomes easy to misclassify attacks as “normal.”

---

## 4️⃣ Core proposal: Coupang’s Layer‑2 defense must analyze “request bodies + response outcome signals”

### 4-1) Why the request body (POST Body) is a required security foundation

In most cases, the decisive evidence needed to determine web attacks exists in the **POST Body**,  
and cannot be identified from Access Logs alone.

In HTTPS environments, the payload is not visible on the network.  
Body analysis is only possible at the **decryption/termination point (web server / WAF / API gateway).**  
If you do not collect it there, there is no way to recover it later.

Partial collection (e.g., only first 8 KB, or selective parameters) can be abused by attackers.  
→ **Full, original body collection** is recommended.

※ This is not application feature development.  
It can be implemented as an **operations policy/configuration at the decryption point**,  
so it does not need to depend on engineering release schedules or change notifications.  
The security team can drive it **autonomously**.

### 4-2) Why response outcome signals are needed to connect “detection” to “safe blocking”

Brute‑force attacks are not just “a lot of requests.” They are distinguished by outcome signals such as:

- Login success/failure
- Failure reason (wrong password, account lockout, step‑up required, etc.)
- Token issuance / authorization outcomes

These signals separate true attacks from legitimate spikes (promotions/incidents) and reduce false positives when enforcing blocks.

In other words:

> Only by combining **request bodies** (attempt content) with **response outcome signals** (success/failure + reason)  
> can “accurate detection” reliably become “safe, automated blocking.”

※ If storing full response bodies is operationally heavy, collect only **structured outcome fields** (e.g., success flag and failure reason code).  
This reduces privacy/performance/cost risk while significantly improving blocking accuracy.

This can also start as an **operational extraction/normalization of existing response result fields**,  
so it does not require new application development as a prerequisite.  
The security team can operate it **independently**.

---

## 5️⃣ Why we can detect even if keys are leaked: keys may pass, but behavior is hard to hide

If signing/authentication keys are taken, request signatures/headers can look legitimate.  
However, brute‑force and automated authentication attempts typically exhibit:

- Increased request rate per unit time (time density)
- Repeated calls to the same resource (login/token)
- Deviation from the normal baseline (success‑rate drop / repeated failures)
- Persistent automation patterns (regular intervals, sustained sequences)

PLURA‑XDR’s core approach is **behavior‑based**, not IP blacklisting.  
Detection accuracy is achieved using **thresholds (Stage 1) + session behavior (Stage 2).**

Therefore, even if an attacker “looks legitimate” by holding valid keys, detection and blocking are feasible when:

- **Threshold‑based:** authentication failures/retries by the same **key/account/session** exceed the normal range  
- **Session behavior‑based:** the session shows **repetitive/automated authentication or token‑issuance flows**

---

## 6️⃣ Distributed IP is not “undetectable”—it is exactly where behavior‑based detection applies

Distributed IP is a common evasion tactic, but adding more IPs does not make an attack “normal.”

The key point is:

> Detection does not become impossible because IPs are distributed.  
> The essence of the attack is **repetition, time density, automation patterns, and deviation from baseline**.

So the defensive model must shift from IP‑centric rules to **account/key/session/endpoint behavior**.

---

## 7️⃣ Coupang deployment architecture: build foundations the security organization can operate autonomously

Most security solutions ultimately consume “events/logs.”  
If the foundation is weak, even strong tools cannot operate accurately.

### 7-1) (Key) Autonomous Operation principle for the security organization

To control intrusion/exfiltration even without real‑time HR/engineering change sharing, security must directly own and operate at least these three capabilities:

1) **Observability pipeline**  
- Collect request bodies and response outcome signals at the decryption point (web server / WAF / API gateway)  
- Control privacy and sensitivity via field‑level masking/hashing, separated access rights, and retention policies

2) **Detection policies**  
- Brute‑force / automation behavior detection at the account/key/session/endpoint level (thresholds + correlation)  
- Identify abnormal deviations from baseline (success/failure ratios, time density)

3) **Enforcement policies**  
- Staged automated responses (throttle → step‑up → block/quarantine)  
- Include exception handling, rollback, and approvals to minimize operational risk

### 7-2) Recommended implementation flow

1. **At the decryption/termination point (web server / WAF / API gateway)**  
   - Collect full request bodies (POST Body)  
   - Collect response outcome signals (at minimum: success/failure + reason + token issuance signal)

2. **In PLURA‑XDR**  
   - Behavior‑based brute‑force detection even when “the key is valid” (repetition/time density/deviation)  
   - Correlate by account/key/session/endpoint to neutralize distributed‑IP evasion

3. **Response actions (operational policy)**  
   - Stage 1: rate limiting / delay (by endpoint, key, account)  
   - Stage 2: step‑up authentication (additional verification, challenge/CAPTCHA, etc.)  
   - Stage 3: automated block/quarantine (key/account) + SOC notification  
   - Run in parallel with key rotation to minimize windows of exposure

---

## 8️⃣ One‑sentence summary

> **Even if keys are taken and “legitimate signatures” are possible, attacks reveal themselves through repetitive/automated behavior captured in request bodies and response outcome signals.  
> PLURA‑XDR provides a Layer‑2 defense that detects and blocks brute‑force attacks using thresholds + session behavior.  
> And even if engineering offboarding or development changes are not shared with security in real time, the security organization can independently detect and control intrusion/exfiltration attempts through an “Observability + Enforcement” operating standard.**

---

## 9️⃣ Execution proposal: a security‑team‑led pilot with minimal engineering dependency

In practice, the most important thing is not “perfect design,” but ensuring the security organization has control **starting now**.

This proposal starts with:

- **Minimize scope:** begin with core endpoints (login/auth/token issuance)  
- **Minimize coordination:** prioritize **decryption‑point configuration and security policy** over application feature changes  
- **Minimize false positives:** use staged enforcement (throttle → step‑up → block) to maintain stability

### 9-1) What the security team can start immediately (security‑led)

- Enable request‑body collection at the decryption point (with masking/access/retention controls)  
- Collect and normalize response outcome signals (success/failure + reason)  
- Apply threshold + session‑behavior detection rules  
- Apply staged automated enforcement (throttle / step‑up / block)

### 9-2) Minimal approvals required

Even with limited engineering collaboration, the following approvals are necessary:

- Operational authority to configure the decryption point (WAF / API gateway / web server)  
- Approval of sensitive‑data handling principles (masking, access separation, retention)  
- Approval of enforcement scope (start with staged controls rather than immediate hard blocks)

> With these three approvals,  
> the security organization can practically begin an operating model that works **even when no one tells us**.

---

## 🔟 Final takeaway: four operating principles for Coupang

- **Assumption shift:** design from “the keys may already be leaked”  
- **Defense in depth:** key rotation (Layer 1) + behavior‑based brute‑force detection/blocking (Layer 2)  
- **Visibility foundation:** analyze **request bodies (required)** + **response outcome signals (improves safe blocking)** rather than Access Logs alone  
- **Remove org dependence:** control intrusion/exfiltration through an **autonomous security operating model** that works even without HR/engineering event awareness

---

### 🎥 Demo video: defending against high‑volume API access using a stolen JWT

- https://youtu.be/l6JeCeWeVSo
