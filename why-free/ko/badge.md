# PLURA 배지 스크립트 설정 안내

이 리포지토리는 웹사이트에 `PLURA로 보호됨` 배지를 표시하기 위한 스크립트를 제공합니다. 아래의 스크립트를 `</body>` 태그 바로 위에 추가하면 됩니다.

---

## **사용 방법**

### 스크립트 추가:
```html
<script src="https://welcome.plura.io/badge/plura-badge.js"></script>
```

### 배지 위치:
- 배지는 **왼쪽 하단**에 고정으로 표시됩니다.

---

## **지원 언어**
- 브라우저 언어(`navigator.language`)를 감지하여 **한국어**(ko), **영어**(en), **일본어**(ja)로 자동 표시됩니다.
- 쿠키(`COOKIELANG`)를 설정하여 언어를 수동 변경할 수도 있습니다.

---

## **CSS 사용자 정의**
배지 크기와 위치를 변경하려면 CSS를 추가하세요:
```css
img[src*="protected_by_plura"] {
    width: 150px; /* 크기 조정 */
    bottom: 10px; /* 하단 여백 */
    right: 10px; /* 우측 여백 */
}
```

---

## **PLURA Community 배지 참여 사이트**
- [PLURA-Blog](https://newblog.plura.io)
- [ChecURL](https://checurl.site)

---

## **문의**
더 궁금한 점은 [PLURA 공식 웹사이트](https://www.plura.io)를 방문하거나 지원팀에 연락하세요.

---
