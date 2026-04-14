# PLURA-XDR Technical Comparison Proposal
## A Comparison Framework for PLURA-XDR vs. SentinelOne in Coupang’s Environment

> This document is not a full market-wide comparison across every XDR category.  
> Its scope is intentionally limited to the evaluation criteria defined below.

---

## Executive Summary

SentinelOne and PLURA-XDR can both be categorized as XDR platforms, but they are built around different analytical starting points and operational priorities.

SentinelOne is fundamentally endpoint-centric.  
PLURA-XDR is built around a linked analysis model spanning **web requests and responses, authentication and session behavior, server activity, automated response, and forensics**.

This distinction becomes particularly significant in an environment like Coupang’s, where security decisions are heavily influenced by:

- high-volume web and API traffic,
- account and session abuse,
- credential stuffing,
- leaked token or API key misuse,
- zero-day-style web exploitation,
- webshell uploads followed by server-side pivoting,
- and post-exploitation movement using native tools such as LOLBAS or GTFOBins.

Within that scope, PLURA-XDR is differentiated by combining:

- **request body analysis**,
- **response body and response signal analysis**,
- **authentication and session flow correlation**,
- **server audit-policy-based log analysis**,
- and an operating model that connects **web → server → automated response → forensics**.

In addition, PLURA-XDR’s **request and response body analysis** is backed by patents granted in **Korea and the United States**, and its **server audit-policy-based log analysis** can also be presented as proprietary technology supported by patent protection.

This document does not attempt to claim broad superiority across the entire XDR market.  
Its purpose is narrower: to compare which platform more directly explains and controls the attack surfaces that matter most in Coupang’s operating environment.

---

## Evaluation Criteria

This comparison is limited to the following criteria.

### 1. Detection Starting Point
Where does the platform first detect the attack?

### 2. Depth of Evidence
How well can it explain why something is malicious?

### 3. Attack Chain Reconstruction
Can it connect web requests, authentication outcomes, server-side activity, automated response, and forensics into a single incident narrative?

### 4. Operational Fit
Is the platform practical for a large-scale web and API service environment?

### 5. Response Linkage
Does detection naturally lead into containment, blocking, isolation, and evidence preservation?

---

## Structural Difference

### SentinelOne

SentinelOne is centered on endpoint-driven detection and automation, including:

- behavioral endpoint detection,
- Storyline-based event chaining,
- automated response and rollback,
- generative AI-assisted investigation,
- and broader XDR and data pipeline expansion.

This is an endpoint-first operating model.

### PLURA-XDR

PLURA-XDR begins earlier in the attack chain.

Instead of starting with endpoint-side consequences, it analyzes:

- **web request bodies**,
- **web response bodies or response signals**,
- **authentication and session behavior**,
- and then correlates them with **server logs, automated response, and forensics**.

That architectural difference becomes material in scenarios such as:

- credential stuffing,
- brute-force activity using valid leaked credentials, keys, or tokens,
- zero-day or non-signature web attacks,
- webshell uploads followed by LOLBAS or GTFOBins pivoting,
- and data exfiltration indicators embedded in web responses.

---

## SentinelOne vs. PLURA-XDR

| No. | Comparison Area | SentinelOne | PLURA-XDR |
|---|---|---|---|
| 1 | Architectural starting point | Endpoint-centric EDR/XDR | Web-account-server linked XDR |
| 2 | Core operating model | Behavioral endpoint detection, Storyline, automated response, Purple AI | Request and response body analysis, auth/session anomaly analysis, web-server correlation, automated response, forensics linkage |
| 3 | AI model | Behavioral AI/ML + automation + generative AI assistance | Detection, analysis, correlation, and automated-response-oriented model |
| 4 | Primary analytical inputs | Endpoint and security telemetry | Web request body, web response body or response signals, auth/session flow, server activity, audit-policy logs |
| 5 | Credential stuffing coverage | Endpoint- and behavior-oriented interpretation | Direct interpretation through request body, response outcome, and session flow |
| 6 | Brute-force detection after leaked auth keys or tokens | Behavior-oriented interpretation | Direct interpretation through thresholds and session behavior at the key, account, and session level |
| 7 | Zero-day perspective | Focus on downstream endpoint behavior | Interprets non-standard web activity through request and response analysis plus web-server correlation |
| 8 | Web request body analysis | - | Core analytical capability |
| 9 | Web response body analysis | - | Core analytical capability |
| 10 | Technical trust basis for request and response body analysis | - | Backed by patents granted in Korea and the United States |
| 11 | Server audit-policy-based log analysis | - | Supported by proprietary technology with patent protection |
| 12 | Detection of malicious activity hidden behind successful HTTP 200 responses | Limited or requires separate integration | Directly interpretable |
| 13 | Ability to explain attacks not visible in access logs alone | Limited | Directly supported |
| 14 | Distributed-IP attack interpretation | Distributed event handling perspective | Explained through repetition, time density, automation patterns, and behavioral deviation |
| 15 | Single-flow reconstruction from web event to server-side action | Endpoint-centered | Core product structure |
| 16 | Linkage from web to automated response and forensics | Partial | Web → server → automated response → forensics as a single operating flow |
| 17 | Data exfiltration signal interpretation | Primarily server- and endpoint-side | Can include the web response layer |
| 18 | Webshell upload followed by LOLBAS or GTFOBins pivot | Focus on downstream server behavior | Explains web upload indicators, server actions, and audit logs as one chain |
| 19 | MITRE ATT&CK interpretation | Available | Can explain web attack, account abuse, lateral movement, exfiltration, and ransomware/APT activity as one connected flow |
| 20 | Fit for a large-scale web/API service like Coupang | Endpoint-analysis-centric | More direct for web-centric attack analysis |
| 21 | Security team-led operational model | Depends on overall operating design | Can be designed for observation, detection, and control without waiting for dev-change notifications |
| 22 | Korean / English support | Primarily global English-centric operations | Korean and English support |
| 23 | Policy tuning and field feedback cycle | Typically follows a global vendor process | Faster adjustment possible through a local engineering organization |

---

## Credential Stuffing and Brute Force with Valid Keys or Tokens

In Coupang’s environment, brute force is not limited to repeated failed logins.

Once signing keys, API keys, bearer tokens, or JWTs are exposed, requests may appear valid at the header or signature layer. That changes the detection problem.

The operating reality is:

- key rotation and revocation are necessary,
- but they do not fully eliminate pre-rotation exposure windows,
- internal notification and response delays,
- or continued automated abuse using already leaked credentials.

That is why a **second defensive layer** is required.

PLURA-XDR frames that second layer around behavior, not just static credential validity.

The relevant evidence is not limited to what appears in access logs. It includes:

- **request body**: what was actually attempted,
- **response signals**: success, failure, denial reason, MFA requirement, token issuance outcome,
- **session flow**: repetition and automation patterns within the same key, account, or session context,
- **behavioral deviation**: shifts in success/failure ratios, timing density, and repeated access patterns.

That allows interpretation even when the attacker holds a technically valid credential artifact.

Examples include:

- repeated failures or retries beyond expected thresholds at the **key / account / session** level,
- repeated and automated token issuance or authentication attempts within a session,
- and attack behavior that remains detectable even when source IPs are highly distributed.

This is one of the more important distinctions in Coupang’s environment.  
The question is not simply whether a request is cryptographically valid.  
It is whether the request sequence, timing, outcomes, and session behavior indicate abuse.

---

## Credential Stuffing

Credential stuffing at Coupang scale should not be reduced to an IP-blocking problem.

The more meaningful questions are:

- Which accounts, sessions, or endpoints show repeated attempts?
- What was actually submitted in the request body?
- Was the outcome a real authentication failure, an MFA challenge, an access denial, or a successful login?
- Can automated attack patterns be separated from normal user error?

PLURA-XDR addresses that by combining:

- request body analysis,
- response outcome interpretation,
- and session-flow correlation.

That makes it possible to describe credential stuffing as an **authentication attack sequence**, not just an elevated traffic condition.

By contrast, SentinelOne’s analytical model is not centered on web request bodies or response semantics as primary inputs.  
For Coupang’s web- and API-heavy environment, that difference is operationally relevant.

---

## Zero-Day Perspective

The two platforms also sit at different points in a zero-day scenario.

SentinelOne is positioned to observe **downstream endpoint-side effects**, such as:

- process execution anomalies,
- suspicious memory behavior,
- unusual file activity,
- and privilege changes.

PLURA-XDR adds an earlier layer:

- **what abnormal input entered through the web tier,**
- **what changed in the response behavior,**
- **what server-side actions followed,**
- **what automated response was triggered,**
- and **what forensic evidence was preserved at the same time.**

That means zero-day-style attacks can be interpreted not only as post-exploitation endpoint behavior, but as a connected chain spanning:

**web signal → server behavior → automated containment → forensics**

For Coupang, that reduces dependence on reconstructing everything after the fact from fragmented sources.

---

## Webshell Upload Followed by LOLBAS / GTFOBins Pivoting

In real intrusions, web exploitation or webshell upload is often the beginning of the incident, not the end.

After that, attackers frequently pivot using native operating-system tools.

### Common Windows-side examples
- `powershell.exe`
- `mshta.exe`
- `rundll32.exe`
- `regsvr32.exe`
- `wmic.exe`
- `certutil.exe`

### Common Linux-side examples
- `bash`
- `sh`
- `curl`
- `wget`
- `python`
- `nc`
- and other GTFOBins-class utilities

The comparison here is not simply whether a server-side process can be detected.

The more important question is whether the platform can explain:

1. the abnormal web request or upload event,
2. the response-side change,
3. the server-side execution path,
4. the transition into LOLBAS or GTFOBins abuse,
5. and the resulting incident chain.

### SentinelOne perspective
Server-side post-exploitation activity is interpreted from the endpoint side.

### PLURA-XDR perspective
PLURA-XDR can connect:

1. abnormal web input, upload behavior, or response change,
2. related authentication/session context,
3. server audit logs and execution traces,
4. the transition from upload → webshell → native-tool abuse,
5. and then containment and forensic preservation.

For Coupang, this matters because incident response is not only about seeing a tool execute.  
It is about explaining **how that execution began at the web layer** and how far it propagated.

---

## From Web Signals to Automated Response and Forensics

One of the more important aspects of PLURA-XDR is not any single feature in isolation, but the operating model that ties them together.

That flow can be described as follows.

### 1. Web layer
- request body analysis,
- response body or response signal analysis,
- identification of zero-day indicators,
- identification of credential stuffing patterns,
- identification of suspicious uploads or payloads.

### 2. XDR correlation
- linking web events with authentication and session anomalies,
- correlating with existing security events,
- interpreting activity using a MITRE ATT&CK-aligned framework.

### 3. Server layer
- process, file, network, and account activity analysis,
- audit-policy-based log analysis,
- detection of webshell follow-on behavior,
- detection of LOLBAS or GTFOBins pivoting,
- detection of propagation or ransomware/APT-like follow-on activity.

### 4. Automated response
- throttling,
- step-up authentication,
- blocking or isolation,
- operational alerting.

### 5. Forensics
- preserving evidence at detection time,
- rather than relying only on later manual collection.

This is the basis for the statement that PLURA-XDR connects:

**web → authentication/session → server → automated response → forensics**

as one operating model.

That is a meaningful distinction in large-scale service environments, where reducing investigative hop count and improving incident narrative quality are often more important than adding another standalone alert source.

---

## Server Audit-Policy-Based Log Analysis

Web attacks frequently lead into server-side activity:

- process launches,
- file creation or modification,
- privilege escalation attempts,
- LOLBAS abuse,
- GTFOBins abuse,
- and early lateral movement signals.

PLURA-XDR can be described as going beyond generic event collection by incorporating **audit-policy-based log analysis** to interpret operating-system-level behavior more precisely.

This should not be overstated, but in a product comparison it functions as a meaningful technical trust signal, especially when combined with the web-layer evidence model described above.

---

## Demonstration Video

The following video demonstrates how PLURA-XDR handles **high-volume API access using a stolen JWT**.

It is useful for understanding:

- an attacker using a technically valid authentication artifact,
- behavior-based detection rather than simple IP blocking,
- identification of abnormal high-volume API usage,
- and the operational response sequence.

### Demo
- https://www.youtube.com/watch?v=l6JeCeWeVSo

---

## Recommended PoC Focus Areas

Because this document is scoped to structural differences, final product judgment should be based on a side-by-side PoC.

For Coupang, the most relevant validation areas would be:

1. **Credential stuffing**
   - explanatory quality using request body + response outcome + session flow,
   - separation of user error from automated attack behavior.

2. **Leaked key / leaked JWT abuse**
   - detection quality when the attacker holds a technically valid artifact,
   - interpretability in highly distributed-IP scenarios.

3. **Zero-day-style web attack**
   - detection of non-standard web inputs,
   - linkage between web events and downstream server-side behavior.

4. **Webshell → LOLBAS / GTFOBins transition**
   - whether the platform can explain the full chain from upload to native-tool abuse,
   - and whether response and forensics are linked in the same workflow.

5. **Operational fit**
   - incident timeline clarity,
   - response speed,
   - false positive / false negative profile,
   - console usability,
   - and scalability under Coupang-level traffic volume.

---

## Closing View

The key issue in this comparison is not broad market supremacy across all XDR categories.

The narrower point is this:

- SentinelOne is built around endpoint-centric detection and automation.
- PLURA-XDR is built around a linked analysis model for web requests and responses, authentication/session behavior, server activity, automated response, and forensics.
- In scenarios such as credential stuffing, brute force using valid leaked credentials, zero-day-style web attacks, and webshell-to-LOLBAS/GTFOBins pivots, PLURA-XDR can provide a more direct incident explanation model for Coupang’s attack surface.

The most defensible conclusion is not that PLURA-XDR is universally better across every XDR dimension.  
It is that **for Coupang’s actual web/API-heavy attack surface and operating model, PLURA-XDR can provide a more direct and operationally useful explanation layer in several critical areas**.

That conclusion should be validated through PoC.
