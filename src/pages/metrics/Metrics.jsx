import styles from "./Metrics.module.css"
import { useAcessos } from "../../hooks/metrics/useAcessos"
import { useAcessosTreinamentos } from "../../hooks/metrics/useAcessosTreinamentos"
import { Search, Video, FileText, CheckCircle2, Clock, Eye, GraduationCap } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { useState, useRef } from "react"
import Table from "../../components/common/table/Table"
import Alert from "../../components/common/alert/Alert"
import { formatarUltimoAcesso } from "../../utils/formatarData"
import { useMetricasDashboard } from "../../hooks/metrics/useMetricasDashboard";
import { useEngajamentoVideos } from "../../hooks/metrics/useEngajamentoVideos";
import { useUsuarios } from "../../hooks/metrics/useUsuarios";
import { useTreinamentosVistosPorUsuario } from "../../hooks/metrics/useTreinamentosVistosPorUsuario";
import { capturarGrafico } from "../../utils/capturarGrafico";
import RelatorioMetricasPDF from "../../components/features/metrics/RelatorioMetricasPDF";
import { pdf } from "@react-pdf/renderer";

export default function Metricas() {

    const { acessos, loading } = useAcessos();
    const { acessosTreinamentos, loadingTreinamentos } = useAcessosTreinamentos();
    const { engajamentoVideos, loadingVideos } = useEngajamentoVideos();
    const { usuarios } = useUsuarios();
    const [pesquisa, setPesquisa] = useState("");
    const [pesquisaTreinamentos, setPesquisaTreinamentos] = useState("");
    const [pesquisaVideos, setPesquisaVideos] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
    const { treinamentosVistos, loadingTreinamentosVistos } = useTreinamentosVistosPorUsuario(usuarioSelecionado);
    const { atividadeUsuarios, engajamentoPlataforma, acessaramNovaUnicagen, engajamentoTreinamentos } = useMetricasDashboard()

    const acessosTreinamentosOrdenados = acessosTreinamentos.sort((a, b) => b.total_acessos - a.total_acessos);
    const acessosTreinamentosFiltrados = acessosTreinamentosOrdenados.filter(acesso => acesso.titulo.toLowerCase().includes(pesquisaTreinamentos.toLowerCase()));

    const engajamentoVideosOrdenado = engajamentoVideos.sort((a, b) => b.iniciaram - a.iniciaram);
    const engajamentoVideosFiltrado = engajamentoVideosOrdenado.filter(video => video.titulo.toLowerCase().includes(pesquisaVideos.toLowerCase()));

    const acessosOrdenados = acessos.sort((a, b) => a.nome.localeCompare(b.nome));
    const acessosFiltrados = acessosOrdenados.filter(acesso => acesso.nome.toLowerCase().includes(pesquisa.toLowerCase()) || acesso.email.toLowerCase().includes(pesquisa.toLowerCase()));

    const usuariosOrdenados = usuarios.slice().sort((a, b) => a.nome.localeCompare(b.nome));

    const headers_acessos = ["Nome", "Email", "Perfil", "Acessos (Últimos 30 dias)", "Frequência (%)", "Último acesso"];
    const headers_treinamentos = ["Curso", "Total de Acessos", "Usuários únicos", "Último acesso"];
    const headers_videos = ["Curso", "Iniciaram", "Concluíram", "Taxa de conclusão"];

    //parte de gerar o relatório ( eu apaguei a opção de power bi )
    const graficoUsuariosRef = useRef(null);
    const graficoTreinamentosRef = useRef(null);
    const graficoEngajamentoRef = useRef(null);
    const [gerandoRelatorio, setGerandoRelatorio] = useState(false);

    const dadosUsuarios = [
        {
            nome: "Ativos",
            valor: atividadeUsuarios[0]?.ativos_30_dias ?? 0,
            fill: "#4f772d"
        },
        {
            nome: "Inativos +30 dias",
            valor: atividadeUsuarios[0]?.inativos_mais_30_dias ?? 0,
            fill: "#8b8b8b"
        }
    ];

    const handleGerarRelatorio = async () => {

        try {

            setGerandoRelatorio(true);


            // ==============================
            // CAPTURA DOS GRÁFICOS
            // ==============================

            const imagemUsuarios = await capturarGrafico(
                graficoUsuariosRef.current
            );


            const imagemTreinamentos = await capturarGrafico(
                graficoTreinamentosRef.current
            );


            const imagemEngajamento = await capturarGrafico(
                graficoEngajamentoRef.current
            );


            // ==============================
            // CRIA O DOCUMENTO PDF
            // ==============================

            const documento = (
                <RelatorioMetricasPDF

                    acessaramNovaUnicagen={
                        acessaramNovaUnicagen
                    }

                    atividadeUsuarios={
                        atividadeUsuarios
                    }

                    engajamentoPlataforma={
                        engajamentoPlataforma
                    }

                    treinamentos={
                        engajamentoTreinamentos
                    }

                    colaboradores={
                        acessosOrdenados
                    }

                    graficoUsuarios={
                        imagemUsuarios
                    }

                    graficoTreinamentos={
                        imagemTreinamentos
                    }

                    graficoEngajamento={
                        imagemEngajamento
                    }

                />
            );


            // ==============================
            // CONVERTE PARA BLOB
            // ==============================

            const blob = await pdf(documento).toBlob();


            // ==============================
            // GERA URL TEMPORÁRIA
            // ==============================

            const url = URL.createObjectURL(blob);


            // ==============================
            // NOME DO ARQUIVO
            // ==============================

            const hoje = new Date();

            const dataArquivo = hoje
                .toLocaleDateString("pt-BR")
                .replaceAll("/", "-");


            const nomeArquivo = `Relatorio_Metricas_UNICAGEN_${dataArquivo}.pdf`;


            // ==============================
            // DOWNLOAD
            // ==============================

            const link = document.createElement("a");

            link.href = url;
            link.download = nomeArquivo;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);


            // Libera a memória da URL temporária
            URL.revokeObjectURL(url);


        } catch (erro) {

            console.error(
                "Erro ao gerar relatório:",
                erro
            );


        } finally {

            setGerandoRelatorio(false);

        }

    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.cabecalhoPagina}>
                    <div>
                        <h1>Métricas</h1>
                        <p>Acompanhe o engajamento dos colaboradores com a plataforma: quem está ativo, quais cursos são mais acessados e o progresso individual de cada um.</p>
                    </div>

                    <button className={styles.btnPDF} onClick={handleGerarRelatorio} disabled={gerandoRelatorio}>
                        {gerandoRelatorio ? "Gerando relatório..." : "Gerar relatório em PDF"}
                    </button>
                </div>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Visão geral de acessos</h2>
                    </div>

                    <Alert mensagem={"Panorama de quem está usando a plataforma agora: quantos colaboradores já acessaram a nova Unicagen, quantos estiveram ativos hoje, nesta semana, neste mês, e quantos estão inativos há mais de 30 dias sem acessar."} />

                    <div className={styles.dashboard}>
                        <div className={styles.ResumoAtividadesUsuarios}>
                            <div className={styles.cardMetrica}>
                                <strong>{acessaramNovaUnicagen}</strong>
                                <span>colaboradores já acessaram a nova unicagen</span>
                            </div>
                            <div className={styles.cardMetrica}>
                                <span>Ativos hoje</span>
                                <strong>{atividadeUsuarios[0]?.ativos_hoje}</strong>
                            </div>
                            <div className={styles.cardMetrica}>
                                <span>Ativos na semana</span>
                                <strong>{atividadeUsuarios[0]?.ativos_7_dias}</strong>
                            </div>
                            <div className={styles.cardMetrica}>
                                <span>Ativos no mês</span>
                                <strong>{atividadeUsuarios[0]?.ativos_30_dias}</strong>
                            </div>
                            <div className={styles.cardMetrica}>
                                <span>Inativos | + 30 dias sem acessar</span>
                                <strong>{atividadeUsuarios[0]?.inativos_mais_30_dias}</strong>
                            </div>
                        </div>
                        <div className={styles.graficos}>

                            <div className={styles.graficoUsuarios}>
                                <h3>Status dos usuários</h3>
                                <div ref={graficoUsuariosRef} >
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={dadosUsuarios}
                                                dataKey="valor"
                                                nameKey="nome"
                                                cx="50%"
                                                cy="45%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={2}
                                                label={({ name, percent }) =>
                                                    `${name} ${(percent * 100).toFixed(0)}%`
                                                }
                                            />

                                            <Tooltip />

                                            <Legend
                                                verticalAlign="bottom"
                                                align="center"
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className={styles.graficoTreinamentos}>
                                <h3>Cursos mais acessados</h3>

                                <div ref={graficoTreinamentosRef}>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={engajamentoTreinamentos}
                                            layout="vertical"
                                            margin={{
                                                top: 10,
                                                right: 20,
                                                left: 0,
                                                bottom: 10
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                horizontal={false}
                                            />

                                            <XAxis
                                                type="number"
                                                allowDecimals={false}
                                                axisLine={false}
                                                tickLine={false}
                                            />

                                            <YAxis
                                                type="category"
                                                dataKey="titulo"
                                                width={80}
                                                axisLine={false}
                                                tickLine={false}
                                                tickFormatter={(titulo) =>
                                                    titulo.length > 12
                                                        ? `${titulo.substring(0, 12)}...`
                                                        : titulo
                                                }
                                            />

                                            <Tooltip />

                                            <Bar
                                                dataKey="total_acessos"
                                                name="Acessos"
                                                fill="#4f772d"
                                                radius={[0, 6, 6, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className={styles.graficoEngajamento}>
                                <h3>Engajamento diário na plataforma</h3>

                                <div ref={graficoEngajamentoRef}>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart
                                            data={engajamentoPlataforma}
                                            margin={{
                                                top: 10,
                                                right: 20,
                                                left: 0,
                                                bottom: 10
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />

                                            <XAxis
                                                dataKey="data"
                                                interval={4}
                                                tickFormatter={(data) => {
                                                    const [ano, mes, dia] = data.split("-");
                                                    return `${dia}/${mes}`;
                                                }}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickLine={false}
                                            />

                                            <YAxis
                                                allowDecimals={false}
                                                axisLine={false}
                                                tickLine={false}
                                            />

                                            <Tooltip
                                                labelFormatter={(data) => {
                                                    const [ano, mes, dia] = data.split("-");
                                                    return `${dia}/${mes}/${ano}`;
                                                }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="usuarios_ativos"
                                                name="Usuários ativos"
                                                stroke="#4f772d"
                                                fill="#4f772d"
                                                fillOpacity={0.25}
                                            />

                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Acessos por colaborador</h2>
                    </div>

                    <Alert mensagem={"Detalhamento por colaborador: quantas vezes cada um acessou a plataforma nos últimos 30 dias, com que frequência e quando foi o último acesso. Colaboradores que nunca acessaram a nova Unicagen não aparecem nesta lista, pois o cadastro só é criado no primeiro login."} />

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
                            { valor: registro.regra },
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

                    <Alert mensagem={"Ranking dos cursos mais acessados pelos colaboradores: total de acessos, quantos colaboradores distintos acessaram cada curso e a data do acesso mais recente."} />

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

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Engajamento com vídeos</h2>
                    </div>

                    <Alert mensagem={"Para cada curso em vídeo, veja quantos colaboradores iniciaram a reprodução, quantos concluíram até o fim e qual a taxa de conclusão (percentual de quem concluiu em relação a quem iniciou)."} />

                    <div className={styles.searchArea}>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Buscar curso..." value={pesquisaVideos} onChange={(e) => setPesquisaVideos(e.target.value)} />
                        </div>
                    </div>

                    <Table
                        loading={loadingVideos}
                        headers={headers_videos}
                        dados={engajamentoVideosOrdenado}
                        dadosFiltrados={engajamentoVideosFiltrado}
                        colunas={(registro) => [
                            { valor: registro.titulo },
                            { valor: registro.iniciaram },
                            { valor: registro.concluiram },
                            { valor: `${Math.round((registro.concluiram / registro.iniciaram) * 100)}%` },
                        ]}
                        columns="2.7fr 1.5fr 1.5fr 1.3fr"
                    />
                </section>

                <section className={styles.secao}>
                    <div className={styles.secaoCabecalho}>
                        <h2 className={styles.secaoTitulo}>Treinamentos por colaborador</h2>
                    </div>

                    <Alert mensagem={"Selecione um colaborador para ver todos os cursos e trilhas que ele já assistiu ou acessou, com o tipo de conteúdo, o status atual e o progresso registrado."} />

                    <div className={styles.searchArea}>
                        <select className={styles.selectUsuario} value={usuarioSelecionado} onChange={(e) => setUsuarioSelecionado(e.target.value)}>
                            <option value="">Selecione um colaborador...</option>
                            {usuariosOrdenados.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                            ))}
                        </select>
                    </div>

                    {usuarioSelecionado && (
                        loadingTreinamentosVistos ? (
                            <p className={styles.carregando}>Carregando dados...</p>
                        ) : treinamentosVistos.length === 0 ? (
                            <p className={styles.estadoVazio}>Este colaborador ainda não assistiu ou acessou nenhum curso.</p>
                        ) : (
                            <div className={styles.gradeTreinamentos}>
                                {treinamentosVistos.map((item) => {
                                    const progresso = parseInt(item.detalhe, 10);
                                    const temProgresso = !Number.isNaN(progresso);

                                    return (
                                        <div className={styles.cardTreinamento} key={item.id}>
                                            <div className={styles.cardTreinamentoTopo}>
                                                <span className={styles.tagTipo}>
                                                    {item.tipo === "Vídeo" ? <Video size={14} /> : <FileText size={14} />}
                                                    {item.tipo}
                                                </span>

                                                <span className={`${styles.tagStatus} ${item.status === "Concluído" ? styles.tagStatusConcluido : item.status === "Em andamento" ? styles.tagStatusAndamento : styles.tagStatusAcessado}`}>
                                                    {item.status === "Concluído" ? <CheckCircle2 size={12} /> : item.status === "Em andamento" ? <Clock size={12} /> : <Eye size={12} />}
                                                    {item.status}
                                                </span>
                                            </div>

                                            <h4 className={styles.cardTreinamentoTitulo}>
                                                <GraduationCap size={16} className={styles.cardTreinamentoIcone} />
                                                {item.titulo}
                                            </h4>

                                            {item.detalhe !== "-" && (
                                                temProgresso ? (
                                                    <div className={styles.cardTreinamentoProgresso}>
                                                        <div className={styles.barraProgresso}>
                                                            <div className={styles.barraProgressoPreenchida} style={{ width: `${progresso}%` }} />
                                                        </div>
                                                        <span className={styles.cardTreinamentoDetalhe}>{item.detalhe}</span>
                                                    </div>
                                                ) : (
                                                    <span className={styles.cardTreinamentoDetalhe}>{item.detalhe}</span>
                                                )
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    )}
                </section>
            </main>
        </div>
    )
}