import { useEffect, useState } from "react";
import styles from "./ManagerCourse.module.css";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useTags } from "../../../hooks/tags/useTags";
import { useAuth } from "../../../providers/AuthContext";
import { inserirTreinamento } from "../../../services/treinamentosService";
import { Trash, Images, X } from "lucide-react"

export default function ManagerCourse() {
    const { session } = useAuth();
    const [inserirAberto, setInserirAberto] = useState(false);
    const { trilhas } = useTrilhasComTreinamentos();
    const { tags } = useTags();
    const [trilhasSelecionadas, setTrilhasSelecionadas] = useState([]);
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [enviando, setEnviando] = useState(false);

    function handleAbrirInserir() {
        setInserirAberto((estadoAtual) => !estadoAtual);
    }

    function inserirTrilhaSelecionada(trilha) {
        setTrilhasSelecionadas((atual) => {
            if (atual.some((t) => t.id === trilha.id)) {
                return atual;
            }

            return [...atual, trilha];
        });
    }

    function inserirTagSelecionada(tag) {
        setTagsSelecionadas((atual) => {
            if (atual.some((t) => t.id === tag.id)) {
                return atual;
            }

            return [...atual, tag];
        });
    }


    function removerTrilhaSelecionada(e, trilha) {
        e.stopPropagation();
        setTrilhasSelecionadas((atual) => atual.filter((t) => t.id !== trilha.id));
    }

    function removerTagSelecionada(e, tag) {
        e.stopPropagation();
        setTagsSelecionadas((atual) => atual.filter((t) => t.id !== tag.id));
    }

    function handleSelecionarTrilha(evento) {
        const trilhaId = evento.target.value;

        if (!trilhaId) {
            return;
        }

        const trilhaSelecionada = trilhas.find((trilha) => String(trilha.id) === trilhaId);

        if (trilhaSelecionada) {
            inserirTrilhaSelecionada(trilhaSelecionada);
        }

        evento.target.value = "";
    }

    function handleSelecionarTag(evento) {
        const tagId = evento.target.value;

        if (!tagId) {
            return;
        }

        const tagSelecionada = tags.find((tag) => String(tag.id) === tagId);

        if (tagSelecionada) {
            inserirTagSelecionada(tagSelecionada);
        }

        evento.target.value = "";
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
                                    <select
                                        name="trilhas"
                                        id="trilhas"
                                        onChange={handleSelecionarTrilha}
                                        defaultValue=""
                                    >
                                        <option value="">Selecione uma trilha</option>
                                        {trilhas.map((trilha) => (
                                            <option key={trilha.id} value={trilha.id}>
                                                {trilha.titulo}
                                            </option>
                                        ))}
                                    </select>
                                    {trilhasSelecionadas.length > 0 && (
                                        <div className={styles.chips}>
                                            {trilhasSelecionadas.map((trilha) => (
                                                <span className={styles.chip} key={trilha.id}>
                                                    {trilha.titulo}
                                                    <Trash size={13} onClick={(e) => removerTrilhaSelecionada(e, trilha)} />
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.campo}>
                                    <label className={styles.rotulo} htmlFor="tags">Tags</label>
                                    <select
                                        name="tags"
                                        id="tags"
                                        onChange={handleSelecionarTag}
                                        defaultValue=""
                                    >
                                        <option value="">Selecione uma tag</option>
                                        {tags.map((tag) => (
                                            <option key={tag.id} value={tag.id}>
                                                {tag.titulo}
                                            </option>
                                        ))}
                                    </select>
                                    {tagsSelecionadas.length > 0 && (
                                        <div className={styles.chips}>
                                            {tagsSelecionadas.map((tag) => (
                                                <span className={styles.chip} key={tag.id}>
                                                    {tag.titulo}
                                                    <Trash size={13} onClick={(e) => removerTagSelecionada(e, tag)} />
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.campo}>
                                <label className={styles.rotulo}>Imagem do curso</label>
                                <label className={styles.imagemCampo}>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleSelecionarImagem}
                                        hidden
                                    />
                                    {imagemPreview ? (
                                        <>
                                            <img src={imagemPreview} alt="Prévia da imagem do curso" className={styles.imagemPreview} />
                                            <button type="button" className={styles.removerImagem} onClick={handleRemoverImagem}>
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className={styles.imagemPlaceholder}>
                                            <Images size={26} />
                                            <span>Adicionar imagem</span>
                                        </div>
                                    )}
                                </label>
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
