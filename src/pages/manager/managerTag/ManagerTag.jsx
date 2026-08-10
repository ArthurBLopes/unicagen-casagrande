import styles from "./ManagerTag.module.css"

export default function ManagerTag() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Tags</h1>
                <p>Insira, edite ou remova informações das Tags, essa é a página de gerenciamento das tags usadas para classificar os treinamentos.</p>
            </main>
        </div>
    )
}