import styles from "./Metrics.module.css"
import { useAcessos } from "../../hooks/metrics/useAcessos"
import { useAcessosTreinamentos } from "../../hooks/metrics/useAcessosTreinamentos"
import { Info, Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import Table from "../../components/common/table/Table"
import Alert from "../../components/common/alert/Alert"
import { formatarUltimoAcesso } from "../../utils/formatarData"

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
                            <button className={styles.btnPDF}>Gerar relatório</button>
                        </div>
                    </div>

                    <Alert mensagem={"Colaboradores que nunca acessaram a nova Unicagen não aparecem nesta lista, pois o cadastro só é criado no primeiro login."} />

                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar colaborador..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                        </div>
                    </div>

                    <Table loading={loading} 
                    headers={headers_acessos} 
                    dados={acessosOrdenados} 
                    dadosFiltrados={acessosFiltrados} 
                    colunas={(registro) => [
                        { valor: registro.nome },
                        { valor: registro.email },
                        { valor: registro.regra},
                        { valor: registro.total_acessos },
                        { valor: `${registro.frequencia_pct}%` },
                        formatarUltimoAcesso(registro.ultimo_acesso),
                    ]}
                    columns="1.4fr 1.8fr 0.9fr 0.9fr 0.9fr 1fr" 
                    />

                </section>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Acessos por curso</h2>
                    </div>

                    <Alert mensagem={"Confira os cursos mais procurados pelos colaboradores da Casagrande."} />

                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar curso..." value={pesquisaTreinamentos} onChange={(e) => setPesquisaTreinamentos(e.target.value)} />
                        </div>
                    </div>

                    <Table 
                    loading={loadingTreinamentos} 
                    headers={headers_treinamentos} 
                    dados={acessosTreinamentosOrdenados} 
                    dadosFiltrados={acessosTreinamentosFiltrados} 
                    colunas={(registro) => [
                        { valor: registro.titulo },
                        { valor: registro.total_acessos },
                        { valor: registro.usuarios_unicos },
                        formatarUltimoAcesso(registro.ultimo_acesso),
                    ]}
                    columns="2.7fr 1.5fr 1.4fr 1.3fr" 
                    />
                </section>
            </main>
        </div>
    )
}