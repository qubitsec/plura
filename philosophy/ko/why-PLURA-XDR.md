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

---

**PLURA-XDR**은 이런 대응 방식에 대하여 각 제품을 수직적으로 통합하여 제공하고 있는 플랫폼입니다.

## 프루라의 문제 의식

프루라는 다음과 같은 문제 의식에서 출발하였습니다:

- 네트워크 기반 정보보안 제품인 침입차단시스템(IPS), 침입탐지시스템(IDS), 네트워크탐지와대응(NDR) 등은 암호화된 패킷 분석에 있어서 매우 제한적으로 운영됩니다. 그러므로, TCP/IP 전체 패킷 중 오직 웹패킷(HTTP/HTTPS)만 대응에 사용되고 있습니다. 웹패킷 분석은 웹방화벽이 월등히 뛰어납니다. [1]
- 웹방화벽은 우회 공격에 취약할 수 있으며, 단일 제품으로는 크리덴셜 스터핑 공격에 대응하지 못합니다. [2][3]
- 통합보안이벤트관리 (SIEM) 시스템은 주로 네트워크 정보보안 제품의 로그(syslog)를 수집합니다. 하지만, 정보보안 제품은 정확한 탐지 설명을 제공하지 않으며, 본문 정보를 포함하는 경우는 웹방화벽(WAF)이 유일합니다. [4]
- 통합보안이벤트관리 (SIEM) 시스템에 취합되는 정보가 부족하여 탐지의 신뢰성을 확보하기 어렵습니다. 따라서 통합보안이벤트관리의 탐지 결과와 연동되는 보안운영자동화 (SOAR)는 실제 환경에서 동작하기 어렵습니다.

## 웹 패킷과 암호화의 영향

인터넷 TCP/IP 패킷에서 웹 패킷인 HTTP/HTTPS의 비중을 정확히는 알 수 없지만, 대략 80~90%로 추정되며, Cloudflare는 이 중 HTTPS 비중이 83%, 크롬 브라우저는 93%라고 발표했습니다. 우리가 사용하는 대부분의 패킷은 암호화된 웹 패킷(HTTPS)으로 볼 수 있습니다.

암호화된 패킷 때문에 해킹 공격에 대응할 수 없는 상황에서 네트워크 구조를 복잡하게 만드는 제품(UTM, IPS, IDS, NDR)을 제거하는 것이 해결책이 될 수 있습니다.

## PLURA-XDR의 가치

우리는 각 제품을 직접 개발하여 수직적으로 통합된 정보 보안 플랫폼(**PLURA-XDR**)을 제공해야 현재의 정보보안 문제를 해결할 수 있다고 생각했습니다.

### 수직적으로 통합한 플랫폼의 가치 제공

1. 웹방화벽(WAF)은 암호화된 패킷을 복호화하여 대응
2. 호스트보안(EDR)은 해커가 도달하는 최종 서버와 PC에 설치되어 악성 행위에 대응
3. 통합보안이벤트(SIEM) 솔루션이 정상적으로 동작하기 위해서는 정확한 탐지 정보와 본문 정보가 필수적
4. 보안운영자동화(SOAR) 시스템이 정확하게 탐지된 통합보안이벤트 시스템과 연동되어 해킹에 대응. 예를 들어, 계정탈취 공격인 크리덴셜 스터핑을 탐지하고 차단하는 방식입니다.

---

## 결론
정보보안의 문제는 솔루션 선택에만 있지 않습니다. 솔루션과 함께 반드시 필요한 **보안관제(MSS, Managed Security Service)**가 필요합니다.

현재 보안관제는 매우 제한된 서비스만 제공하고 있습니다. 이유는 앞서 설명한 것처럼 프루라의 문제 의식과 동일 선상에 있습니다.

- 관제 요원에게 제공되는 제한된 정보
- 접근 불가능한 운영 시스템

## PLURA-XDR 플랫폼을 활용하면 어떻게 달라질까요?

- 상세 탐지 설명과 원본 로그 제공으로 공격 여부 판단
- 운영 시스템에 접근하지 않고 자유롭게 침해사고 분석 가능
- 진행 중인 공격을 확인 후 차단을 수행하는 **실시간 대응**
- 공격에 대한 가시성과 컨텍스트 제공으로 주도적인 대응 가능

이러한 차별점을 바탕으로 **완벽하게 해킹 공격에 대응하는 시스템**을 제공해 드립니다.

### 참고 사이트
1. [IPS와 NDR 차이와 한계 with ChatGPT](http://blog.plura.io/?p=18953)
2. [웹방화벽 우회 공격 대응](http://blog.plura.io/?p=19174)
3. [크리덴셜 스터핑 공격 대응하기 with ChatGPT](http://blog.plura.io/?p=18955)
4. [Splunk 에서 요청 본문 로그 분석하기 with ChatGPT](http://blog.plura.io/?p=18910)
5. [WAF vs IPS vs UTM 비교하여 웹 공격 최상의 제품 선택하기 with ChatGPT](http://blog.plura.io/?p=19190)
