# PLURA V6 업그레이드 제안

## 1. 제안 배경

최근 웹 공격, 취약점 공격, 자동화 공격 시도가 지속적이고 과도하게 발생하고 있습니다. 특히 알려진 CVE 대응뿐 아니라 신규 취약점, 제로데이성 공격, AI 기반 우회 공격으로 확대될 가능성이 높아짐에 따라 기존 탐지 중심의 운영을 넘어 세분화된 탐지와 자동 대응 체계가 필요합니다.

또한 Mythos(미토스)급 AI가 취약점 탐색, 공격 가능성 판단, 익스플로잇 검증, 우회 페이로드 구성을 자동화할 수 있는 환경에서는 공개된 CVE를 기다리는 방식만으로는 충분히 대응하기 어렵습니다. 이에 PLURA V5 이용 고객사를 대상으로 **PLURA V6 업그레이드**를 제안드립니다.

## 2. PLURA V6 주요 강화 기능

| 구분 | 주요 강화 내용 |
| --- | --- |
| 웹방화벽 | 자동 IP 차단 기능 세분화, 공격 탐지 룰셋 업데이트, CVE 기반 취약점 공격 탐지, 제로데이 의심 공격 탐지 기능 강화 |
| EDR/호스트 | 필터 탐지 시 자동 포렌식 연동, 기본 시스템 정보 조회, AV 및 Microsoft Defender 상태 조회 |
| AI 제로데이/XDR | **Mythos급 AI 해킹 대응을 위한 AI 기반 제로데이 공격 탐지/대응**, 웹/API·인증·세션·계정·서버/PC 이벤트 상관분석 지원 |
| 자동화 대응 | 탐지, 분석, 차단, 포렌식 연계까지 이어지는 자동화 대응 체계 지원 |

## 3. 기대 효과

PLURA V6 업그레이드를 통해 고객사는 다음과 같은 효과를 기대할 수 있습니다.

* 최신 공격 유형 및 AI 기반 자동화 공격에 대한 탐지 정확도 향상
* CVE 기반 취약점 공격 및 제로데이 의심 공격 대응 강화
* 웹/API 공격과 EDR/호스트 이벤트의 상관분석을 통한 침해 흐름 추적
* 자동 IP 차단, 자동 포렌식 연계, AI 분석을 통한 대응 시간 단축
* 반복적이고 고도화되는 공격에 대한 보안 운영 효율성 개선

## 4. 사전 준비 및 업그레이드 주의사항

PLURA V6의 TI 및 AI 기반 탐지·자동화 기능을 원활히 이용하기 위해서는 고객사 명의의 외부 서비스 계정 및 API Key 준비가 필요합니다.

| 항목 | 내용 |
| --- | --- |
| VirusTotal | PLURA-TI 연동을 위한 고객사 명의 계정 및 API Key 준비 |
| OpenAI API Platform | PLURA-AI 연동을 위한 고객사 명의 계정 및 API Key 준비 |
| 에이전트 재설치 | PLURA V6는 V5와 아키텍처가 상이하므로 기존 V5 시스템 에이전트 삭제 후 V6 버전으로 새롭게 설치 필요 |

서비스 가입 및 API Key 준비가 완료되면, 기존 V5 에이전트 삭제 및 PLURA V6 에이전트 설치 절차를 순차적으로 안내드립니다.

## 5. PLURA Blog: AI 해킹 대응 전략

* [미토스 AI를 활용한 공세적 공격 대응 전략](https://blog.plura.io/ko/respond/responding_to_mythos_ai_offensive_attack/)

## 6. PLURA V6 최신 대응 기능

* [웹방화벽 자동 IP 차단 기능 안내](https://docs.plura.io/ko/v6/fn/comm/ipblock/auto)
* [EDR 및 자동 포렌식 연동 기능 안내](https://docs.plura.io/ko/v6/fn/comm/edr)
* [시스템 보안 상태 조회 기능 안내](https://docs.plura.io/ko/v6/fn/comm/systemsec)
* [제로데이 의심 공격 탐지 기능 안내](https://docs.plura.io/ko/v6/fn/comm/sdetection/zeroday)

## 7. PLURA V6 이용을 위한 사전 준비 및 주의사항

* [PLURA V6 회원가입 매뉴얼](https://docs.plura.io/ko/v6/signup)
* [PLURA-TI API Key 생성 가이드](https://github.com/QubitSecurity/howto/tree/main/api/ti)
* [PLURA-AI API Key 생성 가이드](https://github.com/QubitSecurity/howto/tree/main/api/ai)

> PLURA V6는 V5와 아키텍처가 상이하므로,  
> 기존 V5 환경에서 이용 중인 시스템 에이전트는 모두 삭제한 후   
> V6 버전으로 새롭게 설치해야 정상적으로 이용할 수 있습니다.
