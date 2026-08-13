import styles from "./Metrics.module.css"
import UserAcessCard from "../../components/features/metrics/UserAcessCard"
import CourseAcessCard from "../../components/features/metrics/CourseAcessCard"
import { useAcessos } from "../../hooks/metrics/useAcessos"
import { useAcessosTreinamentos } from "../../hooks/metrics/useAcessosTreinamentos"
import { Info, Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import Table from "../../components/common/table/Table"

export default function Metricas() {

    const { acessos, loading } = useAcessos();
    const { acessosTreinamentos, loadingTreinamentos } = useAcessosTreinamentos();
    const [pesquisa, setPesquisa] = useState("");
    const [pesquisaTreinamentos, setPesquisaTreinamentos] = useState("");

    const acessosTreinamentosOrdenados = acessosTreinamentos.sort((a, b) => b.total_acessos - a.total_acessos);
    const acessosTreinamentosFiltrados = acessosTreinamentosOrdenados.filter(acesso => acesso.titulo.toLowerCase().includes(pesquisaTreinamentos.toLowerCase()));

    const acessosOrdenados = acessos.sort((a, b) => a.nome.localeCompare(b.nome));
    const acessosFiltrados = acessosOrdenados.filter(acesso => acesso.nome.toLowerCase().includes(pesquisa.toLowerCase()) || acesso.email.toLowerCase().includes(pesquisa.toLowerCase()));

    const headers_acessos = ["Nome", "Email", "Posição", "Acessos (Últimos 30 dias)", "Frequência (%)", "Último acesso"];
    const headers_treinamentos = ["Curso", "Total de Acessos", "Usuários únicos", "Último acesso"];

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Métricas</h1>
                <p>Acompanhe o engajamento dos colaboradores com a plataforma.</p>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Acessos por colaborador</h2>

                        

                        <div className={styles.btns}>
                            <button className={styles.btnBI}>
                                <img className={styles.iconeBI} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/960px-New_Power_BI_Logo.svg.png" alt="" />
                                Ver no Power BI
                            </button>
                            <button className={styles.btnPDF}>Gerar relatório</button>
                        </div>
                    </div>
                    <div className={styles.aviso}>
                        <Info size={16} />
                        <span>Colaboradores que nunca acessaram a nova Unicagen não aparecem nesta lista, pois o cadastro só é criado no primeiro login.</span>
                    </div>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar colaborador..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                        </div>
                    </div>

                    <Table loading={loading} headers={headers_acessos} dados={acessosOrdenados} dadosFiltrados={acessosFiltrados} Card={UserAcessCard} />
                    
                </section>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Acessos por curso</h2>
                    </div>
                    <div className={styles.aviso}>
                        <Info size={16} />
                        <span>Confira os cursos mais procurados pelos colaboradores da Casagrande.</span>
                    </div>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar curso..." value={pesquisaTreinamentos} onChange={(e) => setPesquisaTreinamentos(e.target.value)} />
                        </div>
                    </div>

                    <Table loading={loadingTreinamentos} headers={headers_treinamentos} dados={acessosTreinamentosOrdenados} dadosFiltrados={acessosTreinamentosFiltrados} Card={CourseAcessCard} />
                </section>
            </main>
        </div>
    )
}