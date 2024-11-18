# PLURA 배지 스크립트 모음

이 리포지토리는 웹사이트에 "PLURA로 보호됨" 배지를 표시하기 위한 3가지 스크립트를 제공합니다. 각 스크립트는 특정 요구사항에 맞게 설계되었으며, 간단한 통합으로 웹사이트에서 사용할 수 있습니다.

---

## 1. **plura-badge-basic.js**
언어 설정 없이 기본 배지를 표시하는 가장 간단한 스크립트입니다.

### **특징**
- 항상 영어 배지(`protected_by_plura-en.png`)를 표시합니다.
- 모든 웹사이트에서 동일한 배지를 표시합니다.
- 빠르고 간단한 통합이 가능합니다.

### **사용법**
웹사이트에 다음 코드를 추가하세요:
```html
<script src="https://your-cdn-link/plura-badge-basic.js"></script>
```

---

## 2. **plura-badge-browser-lang.js**
브라우저의 언어 설정(`navigator.language`)을 기반으로 배지를 표시하는 스크립트입니다.

### **특징**
- 브라우저 언어 설정을 감지하여 배지 언어를 동적으로 선택합니다.
- 지원하지 않는 언어일 경우 기본 언어(`en`)를 사용합니다.
- 별도의 쿠키 설정 없이 브라우저 언어를 그대로 활용합니다.

### **사용법**
웹사이트에 다음 코드를 추가하세요:
```html
<script src="https://your-cdn-link/plura-badge-browser-lang.js"></script>
```

---

## 3. **plura-badge-cookie-lang.js**
쿠키 값을 기반으로 언어를 선택하여 배지를 표시하는 스크립트입니다.

### **특징**
- `COOKIELANG` 쿠키 값을 읽어 언어를 결정합니다.
- 지원하지 않는 쿠키 값인 경우 기본 언어(`en`)를 사용합니다.
- 유연한 언어 설정이 가능합니다.

### **사용법**
웹사이트에 다음 코드를 추가하세요:
```html
<script src="https://your-cdn-link/plura-badge-cookie-lang.js"></script>
```

쿠키 설정 예:
```javascript
document.cookie = "COOKIELANG=ko; path=/";
```

---

## **배지 위치 및 스타일**
모든 스크립트는 배지를 웹사이트 오른쪽 하단에 고정 표시합니다.  
배지 스타일을 사용자 정의하려면 CSS를 추가하세요:
```css
img[src*="protected_by_plura"] {
    width: 150px; /* Adjust badge size */
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
}
```

---

## **지원 언어**
| 언어 코드 | 지원 여부 |
|-----------|-----------|
| `ko`      | 한국어    |
| `en`      | 영어      |
| `ja`      | 일본어    |

---

## **문의**
이 스크립트와 관련하여 문의사항이 있으면 PLURA 공식 웹사이트(https://www.plura.io)를 방문하거나 지원팀에 연락하세요.
