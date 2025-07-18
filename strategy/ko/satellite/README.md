# 🛰️ Satellite Security Research & OS Architecture

이 저장소는 위성 시스템의 운영체제 구조, 지상국과 위성 간 보안 모델, 그리고 위성 해킹 시나리오와 대응 방안을 정리한 기술 문서 모음입니다. CubeSat, Starlink 등의 사례를 포함하여, 실제 시스템 설계나 위협 분석 시 참고할 수 있도록 구성하였습니다.

---

## 📚 문서 개요

| 문서 번호 | 제목 | 설명 |
|-----------|------|------|
| [01](./01_satellite_os_summary.md) | 위성에 탑재되는 운영체제 개요 | 위성 시스템에서 사용되는 RTEMS, FreeRTOS, Yocto Linux 등 OS 분석 |
| [02](./02_nasa_cubesat_and_starlink.md) | NASA CubeSat 및 SpaceX Starlink 분석 | 각 위성 시스템의 아키텍처, OS, 통신 구조에 대한 사례 정리 |
| [03](./03_ground_vs_space_os.md) | 지상국 vs 위성 운영체제 비교 | RTOS와 리눅스/윈도우 기반 시스템의 역할 분담 및 구성 비교 |
| [04](./04_satellite_hacking_scenarios.md) | 위성 해킹 전개 방식 | 해킹 시나리오 단계별 정리, 공격 벡터, 실제 사례 소개 |
| [05](./05_defense_strategies.md) | 위성 보안 대응 전략 | 위협 방어를 위한 실무적 방안과 보안 아키텍처 제안 |

---

## 🔖 작성자 노트

- 보안 관점에서 위성 및 지상국 인프라를 바라보고자 하는 분들에게 실질적인 도움이 되도록 구성하였습니다.
- 자료는 공개 문헌, 공식 문서, 실제 해킹 대회(Hack-A-Sat) 및 위성 보안 사례를 기반으로 작성되었습니다.

---

## 📬 문의 및 기여

> 이 프로젝트는 위성 보안에 관심 있는 연구자, 보안 전문가, 시스템 설계자를 위해 공개되어 있으며, 자유롭게 issue 또는 pull request로 기여하실 수 있습니다.
