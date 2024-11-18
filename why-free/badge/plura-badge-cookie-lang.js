(function() {
    // Helper function to get the value of a specific cookie
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

    // Supported languages and default setting
    const supportedLanguages = { ko: "ko", en: "en", ja: "ja" };
    const defaultLanguage = "ko";

    // Use COOKIELANG cookie if available; fallback to browser language
    const cookieLang = getCookie("COOKIELANG");
    const browserLanguage = (navigator.language || navigator.userLanguage || defaultLanguage).substring(0, 2);
    const locale = supportedLanguages[cookieLang] || supportedLanguages[browserLanguage] || defaultLanguage;

    // Create the badge image
    const img = document.createElement("img");
    img.src = `https://purplecow.plura.io/web/badge/protected_by_plura-${locale}.png?siteId=${siteId}`;
    img.alt = `Protected by PLURA (${locale})`;
    img.style.height = "auto";
    img.style.cursor = "pointer";

    // Append the image to the link and add it to the page
    link.appendChild(img);
    document.body.appendChild(link);
})();
