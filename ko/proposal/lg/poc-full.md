# LG 미토스급 AI 공격 대응 PLURA-XDR PoC 시나리오 제안서

## 1. 제안 목적

**미토스급 AI가 생성·변형한 공격이 기존 보안체계를 우회하더라도 PLURA-XDR이 웹 최초 침투부터 서버·PC 내부 행위까지 탐지하고 대응할 수 있는지**를 검증하는 것을 목적으로 합니다.

주요 검증 범위는 다음과 같습니다.

- 외부 웹 공격 표면 탐색 및 변형 공격
- 기존 WAF 우회 및 제로데이 의심 공격
- 웹서버에서의 최초 명령 실행
- 웹셸·악성파일 생성
- PowerShell·Windows 기본 도구 및 Linux 기본 명령을 악용하는 LOLBAS·LOTL 공격
- 권한 상승, 자격증명 접근, 내부 탐색 및 외부 C2 통신
- MITRE ATT&CK 기반 탐지·대응
- 공격 IP 차단 및 자동 포렌식

---

## 2. PoC 전체 구성도

T-Proxy에서 제공하는 복호화 웹 트래픽과 WAF·호스트 로그를 PLURA-XDR에서 통합 분석하는 구조로 구성합니다. 웹 최초 침투뿐 아니라 침투 이후의 명령, 프로세스, 파일, 계정, 네트워크 행위를 연결하여 확인합니다.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Pretendard, Noto Sans KR, Arial",
    "background": "#ffffff",
    "primaryTextColor": "#0f172a",
    "lineColor": "#1f2937"
  }
}}%%

flowchart LR

    ATTACKER(["미토스급 AI / 레드팀<br/><b>변형·제로데이 공격</b>"])

    subgraph EDGE["외부 공격 표면"]
        direction LR
        FW["방화벽 / DDoS"]
        TP["T-Proxy<br/><b>SSL/TLS 복호화</b>"]
        WAF["PLURA-WAF<br/><b>웹 공격 탐지·차단</b>"]
    end

    subgraph HOST["서버·엔드포인트"]
        direction LR
        WEB["웹·애플리케이션 서버<br/><b>PLURA-EDR / Audit</b>"]
        INTERNAL["내부 서버·PC<br/><b>PLURA-EDR / Audit</b>"]
    end

    subgraph XDR["PLURA-XDR"]
        direction TB
        PACKET["웹 패킷 분석<br/>Request / Response Body"]
        EVENT["WAF 웹 로그 분석"]
        MITRE["행위·감사 로그 분석<br/><b>MITRE ATT&CK / LOLBAS·LOTL</b>"]
        AI["AI 분석<br/><b>ChatGPT 기반 공격 판단</b>"]
        RESPONSE["대응<br/>차단·알림·자동 포렌식"]
        DASH["통합 대시보드<br/>공격 체인·증거 확인"]
    end

    SOC(["보안담당자 / 레드팀"])

    ATTACKER --> FW --> TP --> WAF --> WEB
    WEB -. "침투 후 내부 확산 시도" .-> INTERNAL

    TP -. "복호화 웹 트래픽" .-> PACKET

    WAF -. "탐지·차단 이벤트" .-> EVENT
    WAF -. "의심 웹 공격·원본 요청" .-> AI

    WEB -. "명령·프로세스·파일·Audit 이벤트" .-> MITRE
    INTERNAL -. "계정·원격접속·Audit / EDR 이벤트" .-> MITRE

    PACKET --> AI
    EVENT --> AI
    MITRE --> AI

    AI -. "공격 판단·위험도·차단 요청" .-> WAF
    AI --> RESPONSE --> DASH --> SOC

    RESPONSE -. "공격 IP·웹 요청 차단" .-> WAF
    RESPONSE -. "호스트 대응·포렌식" .-> WEB
    RESPONSE -. "호스트 대응·포렌식" .-> INTERNAL

    classDef attack fill:#fff1f2,stroke:#ef4444,stroke-width:2px,color:#7f1d1d;
    classDef edge fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0c4a6e;
    classDef host fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#14532d;
    classDef xdr fill:#faf5ff,stroke:#9333ea,stroke-width:2px,color:#581c87;
    classDef soc fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#7c2d12;

    class ATTACKER attack;
    class FW,TP,WAF edge;
    class WEB,INTERNAL host;
    class PACKET,EVENT,MITRE,AI,RESPONSE,DASH xdr;
    class SOC soc;
```

> T-Proxy와 기존 WAF의 실제 배치 위치 및 미러링 방식은 LG의 네트워크 구성에 맞춰 조정합니다. T-Proxy는 복호화 웹 트래픽을 제공하는 역할로 한정합니다.

---

## 3. PoC 시나리오 선택안

### 시나리오 1. AI 변형 웹 공격 탐지

#### 목표

AI가 생성·변형한 웹 공격이 기존 WAF를 우회하는 경우에도 PLURA-XDR이 복호화 웹 패킷의 요청·응답 내용을 분석하여 공격을 탐지하고 대응할 수 있는지 확인합니다.

#### 공격 흐름

```mermaid
flowchart LR
    A["미토스급 AI / 레드팀"]
    B["공격 표면 탐색"]
    C["웹 공격 코드 생성·변형"]
    D["기존 WAF 탐지 우회"]
    E["Nginx·웹 애플리케이션 도달"]
    F["PLURA-XDR 웹 패킷 분석"]
    G["AI 공격성 판단"]
    H["탐지·차단·증거 보존"]

    A --> B --> C --> D --> E
    E --> F --> G --> H
```

#### 테스트 항목

- SQL 인젝션, 명령어 삽입, 파일 업로드
- 인코딩·분할·문법 변경 등 변형 공격
- 정상 요청과 유사하게 위장한 공격
- Nginx와 웹 애플리케이션의 해석 차이를 이용한 공격
- 기존 WAF가 탐지하지 못한 제로데이 의심 공격
- 요청 본문과 응답 본문을 함께 확인해야 하는 공격

#### 확인 결과

> 기존 WAF가 놓친 AI 변형 웹 공격을 PLURA-XDR이 웹 요청·응답 내용을 기반으로 탐지하고 차단할 수 있는지 확인합니다.

---

### 시나리오 2. 최초 침투 이후 MITRE ATT&CK 및 LOLBAS·LOTL 기반 탐지

#### 목표

웹 공격이 기존 WAF를 우회하여 서버에서 코드 실행에 성공한 경우, 별도의 악성코드를 설치하지 않고 운영체제의 정상 도구를 악용하는 LOLBAS·LOTL 행위를 포함하여 침투 이후 공격을 PLURA-XDR이 MITRE ATT&CK 기반으로 탐지하고 대응할 수 있는지 확인합니다.

#### 공격·탐지 구성도

```mermaid
flowchart TB
    T1190["외부 노출 서비스 취약점 악용<br/><b>T1190</b>"]
    EXEC["명령·스크립트 실행<br/><b>T1059</b>"]
    SHELL["웹셸·악성파일 생성<br/><b>T1505.003 / T1105</b>"]
    LOTL["정상 시스템 도구 악용<br/><b>LOLBAS·LOTL</b><br/>T1218 · T1047 · T1053"]
    PRIV["권한 상승·계정 악용<br/><b>T1068</b>"]
    MOVE["원격 서비스·내부 탐색<br/><b>T1021</b>"]
    C2["HTTP/HTTPS C2 통신<br/><b>T1071.001</b>"]

    P1["웹 패킷·WAF 이벤트"]
    P2["Nginx·웹 로그"]
    P3["Process · Command Line<br/>Audit · EDR 로그"]
    P4["계정·원격접속·네트워크 이벤트"]
    XDR["PLURA-XDR<br/><b>공격 체인 통합 분석</b>"]
    RESP["차단·알림·자동 포렌식"]

    T1190 --> EXEC --> SHELL --> LOTL --> PRIV --> MOVE --> C2

    P1 -.-> T1190
    P2 -.-> EXEC
    P3 -.-> EXEC
    P3 -.-> SHELL
    P3 -.-> LOTL
    P3 -.-> PRIV
    P4 -.-> MOVE
    P4 -.-> C2

    T1190 --> XDR
    EXEC --> XDR
    SHELL --> XDR
    LOTL --> XDR
    PRIV --> XDR
    MOVE --> XDR
    C2 --> XDR
    XDR --> RESP
```

#### 테스트 항목

- 웹서버 프로세스가 실행한 비정상 명령과 부모·자식 프로세스 관계
- 웹셸 및 악성파일 생성
- Shell·PowerShell·Windows Command Shell·Python 등 명령·스크립트 실행
- `rundll32`, `regsvr32`, `mshta`, `wscript`, `cscript`, `wmic`, `schtasks` 등 LOLBAS 악용
- `bash/sh`, `curl/wget`, `python/perl`, `ssh/scp`, `cron/systemd` 등 Linux LOTL 행위
- 정상 도구를 이용한 다운로드, 실행, 지속성 확보, 방어 회피
- 계정·권한 변경 및 권한 상승
- 외부 C2 통신과 내부 시스템 탐색·측면 이동
- 자동 포렌식 및 침해 증거 수집

#### 확인 결과

> 공격 코드나 악성파일의 해시를 알 수 없는 경우에도, 웹 요청 이후 발생한 명령 실행과 LOLBAS·LOTL 도구 악용, 파일·계정 변경, 권한 상승, 내부 이동 및 C2 통신을 하나의 공격 체인으로 탐지할 수 있는지 확인합니다.


#### LOLBAS·LOTL 세부 검증 기준

LOTL은 공격자가 새로운 악성도구를 설치하는 대신 시스템에 이미 존재하는 정상 관리 도구를 악용하는 공격 방식입니다. Windows 환경에서 이러한 바이너리·스크립트·라이브러리를 체계화한 범주가 LOLBAS입니다.

| 환경 | 주요 행위 예시 | 핵심 확인 데이터 | MITRE ATT&CK 예시 |
|---|---|---|---|
| Windows | PowerShell·cmd 실행, 서명된 시스템 바이너리를 통한 우회 실행, WMI·예약 작업 악용 | 부모·자식 프로세스, 명령행, 사용자, 실행 경로, 파일·레지스트리 변경 | T1059, T1218, T1047, T1053 |
| Linux | Shell·Python 실행, curl·wget을 이용한 도구 유입, SSH·SCP 및 cron·systemd 악용 | Audit 로그, execve, 사용자·권한, 파일 생성, 원격접속·네트워크 연결 | T1059.004, T1059.006, T1105, T1021, T1053 |
| 공통 | 정상 도구를 이용한 다운로드·실행·지속성·내부 이동·C2 | 명령·프로세스·파일·계정·네트워크 이벤트의 시간순 상관분석 | T1105, T1071.001 등 |

단순히 PowerShell이나 시스템 관리 도구가 실행되었다는 이유만으로 공격으로 판단하지 않습니다. **웹 공격 직후의 실행 관계, 비정상 인자, 실행 계정, 파일 생성, 외부 통신과 후속 행위를 함께 연결**하여 정상 운영과 공격을 구분합니다.


---

### 시나리오 3. 미토스급 AI 공격 전체 체인 대응

#### 권고 시나리오

시나리오 1과 2를 연결하여 외부 공격부터 서버 내부 침해, 대응과 포렌식까지 하나의 공격 스토리로 검증합니다.

#### 전체 공격 체인

```mermaid
flowchart LR
    S1["1. 공격 표면 탐색"]
    S2["2. WAF 우회형 공격 생성"]
    S3["3. Nginx·웹 취약점 악용"]
    S4["4. 최초 명령 실행"]
    S5["5. 웹셸·악성파일 생성"]
    S6["6. LOLBAS·LOTL 악용"]
    S7["7. 권한 상승·계정 접근"]
    S8["8. 내부 이동·C2 통신"]
    S9["9. PLURA-XDR 탐지·차단·포렌식"]

    S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8 --> S9
```

#### 실시간 시연 순서

```mermaid
sequenceDiagram
    autonumber
    participant RT as 미토스급 AI / 레드팀
    participant TP as T-Proxy
    participant WAF as 기존 WAF
    participant WEB as Nginx·웹서버
    participant XDR as PLURA-XDR
    participant AI as ChatGPT 분석
    participant SOC as 보안담당자

    RT->>TP: 변형·제로데이 웹 공격
    TP->>WAF: 복호화된 웹 요청 전달
    TP-->>XDR: 복호화 웹 패킷 제공

    alt 기존 WAF가 공격 탐지
        WAF-->>XDR: 탐지·차단 이벤트
    else 기존 WAF가 공격 미탐
        WAF->>WEB: 공격 요청 통과
        WEB-->>XDR: Nginx·웹 로그
        WEB-->>XDR: 명령·파일·프로세스 이벤트
        WEB-->>XDR: LOLBAS·LOTL 및 계정·네트워크 행위
    end

    XDR->>AI: 웹 패킷과 호스트 공격 체인 분석 요청
    AI-->>XDR: 공격 여부·위험도·근거 반환
    XDR-->>SOC: MITRE ATT&CK 공격 체인 알림
    XDR-->>WAF: 공격 IP 차단 명령
    XDR-->>WEB: 포렌식·호스트 대응 수행
```

#### 확인 결과

> AI가 생성한 변형·제로데이 웹 공격이 기존 WAF를 우회하더라도, PLURA-XDR이 최초 웹 요청부터 명령 실행, 웹셸·악성파일 생성, LOLBAS·LOTL 악용, 권한 상승, 내부 이동 및 외부 통신까지 전체 공격 흐름을 탐지하고 대응할 수 있는지 확인합니다.

---

## 4. PoC 수행 전제 및 안전 조건

미토스급 AI 공격 대응 역량을 검증하되, 실제 서비스 장애나 데이터 손상을 유발하지 않도록 다음 원칙을 적용합니다.

- 원칙적으로 스테이징 또는 격리된 PoC 환경에서 수행
- 공격 대상, 허용 계정, 출발지 IP, 시간대와 테스트 항목을 사전 승인
- 운영환경에서 수행하는 경우 비파괴 방식과 읽기 중심 검증으로 제한
- 실제 랜섬웨어 암호화, 대량 데이터 삭제, 실제 중요정보 반출은 수행하지 않음
- 파일 생성·변경과 권한 상승은 무해한 표식 파일, 테스트 계정과 복구 가능한 범위로 제한
- 서비스 지연, 오류율 상승, 자원 사용량 급증 시 즉시 중단하는 기준 마련
- 테스트 전 스냅샷·백업과 원상복구 절차 확보
- 기존 WAF·EDR 정책과 PLURA-XDR 정책 변경 이력을 모두 기록

AI 모의해킹 도구의 공격 강도를 낮추면 충분한 검증이 어려울 수 있으므로, **실제 공격 행위는 재현하되 결과는 무해하게 제한하는 방식**으로 시나리오를 설계합니다.

---

## 5. 보조 시나리오: 크리덴셜 스터핑 공격

전체 공격 체인과 별도로 다음 계정 공격을 병행할 수 있습니다.

- 다수 IP를 이용한 분산 로그인 공격
- 낮은 빈도로 장시간 지속되는 공격
- 여러 계정을 순환하는 공격
- 동일 인증정보의 반복 사용
- 로그인 성공 이후의 비정상 행위

PLURA-XDR에서는 임계치 기반 탐지, 공격 IP 차단, 계정·세션·IP 연계 분석을 확인합니다.

---

## 6. 시나리오별 비교

| 구분 | 시나리오 1 | 시나리오 2 | 시나리오 3 |
|---|---|---|---|
| 중심 영역 | 웹 공격 | 서버·PC 침해 | 전체 공격 체인 |
| 주요 데이터 | 복호화 웹 패킷, WAF·웹 로그 | Audit·EDR 로그 | 웹 패킷과 호스트 로그 전체 |
| 핵심 검증 | WAF 미탐 공격 탐지 | MITRE ATT&CK 및 LOLBAS·LOTL 탐지 | 최초 침투부터 대응까지 연결 |
| PoC 난이도 | 낮음 | 중간 | 높음 |
| 차별성 | AI 웹 공격 분석 | 정상 도구 악용까지 포함한 행위 탐지 | PLURA-XDR 통합 대응 역량 |
| 권고 | 선택 가능 | 선택 가능 | **최종 권고** |

---

## 7. PoC 성공 기준

다음 수치는 PoC 제안 단계의 권고 목표이며, 실제 목표값은 LG의 환경과 테스트 수량을 확인한 후 확정합니다.

| 평가 항목 | 권고 성공 기준 |
|---|---|
| 핵심 공격 탐지 | 사전 합의한 중요 공격 시나리오 100% 탐지 |
| 전체 탐지율 | 전체 테스트 케이스 기준 90% 이상 |
| 기존 WAF 보완 | 기존 WAF 미탐 공격 중 PLURA-XDR 추가 탐지 결과 제시 |
| LOLBAS·LOTL 탐지 | 정상 도구의 단순 실행이 아니라 공격 전후 맥락과 연계된 악용 행위 탐지 |
| 공격 체인 연결 | 웹 요청과 호스트 내부 행위를 동일 타임라인으로 연결 |
| MITRE ATT&CK | 합의한 공격 단계의 전술·기술 매핑 100% 제공 |
| AI 분석 | 공격 코드, 목적, 위험도와 판단 근거 제시 |
| 탐지·상관분석 시간 | 공격 이벤트 발생 후 5분 이내 공격 체인 구성 |
| 자동 대응 | 승인된 차단·포렌식 동작 성공률 95% 이상 |
| 포렌식 | 테스트 대상 공격의 원본 로그와 핵심 증거 100% 확보 |
| 오탐 | 지정한 정상 트래픽에서 치명적 오탐 0건, 전체 오탐은 사전 합의 기준 이하 |

---

## 8. PoC 결과물 및 운영화 방안

PoC 종료 시 단순 탐지 건수 외에 다음 결과물을 제공합니다.

- 공격 시나리오별 탐지·미탐·오탐 결과
- 최초 웹 요청부터 내부 행위까지의 공격 타임라인
- 데이터 소스별 탐지 기여도와 가시성 공백
- MITRE ATT&CK 전술·기술 커버리지와 미탐 구간
- LOLBAS·LOTL 행위별 탐지 근거와 정상 운영 구분 기준
- 탐지·차단·포렌식까지의 소요 시간
- 기존 WAF·EDR과 PLURA-XDR의 역할 분담
- 운영환경 적용을 위한 정책·예외·우선순위 권고

PoC 이후에는 다음 순서로 운영화를 진행할 수 있습니다.

1. 탐지 정책과 정상 관리 행위의 허용 기준 정리
2. 중요 공격에 대한 IP 차단·호스트 포렌식 플레이북 확정
3. WAF·EDR·SOC 운영 절차와 PLURA-XDR 연계
4. 우선 시스템부터 단계적으로 적용
5. 탐지 결과를 기반으로 정책과 대응 절차를 지속 보완

---

## 9. PLURA-XDR 제공 범위

- T-Proxy 복호화 웹 패킷 분석
- WAF 기반 웹 공격 탐지와 차단
- WAF가 놓치는 제로데이 의심 공격 분석
- 웹 요청·응답 본문 분석
- 서버·PC의 명령·프로세스·파일·계정·네트워크 및 감사 로그 분석
- MITRE ATT&CK 기반 침해 행위 탐지
- Windows LOLBAS 및 Linux LOTL 기반 정상 도구 악용 탐지
- 공격 IP 자동 차단
- 자동 포렌식과 침해 증거 제공

※ 메일 로그 분석은 제공 범위에 포함하지 않습니다.

---
