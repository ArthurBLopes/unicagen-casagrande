import styles from "./ManagerTrail.module.css"
import Table from "../../../components/common/table/Table";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { formatarDataTabelas } from "../../../utils/formatarData";
import SearchSortToolbar from "../../../components/common/searchSortToolbar/SearchSortToolbar";
import { useListaOrdenada } from "../../../hooks/manager/useListaOrdenada";
import { useEffect, useState } from "react";
import TrailForm from "../../../components/features/manager/trail/TrailForm";
import { atualizarTrilha, inserirTrilha } from "../../../services/trilhasService";

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

        const dados = {
            titulo: formData.get("titulo")?.trim(),
            descricao: formData.get("descricao")?.trim(),
            cor: formData.get("cor")?.trim(),
        };

        const resultado = trilhaEditando ? await atualizarTrilha(trilhaEditando.id, dados) : await inserirTrilha(dados);

        if (!resultado) {
            alert(trilhaEditando ? "Não foi possível atualizar a trilha." : "Não foi possível cadastrar a trilha.");

            setEnviando(false);
            return;
        }

        setEnviando(false);
        resetarFormulario(formulario);
    }

    function onEditar(trilha) {
        setTrilhaEditando(trilha)
        setFormAberto(true)
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
                    acoes={{onEditar}}
                />
            </main>
        </div>
    )
}