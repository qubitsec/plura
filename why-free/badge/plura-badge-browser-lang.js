(function() {
    // Supported languages and default setting
    const supportedLanguages = { ko: "ko", en: "en", ja: "ja" };
    const defaultLanguage = "en";

    // Detect the browser's language
    const browserLanguage = (navigator.language || navigator.userLanguage || defaultLanguage).substring(0, 2);
    const locale = supportedLanguages[browserLanguage] || defaultLanguage;

    // Create the badge container
    const link = document.createElement("a");
    link.href = "https://www.plura.io";
    link.target = "_blank";
    link.style.position = "fixed";
    link.style.bottom = "12px";
    link.style.right = "12px";
    link.style.zIndex = "1000";

    // Create the badge image
    const img = document.createElement("img");
    img.src = `https://purplecow.plura.io/web/badge/protected_by_plura-${locale}.png`;
    img.alt = `Protected by PLURA (${locale})`;
    img.style.height = "auto";
    img.style.cursor = "pointer";

    // Append the image to the link and add it to the page
    link.appendChild(img);
    document.body.appendChild(link);
})();
