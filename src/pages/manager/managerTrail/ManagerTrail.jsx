import styles from "./ManagerTrail.module.css"
import Table from "../../../components/common/table/Table";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { formatarDataTabelas } from "../../../utils/formatarData";
import SearchSortToolbar from "../../../components/common/searchSortToolbar/SearchSortToolbar";
import { useListaOrdenada } from "../../../hooks/manager/useListaOrdenada";

export default function ManagerTrail() {
    const { trilhasComTreinamentos, trilhas, loading } = useTrilhasComTreinamentos();
    const headers_trilhas = ["Título", "Descrição", "Cor", "Data de criação", "Edição", "Remoção"];

    const { pesquisa, setPesquisa, opcaoOrdenar, handleOrdenacao, itensOrdenados: trilhasOrdenadas } = useListaOrdenada(trilhas, {
        campoPesquisa: "titulo",
        campoData: "data_criacao",
    });

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Trilhas</h1>
                <p>Insira, edite ou remova informações das trilhas, essa é a página de gerenciamento das trilhas disponíveis na Universidade Casagrande.</p>
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
                    { valor: (<span className={styles.campoCor} style={{backgroundColor: trilha?.cor}} />) }, 
                    { valor: formatarDataTabelas(trilha.data_criacao) }]}
                />
            </main>
        </div>
    )
}