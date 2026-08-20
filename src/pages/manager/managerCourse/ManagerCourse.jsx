import { useEffect, useState } from "react";
import styles from "./ManagerCourse.module.css";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useTags } from "../../../hooks/tags/useTags";
import { useAuth } from "../../../providers/AuthContext";
import { inserirTreinamento, atualizarTreinamento } from "../../../services/treinamentosService";
import { Trash, Images, X, SquarePen } from "lucide-react"
import ChipSelectField from "../../../components/common/chipSelectField/ChipSelectField";
import { useSelectionMulti } from "../../../hooks/selection/useSelectionMulti";
import ImageField from "../../../components/common/imageField/ImageField";
import CourseForm from "../../../components/features/manager/course/CourseForm";
import { useTreinamentos } from "../../../hooks/courses/useTreinamentos";
import Table from "../../../components/common/table/Table";
import SearchSortToolbar from "../../../components/common/searchSortToolbar/SearchSortToolbar";
import { useListaOrdenada } from "../../../hooks/manager/useListaOrdenada";
import { sincronizarTrilhasDoTreinamento } from "../../../services/treinamentosTrilhasService";
import { sincronizarTagsDoTreinamento } from "../../../services/tagsService";
import { uploadImagemTreinamento } from "../../../services/uploadService";
import { removerTreinamento } from "../../../services/treinamentosService";
import ConfirmModal from "../../../components/common/confirmModal/ConfirmModal";

export default function ManagerCourse() {
    const { session } = useAuth();
    const [formAberto, setFormAberto] = useState(false);
    const [treinamentoParaExcluir, setTreinamentoParaExcluir] = useState(null);
    const [treinamentoEditando, setTreinamentoEditando] = useState(null);
    const { trilhas } = useTrilhasComTreinamentos();
    const { tags } = useTags();
    const { treinamentos, recarregarTreinamentos, loading } = useTreinamentos();
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const selecaoTrilhas = useSelectionMulti();
    const selecaoTags = useSelectionMulti();

    const headers_treinamentos = ["Título", "Data de Publicação", "Edição", "Remoção"]

    const { pesquisa, setPesquisa, opcaoOrdenar, handleOrdenacao, itensOrdenados: treinamentosOrdenados } = useListaOrdenada(treinamentos, {
        campoPesquisa: "titulo",
        campoData: "data_publicacao",
        formatarItem: (treinamento) => ({ ...treinamento, data_publicacao: treinamento?.data_publicacao ? String(treinamento.data_publicacao).split('-').reverse().join('/') : "" }),
    });

    function handleAbrirForm() {
        setFormAberto((estadoAtual) => !estadoAtual);
    }

    function handleAbrirInserir() {
        if (formAberto) {
            handleCancelar();
        } else {
            setTreinamentoEditando(null); 
            setFormAberto(true);
        }
    }

    function resetarFormulario(formulario) {
        formulario.reset();
        setImagemArquivo(null);
        setFormAberto(false);
    }

    async function handleSalvarTreinamento(evento) {
        evento.preventDefault();
        setEnviando(true);

        const formulario = evento.currentTarget;
        const formData = new FormData(formulario);

        const titulo = formData.get("titulo")?.trim();

        let urlImagem = treinamentoEditando?.imagem ?? null;

        if (imagemArquivo) {
            urlImagem = await uploadImagemTreinamento(imagemArquivo, session, titulo);

            if (!urlImagem) {
                alert("Não foi possível enviar a imagem. Tente novamente.");
                setEnviando(false);
                return;
            }
        }

        const dados = {
            titulo,
            descricao: formData.get("descricao")?.trim(),
            link_conteudo: formData.get("url_conteudo")?.trim(),
            link_material: formData.get("url_material")?.trim(),
            imagem: urlImagem,
        };

        const resultado = treinamentoEditando ? await atualizarTreinamento(treinamentoEditando.id, dados) : await inserirTreinamento(dados);

        if (!resultado) {
            alert(treinamentoEditando ? "Não foi possível atualizar o treinamento." : "Não foi possível cadastrar o treinamento.");

            setEnviando(false);
            return;
        }

        const identificador = treinamentoEditando ? treinamentoEditando.id : resultado.id;

        const trilhaIds = selecaoTrilhas.selecionados.map((trilha) => trilha.id);

        const tagIds = selecaoTags.selecionados.map((tag) => tag.id);

        console.log("Treinamento:", identificador);
        console.log("Trilhas selecionadas:", trilhaIds);
        console.log("Tags selecionadas:", tagIds);

        await sincronizarTrilhasDoTreinamento(identificador, trilhaIds);

        await sincronizarTagsDoTreinamento(identificador, tagIds);

        await recarregarTreinamentos();
        setEnviando(false);

        selecaoTrilhas.limpar();
        selecaoTags.limpar();

        resetarFormulario(formulario);
    }

    function onEditar(treinamento) {
        setTreinamentoEditando(treinamento)
        setFormAberto(true)
    }

    async function handleConfirmarRemocao() {
        if (!treinamentoParaExcluir) return;

        await removerTreinamento(treinamentoParaExcluir.id);

        await recarregarTreinamentos();

        setTreinamentoParaExcluir(null);
    }

    function handleCancelar() {
        setFormAberto(false);
        setTreinamentoEditando(null);
        setImagemArquivo(null);
        selecaoTags.limpar();
        selecaoTrilhas.limpar();
    }

    function handleAbrirRemover(treinamento) {
        setTreinamentoParaExcluir(treinamento);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Treinamentos</h1>
                <p>
                    Insira, edite ou remova informações dos treinamentos, essa é a página de
                    gerenciamento dos treinamentos disponíveis na Universidade Casagrande.
                </p>
                <div className={styles.acoes}>
                    <div className={styles.toolbar}>
                        <button className={styles.botaoAbrirInserir} onClick={handleAbrirInserir}>
                            {formAberto ? "Cancelar" : "+ Inserir Treinamento"}
                        </button>
                    </div>

                    {formAberto && (
                        <div className={styles.painelForm}>
                            <CourseForm
                                key={treinamentoEditando?.id ?? "novo"}
                                treinamento={treinamentoEditando}
                                editando={!!treinamentoEditando}
                                funcaoSubmite={handleSalvarTreinamento}
                                trilhas={trilhas}
                                tags={tags}
                                setImagemArquivo={setImagemArquivo}
                                enviando={enviando}
                                selecaoTags={selecaoTags}
                                selecaoTrilhas={selecaoTrilhas}
                            />
                        </div>
                    )}

                    <SearchSortToolbar
                        pesquisa={pesquisa}
                        onPesquisaChange={setPesquisa}
                        opcaoOrdenar={opcaoOrdenar}
                        onOrdenar={handleOrdenacao}
                    />
                    <div className={styles.tabela}>
                        <Table
                            
                            headers={headers_treinamentos}
                            dados={treinamentosOrdenados}
                            dadosFiltrados={treinamentosOrdenados}
                            columns="1.6fr 1fr 1fr 1fr"
                            colunas={(treinamento) => [{ valor: treinamento.titulo }, { valor: treinamento.data_publicacao }]}
                            acoes={{ onEditar, onRemover: handleAbrirRemover }}
                        />
                    </div>
                    {treinamentoParaExcluir && (
                        <ConfirmModal
                            mensagem={`Tem certeza que deseja excluir "${treinamentoParaExcluir.titulo}"?`}
                            onCancelar={() => setTreinamentoParaExcluir(null)}
                            onConfirmar={handleConfirmarRemocao}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
