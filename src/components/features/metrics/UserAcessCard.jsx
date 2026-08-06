import styles from "./UserAcessCard.module.css"

export default function UserAcessCard({ registro }) {

    const semAcessoRecente = !registro.ultimo_acesso
    const ultimoAcessoFormatado = semAcessoRecente
        ? "Não encontrado"
        : registro.ultimo_acesso.slice(0, 10).split("-").reverse().join("/")

    return (
        <div className={styles.linha}>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Nome</span>
                <span className={styles.nome}>{registro.nome}</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Email</span>
                <span className={styles.email}>{registro.email}</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Cargo</span>
                <span className={styles.regra}>{registro.regra}</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Acessos (15 dias)</span>
                <span className={styles.totalAcessos}>{registro.total_acessos}</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Frequência (%)</span>
                <span className={styles.frequencia}>{registro.frequencia_pct}%</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Último acesso</span>
                <span className={semAcessoRecente ? styles.ultimoAcessoVazio : styles.ultimoAcesso}>
                    {ultimoAcessoFormatado}
                </span>
            </div>
        </div>
    )
}