# PLURA V6 업그레이드 제안

## 1. 제안 배경

최근 웹 공격, 취약점 공격, 자동화 공격 시도가 지속적이고 과도하게 발생하고 있습니다. 특히 알려진 취약점뿐 아니라 신규 취약점 및 제로데이성 공격으로 확대될 가능성이 높아짐에 따라, 기존 탐지 중심의 운영을 넘어 보다 세분화된 탐지와 자동 대응 체계가 필요합니다.

이에 따라 PLURA V5 이용 고객사를 대상으로 최신 버전인 **PLURA V6 업그레이드**를 제안드립니다.

## 2. PLURA V6 주요 강화 기능

PLURA V6는 기존 V5 대비 웹방화벽, EDR/호스트, AI 기반 분석 및 자동화 대응 기능이 강화되었습니다.

| 구분       | 주요 강화 내용                                                              |
| -------- | --------------------------------------------------------------------- |
| 웹방화벽     | 자동 IP 차단 기능 세분화, 공격 탐지 룰셋 업데이트, CVE 기반 취약점 공격 탐지, 제로데이 의심 공격 탐지 기능 강화 |
| EDR/호스트  | 필터 탐지 시 자동 포렌식 연동, 기본 시스템 정보 조회, AV 및 Microsoft Defender 상태 조회        |
| AI 기반 대응 | 반복적이고 고도화되는 공격에 대한 AI 기반 분석, 탐지, 대응 자동화 지원                            |

## 3. 기대 효과

PLURA V6 업그레이드를 통해 고객사는 다음과 같은 효과를 기대할 수 있습니다.

* 최신 공격 유형에 대한 탐지 정확도 향상
* 웹방화벽 자동 차단 정책의 세분화 및 운영 효율성 개선
* CVE 기반 취약점 공격 및 제로데이 의심 공격 대응 강화
* EDR/호스트 영역의 자동 포렌식 연계를 통한 침해 분석 효율화
* AI 기반 공격 분석 및 자동화 대응 체계 도입

## 4. 사전 준비 사항

PLURA V6의 AI 기반 탐지 및 자동화 기능을 원활히 이용하기 위해서는 고객사 명의의 외부 서비스 계정 및 API Key 준비가 필요합니다.

| 서비스                 | 용도          | 준비 사항                  |
| ------------------- | ----------- | ---------------------- |
| VirusTotal          | PLURA-TI 연동 | 고객사 명의 계정 및 API Key 준비 |
| OpenAI API Platform | PLURA-AI 연동 | 고객사 명의 계정 및 API Key 준비 |

## 5. 업그레이드 시 주의사항

PLURA V6는 V5와 아키텍처가 상이하므로, 기존 V5 환경에서 이용 중인 시스템 에이전트는 모두 삭제한 후 V6 버전으로 새롭게 설치해야 정상적으로 이용할 수 있습니다.

서비스 가입 및 API Key 준비가 완료되면, 기존 V5 에이전트 삭제 및 PLURA V6 에이전트 설치 절차를 순차적으로 안내드립니다.

## 6. 참고 문서

* [PLURA V6 회원가입 매뉴얼](https://docs.plura.io/ko/v6/signup)
* [웹방화벽 자동 IP 차단 기능 안내](https://docs.plura.io/ko/v6/fn/comm/ipblock/auto)
* [제로데이 의심 공격 탐지 기능 안내](https://docs.plura.io/ko/v6/fn/comm/sdetection/zeroday)
* [EDR 및 자동 포렌식 연동 기능 안내](https://docs.plura.io/ko/v6/fn/comm/edr)
* [시스템 정보 조회 기능 안내](https://docs.plura.io/ko/v6/fn/comm/systemmgmt/system#id-2)
* [AV 및 Microsoft Defender 상태 조회 기능 안내](https://docs.plura.io/ko/v6/fn/comm/systemsec)
* [PLURA-TI 연동을 위한 API Key 생성 가이드](https://github.com/QubitSecurity/howto/tree/main/api/ti)
* [PLURA-AI 연동을 위한 API Key 생성 가이드](https://github.com/QubitSecurity/howto/tree/main/api/ai)
