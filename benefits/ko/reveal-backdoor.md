# 🛡️ PLURA-EDR – APT·랜섬웨어 공격에서 숨겨진 백도어 탐지 역량

## 1. 위협 현실 – APT와 랜섬웨어의 ‘잠복 백도어’

랜섬웨어를 포함한 APT 공격은 단순 암호화 공격으로 끝나지 않습니다.
공격자는 **향후 재침투를 위해 서버 내부에 은밀한 백도어**를 설치합니다.
최근 사례에서도 동일한 공격 패턴이 확인되었습니다.

* 🎯 **롯데카드 공격 사례** – 침투 후 백도어를 통한 재공격 시도
* 🎯 **SKT BPFDoor 사건** – 서버 내부에 장기간 숨어 C2와 통신하며 공격 재개

이는 단순한 악성 실행 탐지 수준을 넘어, **운영체제 감사 정책(Audit Policy)** 과 **오딧 로그(Audit Log)** 기반의 고급 행위 분석 없이는 파악하기 어려운 위협입니다.

---

## 2. PLURA-XDR의 EDR 차별성

PLURA-XDR의 EDR은 MITRE ATT\&CK 기반 행위 분석 체계와 결합하여,
다음과 같은 독자적 탐지·대응 역량을 제공합니다.

### ✔ 고급 감사 정책 활용

* Windows·Linux OS의 **고급 감사 정책(Advanced Audit Policy)** 를 활성화
* 계정 활동, 권한 상승, 서비스 등록, 커널/네트워크 후킹 등 세밀한 이벤트 포착

### ✔ Audit 로그 기반 MITRE ATT\&CK 매핑

* 공격자가 심은 백도어의 실행, 지속성(Persistence) 시도, 은폐(Defense Evasion) 행위를 **ATT\&CK 전술·기술과 매핑**
* 시그니처 없이 **행위 시퀀스 기반 탐지**가 가능

### ✔ 실시간 대응 & 포렌식

* 탐지 즉시 **프로세스 종료·네트워크 격리**
* 타임라인 포렌식을 통해 **백도어 설치 및 재침투 경로 분석**
* 랜섬웨어 감염 전 Shadow Copy 기반 **자동 복구 기능**으로 피해 최소화

---

## 3. 글로벌 제품 대비 구조적 우위

| 항목               | 기존 글로벌 EDR    | **PLURA-XDR**                                    |
| ---------------- | ------------- | ------------------------------------------------ |
| 탐지 범위            | 엔드포인트 행위 중심   | **웹 + OS 로그 + Audit 기반 행위 상관 분석**                |
| 백도어 탐지 능력        | 제한적 (시그니처 의존) | **행위 기반 탐지, 잠복형 백도어 추적 가능**                      |
| MITRE ATT\&CK 적용 | 부분 적용         | **Persistence / Defense Evasion / C2까지 전 단계 커버** |
| 실전 적용 사례         | 일부 공개         | **BPFDoor, DragonForce 랜섬웨어 등 실전 탐지·대응 사례 확보**   |

---

## 4. 결론 – PLURA EDR의 실질적 가치

* APT와 랜섬웨어는 반드시 **백도어 잠복 → 재침투** 흐름을 동반합니다.
* **PLURA-XDR EDR은 고급 감사 정책과 Audit 로그 기반 탐지 구조**를 통해
  **숨겨진 백도어까지 추적·탐지·차단**하는 **국내 유일의 실전형 EDR**입니다.

> 즉, 단순 엔드포인트 방어가 아니라,
> **실제 공격자가 어떻게 잠복하고 되돌아오는지까지 대응할 수 있는 유일한 플랫폼**이라는 점이
> PLURA-XDR의 본질적인 차별성입니다.

---

## 🌟 함께 읽기 PLURA-Blog
- [지금 해킹 공격이 진행 중인지 확인하려면?](https://blog.plura.io/ko/column/why-plura-xdr-merit/)  
- [PLURA를 활용한 BPFDoor 탐지: Audit 로그와 포렌식 기반 대응](https://blog.plura.io/ko/respond/bpfdoor_with_plura/)  
- [SKT 해킹 가설: 유심 데이터 탈취와 BPFDoor 설치, 어떻게 이뤄졌나?](https://blog.plura.io/ko/column/skt-hacking-hypothesis/)  
- [DragonForce 랜섬웨어 실전 탐지: PLURA-XDR로 막아낸 위협](https://blog.plura.io/ko/respond/dragonforce/)  
- [파일리스(Fileless) 공격 대응 필수 체크리스트](https://blog.plura.io/ko/column/fileless_checklist/)  
- [웹 서비스 공격에 대응하기 against 샤오치잉(Xiaoqiying)](https://blog.plura.io/ko/respond/web-service-attack-response-against-xiaoqiying/)  

