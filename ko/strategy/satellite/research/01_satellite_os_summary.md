위성 시스템에 탑재되는 운영체제(OS)는 위성의 **임무 특성**, **하드웨어 제약**, **신뢰성 요구사항**에 따라 다양하게 선택됩니다. 일반적으로 사용하는 리눅스 계열 운영체제는 다음과 같습니다:

---

## 🛰️ 위성 시스템에서 사용되는 주요 운영체제

### 1. **Real-Time Linux (RT-Linux, PREEMPT\_RT 등)**

* 고정밀 타이밍이 필요한 \*\*제어 계층(C\&DH: Command and Data Handling)\*\*에서 사용
* Ubuntu, Debian, Red Hat, CentOS 등의 실시간 커널 적용 버전
* 예: NASA JPL의 F' 프레임워크는 Ubuntu 기반에서 개발되지만, 실 위성에선 RTOS 또는 RT-Linux로 포팅됨

### 2. **Red Hat / CentOS / Rocky Linux**

* **지상국 제어 서버** 또는 **중형 위성의 데이터 처리 탑재체**에서 사용
* 안정성과 보안 지원 때문에 많이 선택됨
* ESA(유럽우주국) 및 NASA 프로젝트 중 일부에서 채택

### 3. **Ubuntu**

* **실제 위성보다는 개발/시뮬레이션 환경**에서 자주 사용
* 위성 탑재보다는 테스트벤치나 GSE(Ground Support Equipment) 용도로 사용됨

---

## 📦 그 외 위성 전용/경량 운영체제

| 운영체제                                                       | 특징                                                |
| ---------------------------------------------------------- | ------------------------------------------------- |
| **RTEMS** (Real-Time Executive for Multiprocessor Systems) | NASA, ESA 위성에서 가장 널리 사용됨. POSIX 호환. C 기반 실시간 OS   |
| **VxWorks**                                                | 고가 상용 RTOS. **인공위성, 우주선, 드론 등에서 자주 사용**           |
| **FreeRTOS**                                               | CubeSat, PicoSat 등 저비용 위성에서 사용되는 오픈소스 RTOS        |
| **Linux Yocto Project**                                    | ARM 기반 임베디드 리눅스 커스터마이징용, 위성 시스템에서 경량화된 리눅스로 사용 가능 |

---

## ✅ 결론

* **실제 위성 탑재체(CPU/FPGA 등)는 대부분 일반적인 Ubuntu, RedHat이 아닌 실시간 RTOS** 또는 RT-Linux 커스터마이즈 버전을 사용합니다.
* **Red Hat, Ubuntu**는 개발/시뮬레이션/GSE에서 많이 활용되며, **정식 탑재 OS는 RTEMS, VxWorks, FreeRTOS** 등입니다.
* 최근에는 SpaceX 등에서 \*\*커스터마이즈된 Linux (ex: CentOS base)\*\*를 실제 위성에도 활용하고 있다는 보고도 있습니다.
