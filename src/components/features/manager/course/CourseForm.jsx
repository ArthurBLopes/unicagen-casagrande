import ChipSelectField from "../../../common/chipSelectField/ChipSelectField";
import { useSelectionMulti } from "../../../../hooks/selection/useSelectionMulti";
import ImageField from "../../../common/imageField/ImageField";
import styles from "./CourseForm.module.css";
import { listarTrilhasDoTreinamento } from "../../../../services/treinamentosTrilhasService";
import { listarTagsTreinamento } from "../../../../services/tagsService";
import { useState } from "react";
import { useTrilhasDoTreinamento } from "../../../../hooks/trailsCourses/useTrilhasDoTreinamento";
import { useTagsDoTreinamento } from "../../../../hooks/tags/useTagsDoTreinamento";

export default function CourseForm({ funcaoSubmite, trilhas, tags, setImagemArquivo, editando = false, enviando, treinamento }) {

    const { trilhasDoCurso } = treinamento ? useTrilhasDoTreinamento(treinamento.id) : []
    const { tagsDoCurso } = treinamento ? useTagsDoTreinamento(treinamento.id) : []

    const selecaoTrilhas = useSelectionMulti(trilhasDoCurso);
    const selecaoTags = useSelectionMulti(tagsDoCurso);

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
                            placeholder="Ex: Introdução à Universidade Casagrande"
                            defaultValue={treinamento?.titulo}
                            required
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="descricao">Descrição</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            placeholder="Descreva do que se trata esse treinamento..."
                            defaultValue={treinamento?.descricao}
                            rows={3}
                            required
                        />
                    </div>
                </div>

                <div className={styles.linha}>
                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="url_conteudo">URL do conteúdo</label>
                        <input
                            type="text"
                            name="url_conteudo"
                            id="url_conteudo"
                            placeholder="https://..."
                            defaultValue={treinamento?.link_conteudo}
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="url_material">URL do material</label>
                        <input
                            type="text"
                            name="url_material"
                            id="url_material"
                            placeholder="https://..."
                            defaultValue={treinamento?.link_material}
                            required
                        />
                    </div>
                </div>

                <div className={styles.linha}>
                    <div className={styles.campo}>
                        <label className={styles.rotulo}>Imagem do curso</label>
                        <ImageField onArquivoSelecionado={setImagemArquivo} imagemInicial={treinamento?.imagem} />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="trilhas">Trilhas</label>
                        <ChipSelectField
                            opcoes={trilhas}
                            selecionados={selecaoTrilhas.selecionados}
                            onSelect={selecaoTrilhas.selecionar}
                            onRemove={selecaoTrilhas.remover}
                        />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.rotulo} htmlFor="tags">Tags</label>
                        <ChipSelectField
                            opcoes={tags}
                            selecionados={selecaoTags.selecionados}
                            onSelect={selecaoTags.selecionar}
                            onRemove={selecaoTags.remover}
                        />
                    </div>
                </div>

                <button type="submit" className={styles.botaoInserir} disabled={enviando}>
                    {enviando ? "Salvando..." : editando ? "Salvar alterações" : "Inserir treinamento"}
                </button>
            </form>
        </>
    )
}