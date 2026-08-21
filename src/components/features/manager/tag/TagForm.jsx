import styles from "./TagForm.module.css"

export default function TagForm({ tag, editando, funcaoSubmite, enviando }) {
    return (
        <>
            <form className={styles.formInsercao} onSubmit={funcaoSubmite}>
                <div className={styles.linha}>
                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="titulo">Título</label>
                        <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            placeholder="Ex: Gestão de Processos"
                            defaultValue={tag?.titulo}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className={styles.botaoInserir} disabled={enviando}>
                    <span className={styles.texto}>{enviando ? "Salvando..." : editando ? "Salvar alterações" : "Criar tag"}</span>
                    <span className={styles.seta} aria-hidden="true">&rarr;</span>
                </button>
            </form>
        </>
    )
}