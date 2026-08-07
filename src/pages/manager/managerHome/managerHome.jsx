import styles from "./managerHome.module.css"
import { opcoes } from "../../../mocks/manager/mockOptions"
import { NavLink } from "react-router-dom";

export default function ManagerHome() {

    console.log(opcoes)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciamento</h1>
                <p>Insira, edite ou remova informações da plataforma, essa é a página de gerenciamento da Universidade Casagrande.</p>
                <div className={styles.opcoesContainer}>
                    {opcoes.map((opcao) => (
                        <NavLink
                            key={opcao.titulo}
                            to={opcao.caminho}
                            className={styles.opcao}
                            title={opcao.titulo}
                        >
                            <span className={styles.icon}>{opcao.icon}</span>
                            <span className={styles.titulo}>{opcao.titulo}</span>
                        </NavLink>
                    ))}
                </div>
            </main>
        </div>
    )
}