import styles from "./RowCard.module.css";

export default function RowCard({ colunas, acoes }) {
    return (
        <div className={styles.linha}>
            {colunas.map((coluna, i) => (
                <div className={styles.campo} key={i}>
                    <span className={coluna.className ?? styles.valor}>{coluna.valor}</span>
                </div>
            ))}

            {acoes && (
                <div className={styles.acoes}>
                    {acoes.onEditar && <button className={styles.btn} onClick={acoes.onEditar}>Editar</button>}
                    {acoes.onRemover && <button className={styles.btn} onClick={acoes.onRemover}>Remover</button>}
                </div>
            )}
        </div>
    );
}
