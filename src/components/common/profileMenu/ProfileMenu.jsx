import styles from "./ProfileMenu.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { profileMenuMock } from "../../../mocks/profileMenuMock/profileMenuMock";

export default function ProfileMenu() {
    const [aberto, setAberto] = useState(false);
    const navigate = useNavigate();
    const { user, sair } = useAuth();
    const nome = user?.user_metadata?.full_name || "Não identificado";
    const email = user?.email || "Email não encontrado";
    const inicial = nome.split(" ")[0]?.charAt(0).toUpperCase() || "N";

    function executarAcao(action) {
        setAberto(false);

        if (action === "perfil") {
            navigate("/perfil");
        }

        if (action === "sair") {
            sair();
        }
    }

    return (
        <div className={styles.profileMenu}>
            <button type="button" className={styles.botaoAvatar} onClick={() => setAberto(!aberto)}>
                {inicial}
            </button>

            {aberto && (
                <div className={styles.menu}>
                    <div className={styles.cabecalhoMenu}>
                        <p className={styles.nomeUsuario}>{nome}</p>
                        <p className={styles.emailUsuario}>{email}</p>
                    </div>

                    <ul className={styles.listaOpcoes}>
                        {profileMenuMock.map((item, index) => (
                            <li key={index}>
                                <button type="button" className={item.action === "sair" ? styles.opcaoSair : styles.opcao}
                                    onClick={() => executarAcao(item.action)}
                                >{item.titulo}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}