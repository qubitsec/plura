# PLURA XDR 철학

> “보안은 단일 제품이 아닌 플랫폼에서 기본적으로 통합되어야 한다.” </br>
> – 팔로알토 CPO 리 클라리치(Lee Klarich, Palo Alto Networks)

정보보안 시스템의 체계는 1990년대부터 **네트워크 경계 보안(Network Perimeter Security Model) 중심**이었습니다.

네트워크 접속 지점을 단일화한 다음, 단일 접속지점에서 강력한 보안 평가 및 통제를 적용하여 보안 목적을 달성하는 구조입니다. 이를 위해 단일 제품이 아닌 다단계로 여러 제품을 네트워크 상에 위치시켜 다양한 공격에 대응하는 개념입니다.

네트워크 경계 보안(Network Perimeter Security Model) 제품 분류는 다음과 같습니다.

1. 방화벽(Firewall)
2. 통합위협관리(UTM, Unified Threat Management)
3. 웹방화벽(WAF, Web Application Firewall)
4. 침입차단시스템(IPS, Intrusion Prevention System)
5. 침입탐지시스템(IDS, Intrusion Detection System)
6. 네트워크탐지와대응(NDR, Network Detection and Response)

![1990_Network_Perimeter_Security_Model](http://blog.plura.io/wp-content/uploads/2023/05/1990_Network_Perimeter_Security_Model.png)

2000년대에 들어서면서 단일 제품의 한계를 경험하며, 이를 연동해야 한다는 개념이 설득력을 얻게 됩니다. 그래서, **로그관리시스템 (LMS, Log Management System)**에서 **통합보안이벤트관리 (SIEM, Security Information and Event Management) 시스템**으로 확장하게 되었습니다.

여러 네트워크 장비의 로그를 통합 수집하고, 이렇게 수집된 로그들 간의 관계를 분석(상관분석)하여 이상징후를 탐지합니다.

통합보안이벤트관리 시스템의 핵심 목표는 상관분석으로 이상징후를 탐지하는 것이었지만, 자동 차단이라는 정보보안의 요구에 부흥하기 위해 **보안운영자동화 (SOAR, Security Orchestration, Automation and Response) 시스템**을 추가하여 연동하는 제안이 진행되고 있습니다.

![2020_SIEM_SOAR_EDR](http://blog.plura.io/wp-content/uploads/2023/05/2020_SIEM_SOAR_EDR.png)

이러한 개념을 기반으로 2020년대에는 **제로 트러스트 아키텍처 (ZTA, Zero Trust Architecture)**가 제안되고 있습니다. 

![Zero Trust Architecture](http://blog.plura.io/wp-content/uploads/2023/05/blog_20230516-1.jpg)

**PLURA-XDR**은 이러한 대응 방식을 수직적으로 통합하여 제공하는 플랫폼입니다.

## PLURA-XDR의 주요 특징
- 웹방화벽(WAF)은 암호화된 패킷을 복호화하여 대응
- 호스트보안(EDR)은 최종 서버와 PC에서 악성 행위에 대응
- 통합보안이벤트(SIEM) 솔루션이 정확한 탐지 정보와 본문 정보로 정상 작동
- 보안운영자동화(SOAR) 시스템이 정확하게 탐지된 통합보안이벤트와 연동하여 해킹에 대응

## 결론
정보보안은 솔루션 선택뿐만 아니라 **보안관제(MSS, Managed Security Service)**가 필수적입니다. **PLURA-XDR** 플랫폼을 활용하여 상세한 탐지 설명과 원본 로그 제공으로 보다 주도적으로 해킹 공격에 대응할 수 있습니다.

### 참고 사이트
1. [IPS와 NDR 차이와 한계 with ChatGPT](http://blog.plura.io/?p=18953)
2. [웹방화벽 우회 공격 대응](http://blog.plura.io/?p=19174)
3. [크리덴셜 스터핑 공격 대응하기 with ChatGPT](http://blog.plura.io/?p=18955)
4. [Splunk 에서 요청 본문 로그 분석하기 with ChatGPT](http://blog.plura.io/?p=18910)
5. [WAF vs IPS vs UTM 비교하여 웹 공격 최상의 제품 선택하기 with ChatGPT](http://blog.plura.io/?p=19190)
