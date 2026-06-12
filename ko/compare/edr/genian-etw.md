# 📄 PLURA‑EDR vs. Genian EDR: 고급 행위 기반 탐지 기능 비교

**Event Tracing for Windows** (ETW)는 Windows 커널/사용자 모드 이벤트를 실시간 제공하는 Microsoft 공식 로깅 메커니즘입니다. 두 제품 모두 ETW를 활용하지만, “**어떤 Provider를 얼마나, 어떤 방식으로 구독·분석하느냐**”가 차이를 만듭니다.

---

## 📚 목차

1. [ETW 지원 방식 비교](#1-etw-지원-방식-비교)
2. [정밀 행위·메모리 추적 기능 비교](#2-정밀-행위·메모리-추적-기능-비교)
3. [이벤트 채널·Sysmon 모니터링 비교](#3-이벤트-채널·sysmon-모니터링-비교)
4. [요약 및 결론](#4-요약-및-결론)

---

## 1 | ETW 지원 방식 비교 <a name="1-etw-지원-방식-비교"></a>

| 항목                   | **PLURA‑EDR **                                                            | **Genian EDR**                                                   |
| -------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **ETW 지원 여부**        | ✅ **ETW Provider 직접 구독 + 필요 시 Sysmon 경유**<br>(Windows EDR Agent 4.x ↑)               | ✅ **ETW Provider 직접 구독** (관리자 정책 기반)                             |
| **기본 활성 Provider 수** | **다수의 보안 Provider가 “자동” 활성화**<br>‣ Threat‑Intelligence, Kernel‑Process, PowerShell 등 | **0 개 (기본값 “빈 리스트”)**<br>관리자가 원하는 Provider/ID를 **수동 등록**해야 수집 시작 |
| **최대 지원 Provider 수** | Windows 제공 전체 Provider(수백\~수천) – Agent 자동 탐지                                         | “무제한” (등록한 만큼) – 단, 미등록 Provider는 수집 X                           |
| **수집 경로**            | ① Agent가 ETW 세션 생성·실시간 수집<br>② 옵션: Sysmon(Event ID 1‑27 등) 병행                        | 정책 → Agent가 지정 Provider/ID 세션 생성·수집                              |
| **커스터마이징 범위**        | Sysmon XML + ETW Provider 필터(선택)                                                     | **Provider 명·Event ID·레벨·키워드까지 세밀 설정**                           |
| **대표 Provider 예시**   | Threat‑Intelligence, Kernel‑Process, PowerShell, Sysmon                              | Kernel‑Process, PowerShell, AppLocker, *사용자 정의*                  |

---

## 2 | 정밀 행위·메모리 추적 기능 비교 <a name="2-정밀-행위·메모리-추적-기능-비교"></a>

| 비교 항목                        | **PLURA‑EDR**                                     | **Genian EDR**                    |
| ---------------------------- | ------------------------------------------------- | --------------------------------- |
| **행위 탐지 엔진**                 | ETW + Sysmon 이벤트 → 필터·ML 분석                       | **XBA (행위 기반 엔진)**                |
| **PowerShell 추적**            | ScriptBlockLogging + `PowerShell/Operational` 이벤트 | CommandLine + PowerShell Provider |
| **Reflective DLL Injection** | ETW `Threat‑Intelligence` + 커널 ALPC 호출 분석         | 공식 백서에 탐지 대상 포함                   |
| **메모리/Fileless**             | ETW TI + Sysmon ID 7·10 상관 분석                     | ETW Provider + XBA 분석             |
| **정밀도 범위**                   | 커널·사용자모드 (ETW 직접 + Sysmon)                        | 커널·사용자모드 (직접)                     |

---

## 3 | 이벤트 채널 · Sysmon 모니터링 비교 <a name="3-이벤트-채널·sysmon-모니터링-비교"></a>

| 항목                        | **PLURA‑EDR**                                                              | **Genian EDR**                        |
| ------------------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| **Sysmon 지원**             | 설치·룰 가이드 제공(선택)                                                            | 비지원                                   |
| **ETW Provider/ID 선택 UI** | **지원** – 필터/온오프(Beta)                                                      | **필수** – ‘윈도우 이벤트(ETW)’ 정책 화면에서 수동 등록 |
| **실시간 정책·알림**             | ETW·Sysmon → 필터/ML → 즉시 알림                                                 | ETW → XBA → 알림                        |
| **사전 설정 채널**              | PowerShell, TaskScheduler, Kernel‑Process, Threat‑Intelligence 등 **자동 포함** | *없음 (관리자 등록 시 나타남)*                   |

---

## 4 | 요약 및 결론 <a name="4-요약-및-결론"></a>

| 항목                       | **PLURA‑EDR**                      | **Genian EDR**                      |
| ------------------------ | ---------------------------------- | ----------------------------------- |
| **ETW 활용 방식**            | **자동 + 직접 구독** (필수 Provider 사전 탑재) | **수동 커스터마이징** (필요 Provider를 직접 등록)  |
| **메모리/DLL Injection 탐지** | 지원 (ETW TI 기반)                     | 지원 (XBA 기반)                         |
| **Sysmon 연동**            | 강점 (전용 룰·UI)                       | 비지원                                 |
| **관리 편의성**               | “설치 → 바로 탐지” 초기가동 편리               | 초기 셋업 시 Provider/ID 선별 필요(세밀 제어 장점) |
| **리소스/노이즈 제어**           | 기본 Provider 전체 수집 → 폭넓은 가시성        | 필요한 Provider만 선택 → 노이즈·리소스 절감 가능    |

> **결론**
> *PLURA‑EDR은 **ETW Provider를 자동 구독**해 즉시 폭넓은 행위 데이터를 확보하고, 추가로 Sysmon까지 병행해 “데이터 다양성·이중화”가 강점입니다.  
> Genian EDR은 **관리자 정의 Provider/ID**를 선택적으로 수집해 “노이즈 절감·리소스 최적화”를 꾀할 수 있으나, 초기 설정이 필수입니다.*  
> 두 제품 모두 고급 메모리 기반 공격을 탐지하지만, 실제 운영환경에 투입하기 전 **동일 PoC 시나리오**(Reflective DLL Injection, PowerShell LOLBins, Fileless Malware 등)로 탐지 품질·리소스 사용·TCO를 비교하시길 권장합니다.

---

### 참고 자료

* PLURA Docs – *Windows EDR Agent: ETW Provider & Sysmon 수집*
* Genian EDR 관리자 가이드 – *윈도우 이벤트(ETW) 수집 설정*
* Genian XBA WhitePaper – Reflective DLL Injection 탐지 등
* Microsoft – *Event Tracing for Windows 개요*

> (2025‑06‑22 기준 공개 문서를 기반으로 작성되었으며, 비공개 기능·최신 릴리스 노트는 포함되지 않을 수 있습니다.)
