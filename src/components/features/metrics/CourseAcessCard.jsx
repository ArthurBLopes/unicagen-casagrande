import styles from "./CourseAcessCard.module.css"

export default function CourseAcessCard({ registro }) {

    const semAcessoRecente = !registro.ultimo_acesso
    const ultimoAcessoFormatado = semAcessoRecente
        ? "Não encontrado"
        : registro.ultimo_acesso.slice(0, 10).split("-").reverse().join("/")

    return (
        <div className={styles.linha}>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Curso</span>
                <span className={styles.nome}>{registro.titulo}</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Total de Acessos</span>
                <span className={styles.totalAcessos}>{registro.total_acessos}</span>
            </div>
            <div className={styles.campo}>
                <span className={styles.rotulo}>Usuários Únicos</span>
                <span className={styles.usuariosUnicos}>{registro.usuarios_unicos}</span>
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