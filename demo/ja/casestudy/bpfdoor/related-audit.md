# BPFDoor Auditd検出総合ガイド

本ドキュメントでは、BPFDoorバックドアの侵入および実行をLinuxのauditdシステムを通じて効果的に検出する方法を総合的に案内します。

---

## 1. Auditdのインストール

必要に応じてauditdをインストールし、サービスを有効化します。

```bash
# CentOS/RHEL/Rocky Linux
sudo yum install audit -y
sudo systemctl enable auditd --now

# Ubuntu/Debian
sudo apt install auditd -y
sudo systemctl enable auditd --now
```

---

## 2. Auditルールの設定

以下のauditルールにより、BPFDoorの実行および特異な挙動を検出します。

### (1) 疑わしい一時ディレクトリでの実行検出

```bash
sudo auditctl -a always,exit -F dir=/dev/shm -F perm=x -k bpfdoor_detect
sudo auditctl -a always,exit -F dir=/tmp -F perm=x -k bpfdoor_detect
sudo auditctl -a always,exit -F dir=/run -F perm=x -k bpfdoor_detect
```

### (2) eBPFフィルターインストールのsyscall検出

```bash
sudo auditctl -a always,exit -F arch=b64 -S bpf -k bpfdoor_ebpf
sudo auditctl -a always,exit -F arch=b32 -S bpf -k bpfdoor_ebpf
```

### (3) AF_PACKET（Rawソケット）生成の検出

```bash
sudo auditctl -a always,exit -F arch=b64 -S socket -F a0=17 -k bpfdoor_raw_socket
sudo auditctl -a always,exit -F arch=b32 -S socketcall -k bpfdoor_raw_socket
```

### (4) iptablesルール変更の挙動検出

```bash
sudo auditctl -w /sbin/iptables -p x -k bpfdoor_iptables
sudo auditctl -w /usr/sbin/iptables -p x -k bpfdoor_iptables
sudo auditctl -w /etc/sysconfig/iptables -p wa -k bpfdoor_iptables
sudo auditctl -w /etc/iptables -p wa -k bpfdoor_iptables
```

### (5) setcap、setuidなどの権限昇格の挙動検出

```bash
sudo auditctl -a always,exit -F arch=b64 -S setxattr,fsetxattr,lsetxattr -k bpfdoor_capabilities
sudo auditctl -a always,exit -F arch=b32 -S setxattr,fsetxattr,lsetxattr -k bpfdoor_capabilities
sudo auditctl -a always,exit -F arch=b64 -S chmod,fchmod,fchmodat -F perm=6000 -k bpfdoor_setuid
```

### (6) プロセスインジェクション（ptrace syscall）の検出

```bash
sudo auditctl -a always,exit -F arch=b64 -S ptrace -k bpfdoor_ptrace
sudo auditctl -a always,exit -F arch=b32 -S ptrace -k bpfdoor_ptrace
```

---

## 3. 設定の適用および確認

Auditルールが正常に適用されたかを確認します。

```bash
sudo auditctl -l
```

ルールを永続的に適用するには、`/etc/audit/rules.d/bpfdoor.rules` ファイルに上記のルールをすべて追加した後、次のコマンドを実行します。

```bash
sudo augenrules --load
sudo systemctl restart auditd
```

---

## 4. Auditログの確認方法

検出されたイベントは、以下のコマンドで即時に確認可能です。

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

## 5. 検出後の対応策

検出されたログが発見された場合は、即時の対応を推奨します。

* システムの即時隔離およびフォレンジック分析  
* 関連する悪意あるファイルやプロセスの削除  
* 侵害原因の分析およびセキュリティ脆弱性のパッチ適用


