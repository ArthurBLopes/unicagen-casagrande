import styles from "./Metrics.module.css"
import UserAcessCard from "../../components/features/metrics/UserAcessCard"
import { useAcessos } from "../../hooks/metrics/useAcessos"
import { Info, Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

export default function Metricas() {

    const { acessos, loading } = useAcessos();
    const [pesquisa, setPesquisa] = useState("");

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
                                <span>Último acesso</span>
                            </div>
                            <div className={styles.tabelaCorpo}>
                                {acessos.map((acesso) => (
                                    <UserAcessCard key={acesso.id_usuario} registro={acesso} />
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}