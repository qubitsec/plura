(function() {
        let siteId = new URLSearchParams(window.location.search).get("site_id");
        let link = document.createElement("a");
        link.href = "https://www.plura.io";
        link.target = "_blank";
        link.style.position = "fixed";
        link.style.bottom = "12px";
        link.style.left = "12px";
        link.style.zIndex = "1000";

        const language = ["ko", "en", "ja"];
        let locale = (navigator.language || navigator.userLanguage || "ko").substring(0, 2);
        locale = language.includes(locale) ? locale : "ko";

        let img = document.createElement("img");
        img.src = "https://purplecow.plura.io/web/badge/protected_by_plura-" + locale + ".png?siteId=" + siteId;
        img.style.height = "auto";

        link.appendChild(img);
        document.body.appendChild(link);
      })();
