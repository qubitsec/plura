# ✅ PLURA-XDR PoC 체크리스트

## 1. 위협 탐지 (Detection)

* [ ] **악성코드 탐지**: Known / Unknown / 변종 악성코드 탐지
* [ ] **Fileless 공격 탐지**: PowerShell, Python, VBA Script 기반 메모리 공격 탐지
* [ ] **Exploit 탐지**: 문서(PDF, HWP, MS Office) 및 브라우저 기반 Drop 공격 탐지
* [ ] **MITRE ATT\&CK 매핑**: 탐지 이벤트 심각도 근거 + ATT\&CK 대시보드 제공

---

## 2. 대응 (Response)

* [ ] **격리 지원**: 단말/서버 네트워크 격리(자동/수동)
* [ ] **프로세스/파일 차단**: Kill, Uninstall, 파일 격리, 레지스트리 삭제 지원
* [ ] **랜섬웨어 대응**: 암호화 발생 시 자동 차단
* [ ] **화이트리스트/블랙리스트**: 특정 프로세스 및 폴더 정책 적용

---

## 3. 분석 & 포렌식 (Analysis & Forensics)

* [ ] **위협 타임라인 시각화** (행위 기반 시각화)
* [ ] **상관관계 분석**: 다양한 요소 조합 분석
* [ ] **명령어 히스토리**: 실행된 PowerShell, WebShell 기록 확보
* [ ] **프로세스 트리 분석**: Parent/Child 관계 기반 구조 확인
* [ ] **포렌식 수집**: 특정 파일 검색·다운로드 및 전수조사

---

## 4. 에이전트 관리 (Agent & Policy)

* [ ] **에이전트 스캔**: 파일, 네트워크, 레지스트리 기반 검색
* [ ] **위협 Agent 관리**: 감염/미설치/Uninstall/장기 미접속 Agent 추적
* [ ] **Agent 보호**: 종료·삭제 방지, 파일/폴더/레지스트리 보호
* [ ] **그룹 관리**: 테넌트/관계사 단위 그룹화 관리
* [ ] **멀티 OS 지원**: Windows / Linux 지원 여부 확인

---

## 5. 안정성 & 운영 (Stability & Operations)

* [ ] **리소스 안정성 보장**: CPU, Memory, Disk 부하 최소화
* [ ] **온프렘·클라우드 지원**: Hybrid 인프라 대응
* [ ] **시나리오 기반 검증**: Cyber Kill Chain 기반 (감염 → 권한상승 → 전파 → 유출)

---

## 6. PoC 실행 조건 (Test Requirements)

* [ ] 랜섬웨어 샘플 별도 준비 후 복원 시연
* [ ] Agent 최소 5~10대 설치, 웹 서버 반드시 포함

---

# 🔹 추가 제안 (PLURA-XDR 특화)

* [ ] **SIEM 연동 검증**: PLURA-XDR의 통합 로그 분석 및 상관관계 탐지 확인
* [ ] **SOAR 자동화 시연**: 탐지 이벤트 발생 → 차단 → 티켓 생성 → 알림/조치 자동화
* [ ] **Forensic Copilot**: 공격 발생 시 로그/파일 증거 자동 분석 보고서 생성
* [ ] **Threat Intelligence (TI) 연계**: VirusTotal, AbuseIPDB 등 외부 TI 조회 반영
* [ ] **멀티언어 지원**: 탐지/보고서 한·일·영 다국어 지원 검증
* [ ] **Self-Protection Test**: 에이전트 Tamper Protection(자체 보호) 기능 확인
* [ ] **대시보드 UX**: 운영자가 직관적으로 탐지·차단 상황을 확인할 수 있는지 검증

---
