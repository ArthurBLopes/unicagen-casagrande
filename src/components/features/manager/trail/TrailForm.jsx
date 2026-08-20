import styles from "./TrailForm.module.css";
import { useState, useEffect } from "react";

export default function TrailForm({ trilha, editando, funcaoSubmite, enviando }) {

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
                            rows={1}
                            placeholder="Descreva do que se trata esse trilha..."
                            defaultValue={trilha?.descricao}
                            required
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="cor">Cor</label>
                        <input
                            type="color"
                            className={styles.campoCor}
                            name="cor"
                            id="cor"
                            defaultValue={trilha?.cor || "#000000"}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className={styles.botaoInserir} disabled={enviando}>
                    <span className={styles.texto}>{enviando ? "Salvando..." : editando ? "Salvar alterações" : "Criar trilha"}</span>
                    <span className={styles.seta} aria-hidden="true">&rarr;</span>
                </button>
            </form>
        </>
    )
}