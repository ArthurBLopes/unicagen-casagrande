import { useState } from "react";
import styles from "./ManagerTrail.module.css"

export default function ManagerTrail() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Trilhas</h1>
                <p>Insira, edite ou remova informações das trilhas, essa é a página de gerenciamento das trilhas disponíveis na Universidade Casagrande.</p>
            </main>
        </div>
    )
}