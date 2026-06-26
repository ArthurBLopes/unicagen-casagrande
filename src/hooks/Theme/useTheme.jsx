import { useEffect, useState } from "react";
import LogoBranco from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Branco.png";
import LogoPreto from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Grafite.png";

export function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const novoTema = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novoTema);
  localStorage.setItem("theme", novoTema);
}

export function useThemeLogos({ logoTemaEscuro = LogoBranco, logoTemaClaro = LogoPreto, } = {}) {
  const [currentLogo, setCurrentLogo] = useState(logoTemaClaro);

  useEffect(() => {
    const updateLogos = () => {
      const savedTheme = localStorage.getItem("theme") || "light";

      if (!document.documentElement.getAttribute("data-theme")) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      setCurrentLogo(isDark ? logoTemaEscuro : logoTemaClaro);
    };

    updateLogos();

    const observer = new MutationObserver(updateLogos);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [logoTemaEscuro, logoTemaClaro]);

  return {
    currentLogo,
  };
}

export function useThemeLogosFooter() {
  const [currentLogo, setCurrentLogo] = useState(LogoPreto);
  const [linkedinColor, setLinkedinColor] = useState("black");

  useEffect(() => {
    const updateAssets = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      setCurrentLogo(isDark ? LogoBranco : LogoPreto);
      setLinkedinColor(isDark ? "white" : "black");
    };

    updateAssets();

    const observer = new MutationObserver(updateAssets);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return {
    currentLogo,
    linkedinColor,
  };
}