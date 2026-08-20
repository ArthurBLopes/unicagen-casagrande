import styles from "./CourseForm.module.css";
import { useState, useEffect } from "react";

export default function TrailForm({ trilha, funcaoSubmite }) {

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
                            placeholder="Ex: Evolução Profissional"
                            defaultValue={trilha?.titulo}
                            required
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="descricao">Descrição</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            placeholder="Descreva do que se trata esse trilha..."
                            defaultValue={trilha?.descricao}
                            rows={4}
                            required
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.cor} htmlFor="cor">Cor</label>
                        <input
                            type="text"
                            name="cor"
                            id="cor"
                            placeholder="https://..."
                            defaultValue={trilha?.cor}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className={styles.botaoInserir} disabled={enviando}>
                    <span className={styles.texto}>{enviando ? "Salvando..." : editando ? "Salvar alterações" : "Inserir trilha"}</span>
                    <span className={styles.seta} aria-hidden="true">&rarr;</span>
                </button>
            </form>
        </>
    )
}