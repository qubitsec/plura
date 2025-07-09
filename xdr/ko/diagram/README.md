# 🧱 PLURA-XDR Architecture Overview

본 문서는 PLURA-XDR의 주요 구성 요소인 **PLURA-WAF**, **PLURA-XDR 통합 보안 플랫폼**, 그리고 **xWAF.io** (Oracle OCI 기반)의 네트워크 아키텍처를 시각화하고 설명합니다. 각 구성은 보안성, 확장성, 그리고 실시간 탐지/대응 기능을 중심으로 설계되어 있습니다.

---

## 🔰 1. PLURA-WAF 구성 (일반 환경)

```mermaid
flowchart LR
    User --> FW[Firewall]
    FW --> LB1[Load Balancer]
    FW --> LB2[Load Balancer]
    
    LB1 --> PLURA-WAF1[PLURA-WAF]
    LB2 --> PLURA-WAF2[PLURA-WAF]
    
    PLURA-WAF1 --> LB3[Load Balancer]
    PLURA-WAF2 --> LB4[Load Balancer]

    LB3 --> WebServer[Web Server]
    LB4 --> WebServer[Web Server]
````

### ✔️ 설명

* 방화벽(Firewall) 이후 다중 로드밸런서를 구성하여 **고가용성 및 이중화**를 확보합니다.
* **PLURA-WAF**는 리버스 프록시 방식으로 중간 경유 지점에 위치하며, 웹 트래픽을 실시간 분석하고 공격을 차단합니다.
* WAF 이후 또 다른 로드밸런서를 통해 트래픽을 최종 웹 서버로 분산하며, 이중화된 전체 구조는 **장애 시 무중단 우회**를 지원합니다.
* 해당 구성은 AWS, Azure, Oracle 등의 클라우드 환경뿐 아니라 온프레미스 환경에서도 동일하게 적용 가능합니다.

---

## 🛡️ 2. PLURA-XDR 통합 플랫폼

```mermaid
flowchart LR
    subgraph Network
        User --> FW[Firewall]
        FW --> ALB1[ALB]
        
        ALB1 --> PLURA-WAF1[PLURA-WAF]
        ALB1 --> PLURA-WAF2[PLURA-WAF]
        
        PLURA-WAF1 --> ALB2[ALB]
        PLURA-WAF2 --> ALB2[ALB]

        ALB2 --> WebServer["Web Server<br>(EDR)"]
    end

    subgraph Monitoring
        PLURA-SIEM[PLURA-SIEM] --> SOC[SOC]
    end 

    PLURA-WAF1 --> PLURA-SIEM
    PLURA-WAF2 --> PLURA-SIEM
    WebServer --> PLURA-SIEM
```

### ✔️ 설명

* **PLURA-XDR**는 WAF, EDR, SIEM을 연동한 통합 사이버 보안 플랫폼입니다.
* 각 보안 요소는 로그를 **PLURA-SIEM**으로 실시간 전송하여 상관 분석이 수행됩니다.
* 분석된 정보는 **SOC**(Security Operation Center, 보안관제팀)으로 전달되어 대응 체계를 강화합니다.
* 이 구조는 **MITRE ATT\&CK 기반 탐지 및 대응**을 지원합니다.

---

## 🌐 3. xWAF.io (Oracle OCI 기반)

```mermaid
flowchart LR
    subgraph Oracle OCI
		User --> DDoS
    end

    subgraph Pod
		DDoS --> ALB1[ALB]
		DDoS --> ALB2[ALB]

        ALB1 --> PLURA-WAF1[PLURA-WAF]
        ALB2 --> PLURA-WAF2[PLURA-WAF]

	    PLURA-WAF1 --> Gateway[Gateway]
		PLURA-WAF2 --> Gateway[Gateway]
    end

    subgraph OutSide
		Gateway --> ALB3[ALB]
		Gateway --> ALB4[ALB]
		ALB3 --> WebServer[Web Server]
		ALB4 --> WebServer[Web Server]
    end 
```

### ✔️ 설명

* Oracle OCI 환경에 배포된 **xWAF.io** 구조로, **DDoS 보호 → ALB → WAF → Gateway → Web Server** 단계로 구성됩니다.
* WAF는 컨테이너 기반 환경(Pod) 내에서 동작하며, 유연한 오토스케일링 구조를 지원합니다.
* xWAF는 미러링 방식 또는 경량화된 에이전트 방식을 통해 운영되며, **웹 본문 분석** 및 **로그 기반 공격 탐지**에 최적화되어 있습니다.

---

## 🧩 요약 비교

| 항목    | PLURA-WAF       | PLURA-XDR        | xWAF.io (OCI)              |
| ----- | --------------- | ---------------- | -------------------------- |
| 방식    | 리버스 프록시         | 통합 보안 플랫폼        | 미러 기반 또는 경량 에이전트           |
| 구성    | LB → WAF → Web  | WAF + EDR + SIEM | DDoS → WAF → Gateway → Web |
| 로그 연동 | X               | O (SIEM 연동)      | O (클라우드 로그 분석 기반)          |
| 배포 환경 | 온프레미스 또는 클라우드   | 범용 (클라우드/온프레미스)  | Oracle OCI                 |
| 특징    | 구조 단순, 독립 운용 가능 | 실시간 탐지 + 상관분석    | 경량 구성 + 고성능                |

---

> 📌 본 문서는 보안 아키텍처 설계 시 참고용이며, 실제 환경에 따라 IP 구성, 인증 체계, 로깅 정책은 달라질 수 있습니다.

---
