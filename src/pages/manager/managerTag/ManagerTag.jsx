import styles from "./ManagerTag.module.css"
import { useTags } from "../../../hooks/tags/useTags";
import Table from "../../../components/common/table/Table";
import { useState, useEffect } from "react";
import SearchSortToolbar from "../../../components/common/searchSortToolbar/SearchSortToolbar";
import { useListaOrdenada } from "../../../hooks/manager/useListaOrdenada";
import TagForm from "../../../components/features/manager/tag/TagForm";
import { inserirTag, atualizarTag, removerTag } from "../../../services/tagsService";
import ConfirmModal from "../../../components/common/confirmModal/ConfirmModal";

export default function ManagerTag() {
    const { tags, loading, recarregarTags } = useTags();
    const headers_tags = ["Título", "Edição", "Remoção"];
    const [formAberto, setFormAberto] = useState(false);
    const [tagEditando, setTagEditando] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [tagParaExcluir, setTagParaExcluir] = useState(null);

    function handleAbrirForm() {
        setFormAberto((estadoAtual) => !estadoAtual);
    }

    function handleAbrirInserir() {
        if (formAberto) {
            handleCancelar();
        } else {
            setTagEditando(null);
            setFormAberto(true);
        }
    }

    function resetarFormulario(formulario) {
        formulario.reset();
        setFormAberto(false);
    }

    function handleCancelar() {
        setFormAberto(false);
        setTagEditando(null);
    }

    async function handleSalvarTag(evento) {
        evento.preventDefault();
        setEnviando(true);

        const formulario = evento.currentTarget;
        const formData = new FormData(formulario);

        const dados = {
            titulo: formData.get("titulo")?.trim(),
        };

        const resultado = tagEditando ? await atualizarTag(tagEditando.id, dados) : await inserirTag(dados);

        if (!resultado) {
            alert(tagEditando ? "Não foi possível atualizar a tag." : "Não foi possível cadastrar a tag.");
            console.log(resultado)

            setEnviando(false);
            return;
        }

        await recarregarTags();
        setEnviando(false);
        resetarFormulario(formulario);
    }

    function onEditar(tag) {
        setTagEditando(tag)
        setFormAberto(true)
    }

    async function handleConfirmarRemocao() {
        if (!tagParaExcluir) return;

        await removerTag(tagParaExcluir.id);

        await recarregarTags();
        setTagParaExcluir(null);
    }

    function handleAbrirRemover(tag) {
        setTagParaExcluir(tag);
    }

    const { pesquisa, setPesquisa, itensFiltrados } = useListaOrdenada(tags, { campoPesquisa: "titulo", });

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Tags</h1>
                <p>Insira, edite ou remova informações das Tags, essa é a página de gerenciamento das tags usadas para classificar os treinamentos.</p>

                <div className={styles.toolbar}>
                    <button className={styles.botaoAbrirInserir} onClick={handleAbrirInserir}>{formAberto ? "Cancelar" : "+ Inserir Tag"}</button>
                </div>

                {formAberto && (
                    <div className={styles.painelForm}>
                        <TagForm
                            key={tagEditando?.id ?? "novo"}
                            tag={tagEditando}
                            editando={!!tagEditando}
                            funcaoSubmite={handleSalvarTag}
                            enviando={enviando}
                        />
                    </div>
                )}

                <SearchSortToolbar
                    pesquisa={pesquisa}
                    onPesquisaChange={setPesquisa}
                />

                <Table
                    dadosFiltrados={itensFiltrados}
                    headers={headers_tags}
                    dados={tags}
                    columns="1fr 1fr 1fr"
                    colunas={(tag) => [{ valor: tag.titulo },]}
                    acoes={{ onEditar, onRemover: handleAbrirRemover }}
                />

                {tagParaExcluir && (
                    <ConfirmModal
                        mensagem={`Tem certeza que deseja excluir "${tagParaExcluir.titulo}"?`}
                        onCancelar={() => setTagParaExcluir(null)}
                        onConfirmar={handleConfirmarRemocao}
                    />
                )}
            </main>
        </div>
    )
}