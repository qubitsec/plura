# PLURAバッジスクリプト設定ガイド

このリポジトリは、ウェブサイトに「PLURAで保護されています」というバッジを表示するためのスクリプトを提供します。以下のスクリプトを `</body>` タグの直前に追加してください。

---

## **使用方法**

### スクリプトの追加:
```html
<script src="https://purplecow.plura.io/web/badge/plura-badge.js"></script>
```

### バッジの位置:
- バッジは**左下**に固定表示されます。

---

## **対応言語**
- ブラウザの言語設定（`navigator.language`）を検出し、**日本語**(ja)、**英語**(en)、**韓国語**(ko)に自動で表示されます。
- クッキー（`COOKIELANG`）を設定することで手動で言語を変更することも可能です。

---

## **CSSカスタマイズ**
バッジのサイズや位置を変更するには、以下のCSSを追加してください:
```css
img[src*="protected_by_plura"] {
    width: 150px; /* サイズ調整 */
    bottom: 10px; /* 下部余白 */
    right: 10px; /* 右余白 */
}
```

---

## **PLURAコミュニティバッジ参加サイト**
- [PLURA-Blog](https://newblog.plura.io)
- [ChecURL](https://checurl.site)

---

## **お問い合わせ**
詳細については、[PLURA公式ウェブサイト](https://www.plura.io)をご覧いただくか、サポートチームまでお問い合わせください。

---
