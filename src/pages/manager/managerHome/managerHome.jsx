import styles from "./managerHome.module.css"

export default function ManagerHome() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciamento</h1>
                <p>Insira, edite ou remova informações da plataforma, essa é a página de gerenciamento da Universidade Casagrande.</p>
            </main>
        </div>
    )
}