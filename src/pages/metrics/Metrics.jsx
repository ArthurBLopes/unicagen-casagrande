import styles from "./Metrics.module.css"
import UserAcessCard from "../../components/features/metrics/UserAcessCard"
import CourseAcessCard from "../../components/features/metrics/CourseAcessCard"
import { useAcessos } from "../../hooks/metrics/useAcessos"
import { useAcessosTreinamentos } from "../../hooks/metrics/useAcessosTreinamentos"
import { Info, Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

export default function Metricas() {

    const { acessos, loading } = useAcessos();
    const { acessosTreinamentos, loadingTreinamentos } = useAcessosTreinamentos();
    const [pesquisa, setPesquisa] = useState("");
    const [pesquisaTreinamentos, setPesquisaTreinamentos] = useState("");

    const acessosTreinamentosFiltrados = acessosTreinamentos.filter(acesso => acesso.titulo.toLowerCase().includes(pesquisaTreinamentos.toLowerCase()));
    console.log("teste teste teste");
    const acessosFiltrados = acessos.filter(acesso => acesso.nome.toLowerCase().includes(pesquisa.toLowerCase()) || acesso.email.toLowerCase().includes(pesquisa.toLowerCase()));

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Métricas</h1>
                <p>Acompanhe o engajamento dos colaboradores com a plataforma.</p>

                <div className={styles.aviso}>
                    <Info size={16} />
                    <span>Colaboradores que nunca acessaram a nova Unicagen não aparecem nesta lista, pois o cadastro só é criado no primeiro login.</span>
                </div>

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
                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar colaborador..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                        </div>
                    </div>

                    {loading ? (
                        <p className={styles.carregando}>Carregando métricas...</p>
                    ) : acessos.length === 0 ? (
                        <div className={styles.tabela}>
                            <p className={styles.estadoVazio}>Nenhum acesso registrado ainda.</p>
                        </div>
                    ) : (
                        <div className={styles.tabela}>
                            <div className={styles.tabelaCabecalho}>
                                <span>Nome</span>
                                <span>Email</span>
                                <span>Posição</span>
                                <span>Acessos (Últimos 15 dias)</span>
                                <span>Frequência (%)</span>
                                <span>Último acesso</span>
                            </div>
                            <div className={styles.tabelaCorpo}>
                                {acessosFiltrados.length > 0 ? acessosFiltrados.map((acesso) => (
                                    <UserAcessCard key={acesso.id_usuario} registro={acesso} />
                                )) : (
                                    <p className={styles.estadoVazio}>Nenhum colaborador encontrado.</p>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Acessos por curso</h2>
                    </div>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar curso..." value={pesquisaTreinamentos} onChange={(e) => setPesquisaTreinamentos(e.target.value)} />
                        </div>
                    </div>

                    {loadingTreinamentos ? (
                        <p className={styles.carregando}>Carregando métricas...</p>
                    ) : acessosTreinamentos.length === 0 ? (
                        <div className={styles.tabela}>
                            <p className={styles.estadoVazio}>Nenhum acesso registrado ainda.</p>
                        </div>
                    ) : (
                        <div className={styles.tabela}>
                            <div className={`${styles.tabelaCabecalho} ${styles.tabelaCabecalhoCurso}`}>
                                <span>Curso</span>
                                <span>Total de Acessos</span>
                                <span>Usuários Únicos</span>
                                <span>Último acesso</span>
                            </div>
                            <div className={styles.tabelaCorpo}>
                                {acessosTreinamentosFiltrados.length > 0 ? acessosTreinamentosFiltrados.map((acesso) => (
                                    <CourseAcessCard key={acesso.id_curso} registro={acesso} />
                                )) : (
                                    <p className={styles.estadoVazio}>Curso não encontrado.</p>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}