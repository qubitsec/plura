# PLURA-XDR Philosophy

> "Cybersecurity is delivered in natively integrated capabilities from platforms, not point products"  
> – Lee Klarich, Palo Alto Networks CPO

---

## 1) The History and Evolution of Information Security

### 1990s: The Beginning of Network Perimeter Security

The foundation of information security systems began in the 1990s with an approach centered on **Network Perimeter Security**. This structure aims to achieve security objectives by centralizing network access points and applying strong security controls at those points. To this end, the concept of deploying multiple security products **in multiple layers across the network** was introduced to respond to various attacks, rather than relying on a single product.

Representative network perimeter security products include:

1. **Firewall**
2. **Unified Threat Management** (UTM)
3. **Web Application Firewall** (WAF)
4. **Intrusion Prevention System** (IPS)
5. **Intrusion Detection System** (IDS)
6. **Network Detection and Response** (NDR)

![PLURA-XDR](https://w.plura.io/img/plura_xdr.jpg)

---

### 2000s: The Development of Integrated Security Event Management and Automated Response

In the 2000s, the limitations of single products began to emerge, leading to the evolution from **Log Management Systems** (LMS) to **Security Information and Event Management** (SIEM) systems. SIEM systems collect logs from various network devices and detect anomalies through **correlation analysis**.

While the core goal of integrated security event management is to detect anomalies through correlation analysis, it further proposes automated responses through **Security Orchestration, Automation, and Response** (SOAR) systems.

![PLURA-XDR Lineup](https://w.plura.io/img/plura_support.jpg)

**Terminology Explanation:**

1. **Network-based Intrusion Prevention System** (NIPS)
2. **Log Management System** (LMS)
3. **Host-based Intrusion Prevention System** (HIPS)

---

### 2020s: The Emergence of Zero Trust Architecture

In the 2020s, the core paradigm of security is expanding to **Zero Trust Architecture** (ZTA), based on the principle of "**never trust, always verify**." Zero Trust is a security model that no longer trusts internal networks, continuously verifying all access within and outside the network, and strictly managing through authentication and authorization.

Unlike traditional perimeter security methods, ZTA shifts the **focus of data protection** from the network perimeter to assets (data and applications), blocking all unauthorized access and suspecting all users. This approach has become an essential security strategy in modern environments where remote work, cloud-based infrastructure, and diverse device connections are commonplace.

![Zero Trust Architecture](https://w.plura.io/img/zta_architecture.jpg)

PLURA-XDR is a platform that vertically integrates and further develops the Zero Trust concept. Specifically, PLURA-XDR provides the following core elements of ZTA:

- **Activity Logs**  
  It records all activities occurring within the network and systems in detail, enabling real-time monitoring and analysis of anomalies. This allows for early detection and response to potential threats.

- **Integrated Security Information and Event Management (SIEM) System**  
  It centrally collects and correlates various security events, allowing rapid and accurate responses to complex threats. The SIEM system integrates with activity logs to enhance security intelligence.

Through these features, PLURA-XDR continuously verifies all access within and outside the network, tracking and automatically blocking all activities before and after security incidents. Furthermore, it provides an intelligent defense framework that protects an organization’s assets, reducing the complexity of security processes and maximizing response efficiency. 

---

## 2) Problem Recognition and Solutions: PLURA's Innovative Approach

### PLURA's Problem Recognition

PLURA started from the following problem recognition:

1. **Limitations in Analyzing Encrypted Traffic**  
   Network-based security products like Intrusion Prevention Systems (IPS), Intrusion Detection Systems (IDS), and Network Detection and Response (NDR) have **limitations in properly analyzing encrypted packets**. These devices primarily operate effectively on unencrypted traffic, and for encrypted web traffic, a **Web Application Firewall is more effective**. [1]

2. **Vulnerabilities to Evasion Attacks on Web Application Firewalls**  
   While Web Application Firewalls (WAF) are optimized to protect web traffic, they can be vulnerable to some **advanced evasion attack techniques**. A single product may find it difficult to respond to specific attacks like **credential stuffing**. [2][3]

3. **Limitations in SIEM Systems' Information Collection**  
   Security Information and Event Management (SIEM) systems primarily collect logs (syslogs) from network security devices, but most security devices **do not sufficiently provide detailed detection descriptions or body information**. Often, only WAFs include body information. [4]

4. **Lack of Reliability in Correlation Analysis**  
   Since there are few security products that provide body information, SIEM systems' log data is not sufficiently detailed. As a result, **the reliability of correlation analysis decreases**. They may not provide the necessary information to evaluate and respond to detected threats, leading to false alerts or detection failures.

5. **Limitations in Automated Responses Linked with SOAR**  
   The **Security Orchestration, Automation, and Response (SOAR)** functions linked with SIEM systems that lack information do not operate smoothly in real environments, reducing the reliability and efficiency of automated responses. This often requires **manual intervention** in the actual security incident response process.

6. **Inefficiency of Complex Security System Configurations**  
   In environments where multiple security devices like IPS, IDS, and NDR are configured complexly, there is a **lack of interoperability** between devices, increasing management burdens. Additionally, **duplicate alerts** and **alert fatigue** can occur, posing risks that administrators may not recognize threats in a timely manner.

7. **Difficulty in Real-time Response**  
   Existing security products show **limitations in real-time attack detection and response**, making it challenging to quickly detect threats and immediately block them, ultimately leading to inefficient security systems.

8. **Lack of Integration Between Systems**  
   Separate security systems lack the ability to share data and analyze collectively. This makes it difficult to grasp comprehensive threat information, limiting multifaceted threat analysis and response.

9. **Weakening of Security Perimeters**  
   With the increase in remote work and cloud usage, traditional network perimeters are disappearing. The traditional perimeter security model cannot provide sufficient security effectiveness in modern **distributed infrastructures** and **various access environments**.

10. **Decreased Reliability in Security Monitoring**  
    Due to limited information and complex device configurations, the **reliability of security monitoring services** decreases. Security personnel find it challenging to quickly determine whether an attack has occurred with only limited information, and there are **restrictions in accessing operational systems** during security incidents.

---

### Impact of Web Traffic and Encryption

Among TCP/IP packets on the internet, **web traffic** (HTTP/HTTPS) accounts for approximately 80–90%, and HTTPS is estimated to comprise between 83% and 93% of that. Most of it consists of **encrypted web traffic**, which significantly impacts the network security paradigm.

Due to the increase in encrypted traffic, existing network security devices are facing the following challenges:

1. **Lack of Visibility into Encrypted Traffic**  
   Multi-functional network security devices (UTM, IPS, IDS, NDR) are designed to detect and respond to various threats, but analyzing encrypted traffic requires a **decryption process**. However, decryption can be difficult due to security policies, requiring additional certificate management and complex configurations.

2. **Performance Degradation and Increased Latency**  
   The process of decrypting and inspecting encrypted traffic significantly increases the **CPU and memory usage** of devices, leading to **performance degradation**. This can increase network **latency**, worsening user experience.

3. **Increased Management Complexity**  
   Decryption requires management of SSL/TLS certificates and key exchanges, placing **additional burdens** on network administrators. Furthermore, complex configurations increase the likelihood of **configuration errors**.

4. **Increased Security Vulnerabilities**  
   Performing decryption in the middle resembles a **"Man-in-the-Middle attack"** structure, posing risks that attackers may steal sensitive information through misconfigurations or vulnerabilities.

5. **Privacy and Regulatory Compliance Issues**  
   Decrypting encrypted traffic can **violate user privacy**, and in some industries or countries, may be restricted due to legal regulations.

6. **Advancements in Encryption Technology**  
   Latest encryption technologies like **QUIC protocol** and **TLS 1.3** make man-in-the-middle decryption more difficult, limiting the capabilities of existing devices.

7. **Need for Specialized Solutions**  
   Due to these limitations, specialized solutions like **Web Application Firewalls (WAF)** designed to handle encrypted traffic are necessary to effectively respond to encrypted web traffic.

8. **Increased Complexity of Network Structure**  
   Adding multiple devices to handle encrypted traffic complicates the network structure, making **cause analysis and recovery** difficult during failures.

9. **Increased Costs**  
   Additional device deployment and management increase **operational expenses (OPEX)** and **capital expenditures (CAPEX)**, adding financial burdens to the organization.

10. **Difficulty in Real-time Threat Response**  
    It's challenging to quickly detect and respond to threats within encrypted traffic, limiting the ability to minimize damage during security incidents.

---

### Problem Solving Through PLURA-XDR

PLURA-XDR provides a vertically integrated security platform to address these challenges:

1. **Effective Analysis of Encrypted Traffic**  
   PLURA-XDR's Web Application Firewall **decrypts encrypted web traffic** to perform accurate threat analysis and response.

2. **Enhanced Endpoint Security**  
   Through **Host Security** (EDR), it directly detects and blocks malicious activities on servers and PCs.

3. **Accurate Information Collection and Correlation Analysis**  
   The SIEM system collects detailed detection information and body data, enabling **highly reliable correlation analysis**.

4. **Automated Real-time Response**  
   By integrating with SOAR systems, it automatically blocks and responds to threats in real-time.

5. **Increased Management Efficiency**  
   The vertically integrated platform simplifies the network structure and **reduces management burdens**.

6. **Management of the Entire Threat Lifecycle**  
   Supports all stages of threat management, from detection to response and post-processing.

7. **Reduction of Alert Fatigue**  
   Centralized alert management **minimizes duplicate alerts**, allowing focus on critical threats.

8. **Implementation of Zero Trust Architecture**  
   **Implements** a security model that does not distinguish between internal and external environments, adapting to modern security needs.

9. **Comprehensive Response to Internal Threats**  
   Enhances monitoring and protection of internal users and systems.

10. **Improved Reliability in Security Monitoring**  
    Provides **efficiency and reliability** in security monitoring through detailed information and real-time response.

---

## 3) Proposal for Robust Security: The Future of PLURA-XDR and Our Vision

Addressing information security challenges requires an organic integration with **Managed Security Services (MSS)** beyond merely selecting solutions. However, current security monitoring services struggle to provide adequate protection due to limited information and restrictions on accessing operational systems. These limitations are at the core of the issues recognized by PLURA.

The **PLURA-XDR platform** offers detailed detection descriptions and original logs, assisting security managers in making **more accurate and rapid decisions**, and provides an environment where **security incidents can be analyzed** without direct access to operational systems. Additionally, it enables **real-time response** to immediately block ongoing attacks and offers **visibility and context** for threats, facilitating proactive responses.

This differentiated approach of PLURA-XDR realizes a **comprehensive hacking response system** and is continuously evolving to meet the latest security demands. Now, build a strong and innovative future of information security with **PLURA-XDR**. It is a **state-of-the-art integrated security platform** that will redefine your organization's information security.

---
