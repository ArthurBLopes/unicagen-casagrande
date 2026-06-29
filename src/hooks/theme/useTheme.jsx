import { useEffect, useState } from "react";
import { logos } from "../../mocks/logos/mockLogos.js";

export function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const novoTema = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novoTema);
  localStorage.setItem("theme", novoTema);
}

export function useThemeLogos() {
  const [logoAtual, setlogoAtual] = useState(logos.horizontal[0].src);
  const [logoSidebarExpandida, setLogoSidebarExpandida] = useState(logos.horizontal[0].src);
  const [logoSidebarColapsada, setLogoSidebarColapsada] = useState(logos.escudos[0].src);
  
  useEffect(() => {
    const updateLogos = () => {
      const savedTheme = localStorage.getItem("theme") || "light";

      if (!document.documentElement.getAttribute("data-theme")) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      setlogoAtual(isDark ? logos.horizontal[1].src : logos.horizontal[0].src);
      setLogoSidebarExpandida(isDark ? logos.horizontal[1].src : logos.horizontal[0].src);
      setLogoSidebarColapsada(isDark ? logos.escudos[1].src : logos.escudos[0].src);
    };

    updateLogos();

    const observer = new MutationObserver(updateLogos);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return {
    logoAtual,
    logoSidebarExpandida,
    logoSidebarColapsada,
  };
}

export function useThemeLogosFooter() {
  const [logoAtual, setlogoAtual] = useState(logos.horizontal[0].src);
  const [linkedinColor, setLinkedinColor] = useState("black");

  useEffect(() => {
    const updateAssets = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      setlogoAtual(isDark ? logos.horizontal[1].src : logos.horizontal[0].src);
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
    logoAtual,
    linkedinColor,
  };
}