PLURA-WAF and PLURA-XDR utilize various security techniques and detection mechanisms to identify **web shell and fileless attacks**. Below are the detection methods used by each system.

---

## **Detection in PLURA-WAF**

PLURA-WAF monitors web traffic in real time and provides the following features to detect web shell and fileless attacks:

### **1. Web Request Pattern Analysis**
- **Detect abnormal HTTP requests**:
  - Analyze HTTP methods (POST, GET) and unusual URL patterns.
  - Identify multipart requests (`Content-Type: multipart/form-data`) used during web shell uploads.
  - Example: Trigger alerts when uploaded file names have script extensions like `.php`, `.asp`, `.jsp`.
- **Filter specific strings**:
  - Detect commonly used PHP code in attacks (`<?php system(...) ?>`, `eval()`, `base64_decode()`).

### **2. File Upload Policy Enforcement**
- Block based on file size, extension, and upload path.
- Block or alert if the uploaded file is an executable script.

### **3. Correlation Analysis on Web Traffic**
- Identify repetitive requests (file upload, command execution, etc.) from specific IPs or user sessions.
- Example: If the same client IP performs multiple uploads or command executions in a short time, it's considered suspicious.

### **4. Signature-Based Detection**
- Use signatures for OWASP Top 10 attack types (e.g., file upload vulnerability, XSS, SQLi) to block web shell uploads and execution.

### **5. Behavior-Based Detection**
- Analyze the behavior of uploaded files to confirm if a web shell is executed.
  - Monitor suspicious commands (e.g., `cmd.exe`, `ls`) if the file is executed.

---

## **Detection in PLURA-XDR**

PLURA-XDR comprehensively analyzes security events across the web server and network environment to detect fileless attacks and web shell execution:

### **1. Log Collection and Correlation Analysis**
- **Server log collection**:
  - Collect access and error logs from web servers like Apache, NGINX, and IIS in real time.
  - Detect abnormal URL requests related to web shells (e.g., `webshell.php?cmd=`).
- **SIEM integration**:
  - Integrate collected logs with SIEM to analyze patterns of suspicious activity.
  - Example: Repeated command execution requests from the same client.

### **2. Fileless Attack Detection**
- **Process behavior monitoring**:
  - Detect abnormal execution of PowerShell, WMIC, mshta, etc.
  - Raise alerts when commands used in fileless attacks (`IEX`, `DownloadString`, `Remove-Item`) are executed.
- **Memory analysis**:
  - Detect malicious scripts running directly in memory without being saved to disk.
  - Analyze process information created during execution to identify abnormal behavior.

### **3. Detection Based on MITRE ATT&CK**
- Detect attack scenarios based on MITRE ATT&CK techniques such as T1059 (Command and Scripting Interpreter), T1218 (Signed Binary Proxy Execution).
- Example: Real-time detection when an attacker uses `mshta` to run an HTA file and download additional malicious code.

### **4. Threat Intelligence Integration**
- PLURA-XDR compares known malicious web shell patterns, attack IPs, and domains with Threat Intelligence (TI) data for real-time detection.
- Example: Automatically block if a request to a malicious URL like `malicious.com` is detected.

### **5. Custom Rules**
- Admins can set detection rules based on specific file paths, commands, and HTTP request patterns.
- Example: Send alerts and block access if specific URL patterns like `/upload.php`, `/cmd.php` are detected.

---

## **Response After Detection**

1. **PLURA-WAF**:
   - Block abnormal requests and alert administrators.
   - Review suspicious uploads and auto-delete if necessary.

2. **PLURA-XDR**:
   - Notify the security team through real-time alerts.
   - Immediately block suspicious processes and network connections.
   - Reconstruct the attack scenario based on detected events and provide detailed reports.

---

With the integrated operation of these two systems, high detection rates and rapid responses to fileless and web shell attacks are achievable.

