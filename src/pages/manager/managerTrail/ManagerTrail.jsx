import styles from "./ManagerTrail.module.css"
import Table from "../../../components/common/table/Table";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { formatarDataTabelas } from "../../../utils/formatarData";
import SearchSortToolbar from "../../../components/common/searchSortToolbar/SearchSortToolbar";
import { useListaOrdenada } from "../../../hooks/manager/useListaOrdenada";
import { useEffect, useState } from "react";
import TrailForm from "../../../components/features/manager/trail/TrailForm";

export default function ManagerTrail() {
    const { trilhasComTreinamentos, trilhas, loading } = useTrilhasComTreinamentos();
    const headers_trilhas = ["Título", "Descrição", "Cor", "Data de criação", "Edição", "Remoção"];
    const [formAberto, setFormAberto] = useState(false);
    const [trilhaEditando, setTrilhaEditando] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const { pesquisa, setPesquisa, opcaoOrdenar, handleOrdenacao, itensOrdenados: trilhasOrdenadas } = useListaOrdenada(trilhas, {
        campoPesquisa: "titulo",
        campoData: "data_criacao",
    });

    function handleAbrirForm() {
        setFormAberto((estadoAtual) => !estadoAtual);
    }

    function handleAbrirInserir() {
        if (formAberto) {
            handleCancelar();
        } else {
            setTrilhaEditando(null);
            setFormAberto(true);
        }
    }

    function resetarFormulario(formulario) {
        formulario.reset();
        setFormAberto(false);
    }

    function handleCancelar() {
        setFormAberto(false);
        setTrilhaEditando(null);
    }

    async function handleSalvarTrilha(evento) {
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

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Trilhas</h1>
                <p>Insira, edite ou remova informações das trilhas, essa é a página de gerenciamento das trilhas disponíveis na Universidade Casagrande.</p>
                <div className={styles.toolbar}>
                    <button className={styles.botaoAbrirInserir} onClick={handleAbrirInserir}>{formAberto ? "Cancelar" : "+ Inserir Trilha"}</button>
                </div>

                {formAberto && (
                    <div className={styles.painelForm}>
                        <TrailForm
                            key={trilhaEditando?.id ?? "novo"}
                            trilha={trilhaEditando}
                            editando={!!trilhaEditando}
                            funcaoSubmite={handleSalvarTrilha}
                            enviando={enviando}
                        />
                    </div>
                )}

                <SearchSortToolbar
                    pesquisa={pesquisa}
                    onPesquisaChange={setPesquisa}
                    opcaoOrdenar={opcaoOrdenar}
                    onOrdenar={handleOrdenacao}
                />

                <Table
                    dadosFiltrados={trilhasOrdenadas}
                    headers={headers_trilhas}
                    dados={trilhasOrdenadas}
                    columns="1fr 1fr 1fr 1fr 1fr 1fr"
                    colunas={(trilha) => [
                        { valor: trilha.titulo },
                        { valor: trilha.descricao },
                        { valor: (<span className={styles.campoCor} style={{ backgroundColor: trilha?.cor }} />) },
                        { valor: formatarDataTabelas(trilha.data_criacao) }]}
                />
            </main>
        </div>
    )
}