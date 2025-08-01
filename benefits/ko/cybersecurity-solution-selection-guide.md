# 사이버 보안 솔루션 선택 가이드

실제 침해 사례와 MITRE ATT&CK 기반 분석을 바탕으로 EDR/XDR 및 통합 보안 솔루션을 평가하기 위한 실무 지향 프레임워크입니다.

---

## 📊 제품 비교 평가 지표 및 사유

| **항목**                   | **사유**                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. 마이터 어택 커버리지**       | 현대의 해킹 공격은 다단계로 진행되며, 이를 대응하기 위한 표준 프레임워크는 MITRE ATT\&CK입니다. 공격자의 침투 흐름(Initial Access → Execution → Privilege Escalation 등)에 따라 위협을 탐지하고 차단할 수 있는 구조가 필수입니다. |
| **2. 웹 로그 분석 및 대응**      | SKT 웹쉘 공격 사례처럼, 최근 침해 사고는 웹 취약점을 통한 초기 침입이 많으며, 이는 엔드포인트 탐지만으로는 선제 대응이 어렵습니다. 웹 로그 및 WAF 연동 기반 탐지 체계가 필수입니다.                                                  |
| **3. 크리덴셜 스터핑 대응**       | GS리테일, 워크넷 등에서 발생한 실제 공격은 계정 탈취(Credential Stuffing)가 주요 침입 수단으로 사용되었습니다. 로그인 실패 로그, 반복 접근 IP 탐지 등 계정 보호 기능이 중요합니다.                                           |
| **4. 랜섬웨어 완벽 대응**        | Yes24, SGI 서울보증보험 사례처럼, 내부 확산을 막지 못할 경우 치명적 데이터 손실로 이어집니다. 파일 암호화 전 탐지 및 행위 차단 기능, 포렌식 기반 조사 기능이 요구됩니다.                                                       |
| **5. 통합 정보보안 플랫폼 대응 전략** | WAF, EDR, SIEM, 포렌식, 시스템 모니터링 등 복합 보안 시스템 간 연동을 통해 공격 전–중–후 모든 단계에서 대응이 가능해야 합니다. 단일 제품만으로는 구조적으로 한계가 존재합니다.                                                  |

---
