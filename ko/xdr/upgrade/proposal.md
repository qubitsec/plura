# PLURA V6 업그레이드 제안

## 1. 제안

PLURA V5는 시그니처/룰 기반 탐지 중심의 운영 체계입니다.

최근 Mythos(미토스)급 AI 해킹 공격은 취약점 탐색, 우회 페이로드 구성, 익스플로잇 검증까지 자동화할 수 있어, 기존 패턴 중심 대응만으로는 선제 방어가 어려워지고 있습니다.

이에 **Mythos급 AI 해킹 대응을 위한 AI 기반 제로데이 공격 탐지·대응, 웹/API와 호스트 상관분석, 자동 차단 및 포렌식 연계가 가능한 PLURA V6 보안 운영 체계**로의 업그레이드를 제안드립니다.

## 2. 업그레이드 필요성

* **AI 공격 자동화 대응**: 공격 시도 규모와 속도가 증가함에 따라 자동 탐지·분석·차단 체계 필요
* **제로데이/우회 공격 대응**: 기존 시그니처만으로 판단하기 어려운 비정형 공격 탐지 필요
* **침해 흐름 분석**: 웹/API 공격과 호스트 이벤트를 연결한 상관분석 필요
* **대응 시간 단축**: 탐지 이후 차단, 포렌식, 재발 방지까지 이어지는 자동화 대응 필요

## 3. V5 대비 V6 차별화 포인트

| 구분 | V5 중심 운영 | V6 업그레이드 가치 |
| --- | --- | --- |
| 탐지 방식 | 시그니처/룰 기반 탐지 중심 | AI 기반 제로데이 의심 공격 탐지·대응 |
| 분석 범위 | 웹, 호스트 이벤트 개별 확인 | 웹/API·호스트·계정·세션 이벤트 상관분석 |
| 대응 방식 | 탐지 후 수동 확인 및 조치 중심 | 자동 IP 차단 및 대응 자동화 |
| 침해 분석 | 사고 이후 증적 확인 부담 | 탐지 시점부터 자동 포렌식 연계 |
| 운영 효율 | 반복 공격 대응에 운영 부담 발생 | AI 분석과 자동화 대응으로 보안 운영 효율 향상 |

## 4. 기대 효과

* Mythos급 AI 해킹 및 제로데이 의심 공격 대응 역량 강화
* 웹/API 공격과 EDR/호스트 이벤트의 상관분석을 통한 침해 흐름 추적
* 자동 IP 차단 및 자동 포렌식 연계를 통한 대응 시간 단축
* 반복적이고 고도화되는 공격에 대한 보안 운영 효율성 개선

## 5. PLURA Blog: AI 해킹 대응 전략

* [미토스 AI를 활용한 공세적 공격 대응 전략](https://blog.plura.io/ko/respond/responding_to_mythos_ai_offensive_attack/)

## 6. PLURA V6 최신 대응 기능

* [웹방화벽 자동 IP 차단 기능 안내](https://docs.plura.io/ko/v6/fn/comm/ipblock/auto)
* [EDR 및 자동 포렌식 연동 기능 안내](https://docs.plura.io/ko/v6/fn/comm/edr)
* [시스템 보안 상태 조회 기능 안내](https://docs.plura.io/ko/v6/fn/comm/systemsec)
* [제로데이 의심 공격 탐지 기능 안내](https://docs.plura.io/ko/v6/fn/comm/sdetection/zeroday)

## 7. PLURA V6 이용을 위한 사전 준비 및 주의사항

PLURA V6의 TI 및 AI 기반 탐지·자동화 기능을 이용하기 위해서는 고객사 명의의 VirusTotal 및 OpenAI API Platform 계정과 API Key 준비가 필요합니다.

* [PLURA V6 회원가입 매뉴얼](https://docs.plura.io/ko/v6/signup)
* [PLURA-TI API Key 생성 가이드](https://github.com/QubitSecurity/howto/tree/main/api/ti)
* [PLURA-AI API Key 생성 가이드](https://github.com/QubitSecurity/howto/tree/main/api/ai)

> PLURA V6는 V5와 아키텍처가 상이하므로, 기존 V5 시스템 에이전트 삭제 후 V6 에이전트 신규 설치가 필요합니다.
