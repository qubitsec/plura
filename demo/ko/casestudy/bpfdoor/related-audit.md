# BPFDoor Auditd 탐지 종합 가이드

본 문서는 BPFDoor 백도어의 침투 및 실행을 리눅스의 auditd 시스템을 통해 효과적으로 탐지하는 방법을 종합적으로 안내합니다.

---

## 1. Auditd 설치

필요 시 auditd를 설치하고 서비스를 활성화합니다.

```bash
# CentOS/RHEL/Rocky Linux
sudo yum install audit -y
sudo systemctl enable auditd --now

# Ubuntu/Debian
sudo apt install auditd -y
sudo systemctl enable auditd --now
```

---

## 2. Audit 룰 설정

다음의 audit 룰을 통해 BPFDoor의 실행과 특수한 행위를 탐지합니다.

### (1) 의심스러운 임시 디렉터리 실행 탐지

```bash
sudo auditctl -a always,exit -F dir=/dev/shm -F perm=x -k bpfdoor_detect
sudo auditctl -a always,exit -F dir=/tmp -F perm=x -k bpfdoor_detect
sudo auditctl -a always,exit -F dir=/run -F perm=x -k bpfdoor_detect
```

### (2) eBPF 필터 설치 syscall 탐지

```bash
sudo auditctl -a always,exit -F arch=b64 -S bpf -k bpfdoor_ebpf
sudo auditctl -a always,exit -F arch=b32 -S bpf -k bpfdoor_ebpf
```

### (3) AF\_PACKET (Raw 소켓) 생성 탐지

```bash
sudo auditctl -a always,exit -F arch=b64 -S socket -F a0=17 -k bpfdoor_raw_socket
sudo auditctl -a always,exit -F arch=b32 -S socketcall -k bpfdoor_raw_socket
```

### (4) iptables 규칙 변경 행위 탐지

```bash
sudo auditctl -w /sbin/iptables -p x -k bpfdoor_iptables
sudo auditctl -w /usr/sbin/iptables -p x -k bpfdoor_iptables
sudo auditctl -w /etc/sysconfig/iptables -p wa -k bpfdoor_iptables
sudo auditctl -w /etc/iptables -p wa -k bpfdoor_iptables
```

### (5) setcap, setuid 등 권한 상승 행위 탐지

```bash
sudo auditctl -a always,exit -F arch=b64 -S setxattr,fsetxattr,lsetxattr -k bpfdoor_capabilities
sudo auditctl -a always,exit -F arch=b32 -S setxattr,fsetxattr,lsetxattr -k bpfdoor_capabilities
sudo auditctl -a always,exit -F arch=b64 -S chmod,fchmod,fchmodat -F perm=6000 -k bpfdoor_setuid
```

### (6) 프로세스 주입 (ptrace syscall) 탐지

```bash
sudo auditctl -a always,exit -F arch=b64 -S ptrace -k bpfdoor_ptrace
sudo auditctl -a always,exit -F arch=b32 -S ptrace -k bpfdoor_ptrace
```

---

## 3. 설정 적용 및 확인

Audit 룰이 정상적으로 적용되었는지 확인합니다.

```bash
sudo auditctl -l
```

룰을 영구적으로 적용하려면 `/etc/audit/rules.d/bpfdoor.rules` 파일에 위 룰을 모두 추가한 후 다음 명령을 실행합니다.

```bash
sudo augenrules --load
sudo systemctl restart auditd
```

---

## 4. Audit 로그 확인 방법

탐지된 이벤트는 아래 명령으로 즉시 확인 가능합니다.

```bash
sudo ausearch -k bpfdoor_detect -i
sudo ausearch -k bpfdoor_ebpf -i
sudo ausearch -k bpfdoor_raw_socket -i
sudo ausearch -k bpfdoor_iptables -i
sudo ausearch -k bpfdoor_capabilities -i
sudo ausearch -k bpfdoor_setuid -i
sudo ausearch -k bpfdoor_ptrace -i
```

---

## 5. 탐지 후 대응 방안

탐지된 로그가 발견될 경우 즉각적인 대응 조치를 권장합니다.

* 시스템 즉시 격리 및 포렌식 분석
* 관련 악성 파일과 프로세스 제거
* 침해 원인 분석 및 보안 취약점 패치

---
