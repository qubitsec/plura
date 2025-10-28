
```mermaid
flowchart LR
  %% ====== Management Web/API Only ======
  subgraph M["관리 영역 (Web/UI & API)"]
    EMS[EMS/ENM Web Portal<br/>(HTTPS) — <b>웹서버</b>]
    NBI[NBI Gateway<br/>(REST / SOAP / LDAP over HTTPS) — <b>API 서버</b>]
  end

  subgraph C["HSS 내부 영역 (API)"]
    HSS_OAM[HSS OAM Interface<br/>(벤더 OAM API/HTTPS) — <b>API 서버</b>]
    HSS_FE[HSS Front-End (Provisioning Service)<br/>(내부 API) — <b>API 서버</b>]
    HSS_DB[(HSS DB)]:::db
  end

  %% Flows
  EMS -->|운영/프로비 요청| HSS_OAM
  NBI -->|가입자/요금제 프로비| HSS_FE
  HSS_OAM -->|내부 제어| HSS_FE
  HSS_FE --> HSS_DB

  %% Styles
  classDef web fill:#E8F5FF,stroke:#1E88E5,stroke-width:1px;
  classDef api fill:#E8F5E9,stroke:#2E7D32,stroke-width:1px;
  classDef db fill:#FFF3E0,stroke:#FB8C00,stroke-width:1px,stroke-dasharray:3 3;

  class EMS web;
  class NBI api;
  class HSS_OAM api;
  class HSS_FE api;
  class HSS_DB db;

```
