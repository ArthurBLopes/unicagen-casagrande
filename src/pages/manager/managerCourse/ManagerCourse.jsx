import { useEffect, useState } from "react";
import styles from "./ManagerCourse.module.css";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useTags } from "../../../hooks/tags/useTags";
import { useAuth } from "../../../providers/AuthContext";
import { inserirTreinamento } from "../../../services/treinamentosService";
import { Trash, Images, X } from "lucide-react"
import ChipSelectField from "../../../components/common/chipSelectField/ChipSelectField";
import { useSelectionMulti } from "../../../hooks/selection/useSelectionMulti";
import ImageField from "../../../components/common/imageField/ImageField";

export default function ManagerCourse() {
    const { session } = useAuth();
    const [inserirAberto, setInserirAberto] = useState(false);
    const { trilhas } = useTrilhasComTreinamentos();
    const { tags } = useTags();
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const selecaoTrilhas = useSelectionMulti();
    const selecaoTags = useSelectionMulti();

    function handleAbrirInserir() {
        setInserirAberto((estadoAtual) => !estadoAtual);
    }

    function resetarFormulario(formulario) {
        formulario.reset();
        setTrilhasSelecionadas([]);
        setTagsSelecionadas([]);
        setImagemArquivo(null);
        setImagemPreview(null);
        setInserirAberto(false);
    }

    async function handleCadastrarTreinamento(evento) {
        evento.preventDefault();
        setEnviando(true);

        const formulario = evento.target;
        const formData = new FormData(formulario);

        let urlImagem = null;
        if (imagemArquivo) {
            urlImagem = await uploadImagemTreinamento(imagemArquivo, session);
            if (!urlImagem) {
                alert("Não foi possível enviar a imagem. Tente novamente.");
                setEnviando(false);
                return;
            }
        }

        // TODO: os vínculos de trilhas/tags dependem de services ainda não criados
        // para as tabelas treinamentos_trilhas e treinamentos_tags.
        const treinamentoCriado = await inserirTreinamento({
            titulo: formData.get("titulo")?.trim(),
            descricao: formData.get("descricao")?.trim(),
            link_conteudo: formData.get("url_conteudo")?.trim(),
            link_material: formData.get("url_material")?.trim(),
            imagem: urlImagem,
        });

        setEnviando(false);

        if (!treinamentoCriado) {
            alert("Não foi possível cadastrar o treinamento.");
            return;
        }

        resetarFormulario(formulario);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Treinamentos</h1>
                <p>
                    Insira, edite ou remova informações dos treinamentos, essa é a página de
                    gerenciamento dos treinamentos disponíveis na Universidade Casagrande.
                </p>
                <div className={styles.formulario}>
                    <button className={styles.botaoAbrirInserir} onClick={handleAbrirInserir}>
                        {inserirAberto ? "Cancelar" : "+ Inserir Treinamento"}
                    </button>

                    {inserirAberto && (
                        <form className={styles.formInsercao} onSubmit={handleCadastrarTreinamento}>
                            <div className={styles.campo}>
                                <label className={styles.rotulo} htmlFor="titulo">Título</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    placeholder="Ex: Introdução à Universidade Casagrande"
                                    required
                                />
                            </div>

                            <div className={styles.campo}>
                                <label className={styles.rotulo} htmlFor="descricao">Descrição</label>
                                <textarea
                                    name="descricao"
                                    id="descricao"
                                    placeholder="Descreva do que se trata esse treinamento..."
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className={styles.linha}>
                                <div className={styles.campo}>
                                    <label className={styles.rotulo} htmlFor="url_conteudo">URL do conteúdo</label>
                                    <input
                                        type="text"
                                        name="url_conteudo"
                                        id="url_conteudo"
                                        placeholder="https://..."
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.linha}>
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

                            <div className={styles.campo}>
                                <label className={styles.rotulo}>Imagem do curso</label>
                                <ImageField onArquivoSelecionado={setImagemArquivo} />
                            </div>

                            <button type="submit" className={styles.botaoInserir} disabled={enviando}>
                                {enviando ? "Enviando..." : "Inserir treinamento"}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
