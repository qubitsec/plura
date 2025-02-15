## 1. 기존 AWS 고객을 오라클로 윈백하기 위한 전략

1. **AWS 대비 비용 경쟁력 확보**  
   - 기존 AWS 고객이 주로 사용하는 CDN(AWS CloudFront) 대신 **오라클 CDN(Oracle-CDN)** 을 이용함으로써 비용을 절감할 수 있습니다.  
   - PLURA-WAF 서비스를 필요 시점에만 활용하고, **DDoS 공격 시점**에만 오라클의 안티 DDoS를 연동하여 트래픽을 방어하므로 불필요한 상시 비용이 줄어듭니다.

2. **안티 DDoS(Oracle-DDoS)로 보안 신뢰도 제고**  
   - 대규모 DDoS 공격이 발생하면, 단순히 WAF만으로는 대응이 어려울 수 있습니다.  
   - **오라클 DDoS 방어** 서비스와 연동하여, 공격이 발생하는 기간 동안만 DDoS 방어 구간으로 트래픽을 전환함으로써 확실한 보호와 비용 효율을 동시에 달성할 수 있습니다.

3. **단계적 도입으로 부담 완화**  
   - 평상시에는 PLURA-WAF를 이용하여 웹 트래픽 보안을 유지하며, 필요한 경우(공격 시) API 전환만 수행하면 됩니다.  
   - 기존 인프라(예: AWS EC2, AWS ALB 등)를 즉시 모두 교체할 필요가 없으므로, 고객의 부담을 줄이고 “윈백” 시도를 유연하게 진행할 수 있습니다.

4. **PLURA-WAF + Oracle-DDoS 연동의 간편성**  
   - PLURA-WAF에서 직접 DDoS 공격을 감지해 **Oracle-DDoS**로 트래픽을 넘기는 구조이므로, 복잡한 설정 없이도 인프라를 확장할 수 있습니다.  
   - 공격 차단 후에는 **정상 트래픽**만 다시 WAF → 웹 서버로 전달되므로, 보안 가시성과 제어권을 유지할 수 있습니다.

---

## 2. 전체 서비스 구성

아래는 이 전략을 구현한 **2가지 시나리오** (기본 상태 / DDoS 발생 시) 입니다.  

### 🅰️ **시나리오 A: 기본 상태 (PLURA-WAF 중심 운영)**

```mermaid
graph LR
    User -->|Request| Oracle-CDN
    Oracle-CDN -->|Route| ALB
    ALB -->|Filter| PLURA-WAF
    PLURA-WAF -->|Protected Traffic| WebServer
```

- **User**: 최종 사용자  
- **Oracle-CDN**: 오라클의 CDN 서비스 (기존 AWS CloudFront 대체)  
- **ALB**: 로드 밸런싱  
- **PLURA-WAF**: 웹 방화벽으로 평상시 트래픽 필터링 및 보안 제공  
- **WebServer**: 실제 웹 서비스(오라클의 Compute 등)  

> **정상 상황**:  
> - 사용자 요청이 오라클 CDN → ALB → PLURA-WAF 순으로 전달  
> - PLURA-WAF에서 기본 보안 정책에 따라 필터링 후, 웹 서버로 최종 전달  

---

### 🅱️ **시나리오 B: DDoS 발생 시 (오라클 DDoS 방어 연동)**

```mermaid
graph LR
    User -->|Request| Oracle-DDoS
    Oracle-DDoS -->|Mitigated Traffic| Oracle-CDN
    Oracle-CDN -->|Traffic| PLURA-WAF
    PLURA-WAF -->|Forward| WebServer
```

- **Oracle-DDoS**: 오라클의 DDoS 방어 서비스  

> **DDoS 공격 상황**:  
> - PLURA-WAF에서 DDoS 공격을 감지하면 **Oracle-DDoS**로 트래픽을 넘김  
> - 오라클 DDoS 방어 서비스가 대규모 공격을 차단하고, 정제된 정상 트래픽만 다시 **PLURA-WAF**로 전달  
> - 최종적으로 웹 서버에 안전하게 도달  

---

## 3. 결론

- **기존 AWS 고객**은 PLURA-WAF + Oracle-DDoS 연동으로 **비용 절감**과 **보안 강화**를 동시에 누릴 수 있습니다.  
- 오라클 입장에서는 **AWS에서 오라클로 윈백**을 유도할 수 있고, 고객은 **유연한 보안/비용 모델**을 확보합니다.  
- DDoS 공격에 대응할 때만 **Oracle-DDoS**를 활성화함으로써 **필요 시점에만 추가 비용**이 발생하기 때문에, **고객 만족도**와 **비용 효율**이 모두 높아집니다.  
