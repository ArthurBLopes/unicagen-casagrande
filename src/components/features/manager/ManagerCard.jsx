import styles from "./ManagerCard.module.css"

export default function ManagerCard(dado, funcaoEditar, funcaoRemover) {
    return (
        //nao pronto ainda, tava pensando em como vou fazer
        <div className={styles.linha}>
            <div className={styles.campo}>
                <span className={styles.nome}>{dado.titulo}</span>
            </div>
            <div>
                <button className={styles.btn} onClick={funcaoEditar}>Editar</button>
                <button className={styles.btn} onClick={funcaoRemover}>Remover</button>
            </div>
        </div>
    )
}