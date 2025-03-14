## ゼロデイ(Zero-Day)攻撃の検出と対応 – 事例とシナリオ

### 🔍 ゼロデイ攻撃とは？  
**ゼロデイ攻撃**(Zero-Day Attack)とは、セキュリティ脆弱性が発見されたものの、まだ正式なパッチや対応策が提供されていない状態で攻撃者がこれを悪用するサイバー攻撃です。  

従来のセキュリティシステム(SIEM、WAF、NDRなど)は **既知の攻撃パターン**(シグネチャ、ルールベースの検出)に依存しているため、ゼロデイ攻撃の検出が困難です。  

PLURAの **Webリクエスト本文ログ分析 + EDR** を活用することで、ゼロデイ攻撃をより効果的に検出し、対応することが可能です。  

---

1. [事例 1: Log4j(Log4Shell) 脆弱性攻撃の検出](scenario-log4j.md)

2. [事例 2: API脆弱性の悪用 (Zero-Day API Attack)](scenario-api-attack.md)

3. [事例 3: クレデンシャルスタッフィング(Credential Stuffing) 攻撃の検出](scenario-credential-stuffing.md)
