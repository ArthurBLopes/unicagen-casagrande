import { NavLink } from "react-router-dom";
import { useState } from "react";
import { PanelLeft } from "lucide-react";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import styles from "./Sidebar.module.css";
import { opcoes } from "../../../mocks/sidebar/mockSidebar";
import { useThemeLogos } from "../../../hooks/theme/useTheme";
import { logos } from "../../../mocks/logos/mockLogos.js";
//import { useMobileMenu } from "../../../hooks/mobileMenu/useMobileMenu.js";

export default function Sidebar() {
    const [expandida, setExpandida] = useState(true)
    const [menuMobileAberto, setMenuMobileAberto] = useState(false)
    const { logoSidebarExpandida, logoSidebarColapsada } = useThemeLogos()
    const anoAtual = new Date().getFullYear()

    function fecharMenuMobile() {
        setMenuMobileAberto(false)
    }

    return (
        <>
            <button
                className={styles.botaoMenuMobile}
                onClick={() => setMenuMobileAberto(true)}
            >
                <RiMenu2Fill size={38} />
            </button>

            <div
                className={`${styles.reservaDesktop} ${expandida ? styles.expandida : styles.colapsada}`}
                aria-hidden="true"
            />

            <div
                className={`${styles.sidebar} ${expandida || menuMobileAberto ? styles.expandida : styles.colapsada} ${menuMobileAberto ? styles.mobileAberto : ""}`}
            >
                <div className={styles.cabecalho}>
                    <div className={styles.blocoLogo}>
                        { expandida ? <img src={logoSidebarExpandida} alt="Logo Unicagen" className={styles.logo} /> : <img src={logoSidebarColapsada} alt="Logo Unicagen" className={styles.logoColapsada} />}
                        <img src={logos.animados[0].src} alt="Logo Unicagen" className={styles.logoMobile} />
                    </div>

                    <button
                        className={styles.botaoToggle}
                        onClick={() => setExpandida((s) => !s)}
                        aria-expanded={expandida}
                        aria-label={expandida ? "Fechar sidebar" : "Abrir sidebar"}
                    >
                        <PanelLeft size={20} />
                    </button>

                    <button
                        className={styles.botaoFecharMobile}
                        onClick={fecharMenuMobile}
                        aria-label="Fechar menu"
                    >
                        <RiCloseFill color="#ffffff" size={26} />
                    </button>
                </div>

                {(expandida || menuMobileAberto) && <p className={styles.rotuloMenu}>Menu</p>}

                <nav className={styles.navegacao}>
                    {opcoes.map((opcao) => (
                        <NavLink
                            key={opcao.titulo}
                            to={opcao.caminho}
                            onClick={fecharMenuMobile}
                            className={({ isActive }) => isActive ? styles.itemAtivo : styles.item}
                            title={!expandida ? opcao.titulo : undefined}
                        >
                            <span className={styles.icon}>{opcao.icon}</span>
                            {(expandida || menuMobileAberto) && <span className={styles.label}>{opcao.titulo}</span>}
                        </NavLink>
                    ))}
                </nav>
                {(expandida || menuMobileAberto) && <p className={styles.rodape}>© {anoAtual} Casagrande Engenharia</p>}
            </div>
        </>
    )
}