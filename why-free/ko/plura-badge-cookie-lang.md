(function() {
    // 쿠키 읽기 헬퍼 함수
    function getCookie(name) {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    const siteId = new URLSearchParams(window.location.search).get("site_id") || "defaultSiteId";
    const link = document.createElement("a");
    link.href = "https://www.plura.io";
    link.target = "_blank";
    link.style.position = "fixed";
    link.style.bottom = "12px";
    link.style.left = "12px";
    link.style.zIndex = "1000";

    // 지원 언어 및 기본값 설정
    const supportedLanguages = { ko: "ko", en: "en", ja: "ja" };
    const defaultLanguage = "ko";

    // COOKIELANG 값을 우선으로 사용, 없으면 브라우저 언어를 사용
    const cookieLang = getCookie("COOKIELANG");
    const browserLanguage = (navigator.language || navigator.userLanguage || defaultLanguage).substring(0, 2);
    const locale = supportedLanguages[cookieLang] || supportedLanguages[browserLanguage] || defaultLanguage;

    // 배지 이미지 생성
    const img = document.createElement("img");
    img.src = `https://purplecow.plura.io/web/badge/protected_by_plura-${locale}.png?siteId=${siteId}`;
    img.alt = `Protected by PLURA (${locale})`;
    img.style.height = "auto";
    img.style.cursor = "pointer";

    // 링크에 이미지 추가
    link.appendChild(img);
    document.body.appendChild(link);
})();
