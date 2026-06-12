# BPFDoor Auditd Detection Comprehensive Guide

This document provides a comprehensive guide on how to effectively detect the infiltration and execution of the BPFDoor backdoor using the Linux auditd system.

---

## 1. Install Auditd

Install auditd and enable the service if necessary.

```bash
# CentOS/RHEL/Rocky Linux
sudo yum install audit -y
sudo systemctl enable auditd --now

# Ubuntu/Debian
sudo apt install auditd -y
sudo systemctl enable auditd --now
```

---

## 2. Configure Audit Rules

Use the following audit rules to detect BPFDoor execution and suspicious behavior.

### (1) Detect Suspicious Execution in Temporary Directories

```bash
sudo auditctl -a always,exit -F dir=/dev/shm -F perm=x -k bpfdoor_detect
sudo auditctl -a always,exit -F dir=/tmp -F perm=x -k bpfdoor_detect
sudo auditctl -a always,exit -F dir=/run -F perm=x -k bpfdoor_detect
```
### (2) Detect eBPF Filter Installation Syscall

```bash
sudo auditctl -a always,exit -F arch=b64 -S bpf -k bpfdoor_ebpf
sudo auditctl -a always,exit -F arch=b32 -S bpf -k bpfdoor_ebpf
```

### (3) Detect AF_PACKET (Raw Socket) Creation

```bash
sudo auditctl -a always,exit -F arch=b64 -S socket -F a0=17 -k bpfdoor_raw_socket
sudo auditctl -a always,exit -F arch=b32 -S socketcall -k bpfdoor_raw_socket
```

### (4) Detect iptables Rule Modification Activity

```bash
sudo auditctl -w /sbin/iptables -p x -k bpfdoor_iptables
sudo auditctl -w /usr/sbin/iptables -p x -k bpfdoor_iptables
sudo auditctl -w /etc/sysconfig/iptables -p wa -k bpfdoor_iptables
sudo auditctl -w /etc/iptables -p wa -k bpfdoor_iptables
```

### (5) Detect Privilege Escalation Activities like setcap, setuid

```bash
sudo auditctl -a always,exit -F arch=b64 -S setxattr,fsetxattr,lsetxattr -k bpfdoor_capabilities
sudo auditctl -a always,exit -F arch=b32 -S setxattr,fsetxattr,lsetxattr -k bpfdoor_capabilities
sudo auditctl -a always,exit -F arch=b64 -S chmod,fchmod,fchmodat -F perm=6000 -k bpfdoor_setuid
```

### (6) Detect Process Injection (ptrace syscall)

```bash
sudo auditctl -a always,exit -F arch=b64 -S ptrace -k bpfdoor_ptrace
sudo auditctl -a always,exit -F arch=b32 -S ptrace -k bpfdoor_ptrace
```

---

## 3. Apply and Verify Configuration

Verify that the audit rules have been applied correctly.

```bash
sudo auditctl -l
```

To apply the rules permanently, add all the above rules to the `/etc/audit/rules.d/bpfdoor.rules` file and run the following command.

```bash
sudo augenrules --load
sudo systemctl restart auditd
```

---

## 4. How to Check Audit Logs

Detected events can be immediately checked using the command below.

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

## 5. Response Measures After Detection

If a detection log is found, immediate response actions are recommended.

* Isolate the system immediately and conduct forensic analysis
* Remove related malicious files and processes
* Analyze the cause of the breach and patch security vulnerabilities
