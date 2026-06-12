## 제로 데이(Zero-Day) 공격 탐지 및 대응 – 사례 및 시나리오

### 🔍 제로 데이 공격이란?  
**제로 데이 공격**(Zero-Day Attack)은 보안 취약점이 발견되었지만, 아직 공식적인 패치나 대응 방법이 제공되지 않은 상태에서 공격자가 이를 악용하는 사이버 공격입니다.  

기존 보안 시스템(SIEM, WAF, NDR 등)은 **이미 알려진 공격 패턴**(시그니처, 룰 기반 탐지)에 의존하기 때문에 제로 데이 공격을 탐지하기 어렵습니다.  

PLURA의 **웹 요청 본문 로그 분석 + EDR**을 활용하면, 제로 데이 공격을 보다 효과적으로 탐지하고 대응할 수 있습니다.  

---

1. [사례 1: Log4j(Log4Shell) 취약점 공격 탐지](scenario-log4j.md)

2. [사례 2: API 취약점 악용 (Zero-Day API Attack)](scenario-api-attack.md)

3. [사례 3: 크리덴셜 스터핑(Credential Stuffing) 공격 탐지](scenario-credential-stuffing.md)
