import { NavLink } from "react-router-dom"
import { useState } from "react"
import { PanelLeft } from "lucide-react"
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri"
import LogoUnicagen from "../../../assets/logos/escudos/escudo_cagen.png"
import styles from "./Sidebar.module.css"
import { opcoes } from "../../../mocks/sidebar/MockSidebar"

export default function Sidebar() {
    const [expandida, setExpandida] = useState(true)
    const [menuMobileAberto, setMenuMobileAberto] = useState(false)

    function fecharMenuMobile() {
        setMenuMobileAberto(false)
    }

    return (
        <>
            <button
                className={styles.botaoMenuMobile}
                onClick={() => setMenuMobileAberto(true)}
                aria-label="Abrir menu"
            >
                <RiMenu2Fill size={40} />
            </button>

            <div
                className={`${styles.sidebar} ${expandida ? styles.expandida : styles.colapsada} ${menuMobileAberto ? styles.mobileAberto : ""}`}
            >
                <div className={styles.cabecalho}>
                    <div className={styles.blocoLogo}>
                        <img src={LogoUnicagen} alt="Logo Unicagen" className={styles.logo} />
                        {expandida && (
                            <div className={styles.textoMarca}>
                                <p className={styles.nomePlataforma}>UNICAGEN</p>
                                <p className={styles.nomeEmpresa}>Casagrande Engenharia</p>
                            </div>
                        )}
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
                        <RiCloseFill size={26} />
                    </button>
                </div>

                {expandida && <p className={styles.rotuloMenu}>Menu</p>}

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
                            {expandida && <span className={styles.label}>{opcao.titulo}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    )
}