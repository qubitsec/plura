# PLURA Badge Script Setup Guide

This repository provides a script to display the "Protected by PLURA" badge on your website. Add the following script just before the `</body>` tag.

---

## **How to Use**

### Add the Script:
```html
<script src="https://welcome.plura.io/badge/plura-badge.js"></script>
```

### Badge Position:
- The badge is fixed at the **bottom left** of the page.

---

## **Supported Languages**
- The browser language (`navigator.language`) is detected to automatically display the badge in **Korean** (ko), **English** (en), or **Japanese** (ja).
- You can manually change the language by setting the cookie (`COOKIELANG`).

---

## **Customizing CSS**
To change the badge size and position, add the following CSS:
```css
img[src*="protected_by_plura"] {
    width: 150px; /* Adjust size */
    bottom: 10px; /* Bottom margin */
    right: 10px; /* Right margin */
}
```

---

## **PLURA Community Badge Sites**
- [Company Website](https://w.qubitsec.com/en)
- [PLURA-Blog](https://newblog.plura.io)
- [ChecURL](https://checurl.site)

---

## **Contact**
For more information, visit the [PLURA official website](https://www.plura.io) or contact the support team.

---
