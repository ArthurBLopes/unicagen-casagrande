import { useEffect, useState } from "react";
import logoBranco from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Branco.png";
import logoPreto from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Grafite.png";
import escudoVerde from "../../assets/logos/escudos/escudo_cagen.png";
import escudoVerdeClaro from "../../assets/logos/escudos/escudo_verde_claro.png";

export function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const novoTema = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novoTema);
  localStorage.setItem("theme", novoTema);
}

export function useThemeLogos({ logoTemaEscuro = logoBranco, logoTemaClaro = logoPreto, } = {}) {
  const [logoAtual, setlogoAtual] = useState(logoTemaClaro);
  const [logoSidebar, setLogoSidebar] = useState(escudoVerde);
  

  useEffect(() => {
    const updateLogos = () => {
      const savedTheme = localStorage.getItem("theme") || "light";

      if (!document.documentElement.getAttribute("data-theme")) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      setlogoAtual(isDark ? logoTemaEscuro : logoTemaClaro);
      setLogoSidebar(isDark ? escudoVerdeClaro : escudoVerde);
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
    logoAtual,
    logoSidebar,
  };
}

export function useThemeLogosFooter() {
  const [logoAtual, setlogoAtual] = useState(logoPreto);
  const [linkedinColor, setLinkedinColor] = useState("black");

  useEffect(() => {
    const updateAssets = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      setlogoAtual(isDark ? logoBranco : logoPreto);
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