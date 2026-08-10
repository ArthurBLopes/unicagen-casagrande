import { useState } from "react";
import styles from "./managerCourse.module.css"

export default function ManagerCourse() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Treinamentos</h1>
                <p>Insira, edite ou remova informações dos cursos, essa é a página de gerenciamento dos treinamentos disponíveis na Universidade Casagrande.</p>
            </main>
        </div>
    )
}