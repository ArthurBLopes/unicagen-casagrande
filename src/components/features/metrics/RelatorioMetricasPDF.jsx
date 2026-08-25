import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet
} from "@react-pdf/renderer";

import logoCasagrande from "../../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Grafite.png";


const styles = StyleSheet.create({

    pagina: {
        paddingTop: 45,
        paddingBottom: 50,
        paddingHorizontal: 45,
        fontFamily: "Helvetica",
        backgroundColor: "#FFFFFF",
        color: "#303030",
    },

    // ==========================
    // CAPA
    // ==========================

    capa: {
        padding: 55,
        fontFamily: "Helvetica",
        backgroundColor: "#FFFFFF",
        color: "#303030",
        justifyContent: "space-between",
    },

    capaTopo: {
        alignItems: "flex-start",
    },

    logo: {
        width: 210,
        height: 65,
        objectFit: "contain",
    },

    capaCentro: {
        marginTop: 110,
    },

    linhaVerde: {
        width: 55,
        height: 5,
        backgroundColor: "#4F772D",
        marginBottom: 24,
    },

    unicagen: {
        fontSize: 15,
        color: "#4F772D",
        fontWeight: "bold",
        letterSpacing: 3,
        marginBottom: 12,
    },

    tituloCapa: {
        fontSize: 31,
        fontWeight: "bold",
        color: "#263238",
        lineHeight: 1.2,
        marginBottom: 12,
    },

    subtituloCapa: {
        fontSize: 13,
        color: "#6B6B6B",
        lineHeight: 1.5,
        maxWidth: 380,
    },

    capaRodape: {
        borderTopWidth: 1,
        borderTopColor: "#D9D9D9",
        paddingTop: 16,
    },

    textoRodapeCapa: {
        fontSize: 9,
        color: "#777777",
        marginBottom: 4,
    },

    // ==========================
    // CABEÇALHO
    // ==========================

    cabecalho: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E4E4",
        paddingBottom: 12,
        marginBottom: 25,
    },

    logoCabecalho: {
        width: 125,
        height: 36,
        objectFit: "contain",
    },

    cabecalhoDireita: {
        textAlign: "right",
    },

    cabecalhoTitulo: {
        fontSize: 8,
        color: "#4F772D",
        fontWeight: "bold",
        letterSpacing: 1,
    },

    cabecalhoSubtitulo: {
        fontSize: 7,
        color: "#888888",
        marginTop: 3,
    },

    // ==========================
    // TÍTULOS
    // ==========================

    tituloSecao: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#263238",
        marginBottom: 6,
    },

    descricaoSecao: {
        fontSize: 9,
        color: "#777777",
        lineHeight: 1.5,
        marginBottom: 24,
    },

    tituloBloco: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#263238",
        marginBottom: 12,
    },

    // ==========================
    // CARDS
    // ==========================

    cardsLinha: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    card: {
        width: "31.5%",
        borderWidth: 1,
        borderColor: "#E4E7E2",
        borderRadius: 7,
        padding: 14,
        minHeight: 76,
    },

    cardGrande: {
        width: "48.5%",
        borderWidth: 1,
        borderColor: "#E4E7E2",
        borderRadius: 7,
        padding: 14,
        minHeight: 76,
    },

    cardValor: {
        fontSize: 23,
        color: "#4F772D",
        fontWeight: "bold",
        marginBottom: 5,
    },

    cardLabel: {
        fontSize: 8,
        color: "#666666",
        lineHeight: 1.3,
    },

    // ==========================
    // GRÁFICOS
    // ==========================

    graficoContainer: {
        borderWidth: 1,
        borderColor: "#E7E7E7",
        borderRadius: 8,
        padding: 14,
        marginTop: 8,
    },

    grafico: {
        width: "100%",
        height: 275,
        objectFit: "contain",
    },

    graficoGrande: {
        width: "100%",
        height: 330,
        objectFit: "contain",
    },

    // ==========================
    // RANKING
    // ==========================

    ranking: {
        marginTop: 22,
    },

    rankingLinha: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        paddingVertical: 9,
    },

    rankingPosicao: {
        width: 35,
        fontSize: 11,
        fontWeight: "bold",
        color: "#4F772D",
    },

    rankingNome: {
        flex: 1,
        fontSize: 9,
        color: "#333333",
    },

    rankingValor: {
        width: 80,
        textAlign: "right",
        fontSize: 9,
        fontWeight: "bold",
        color: "#555555",
    },

    // ==========================
    // INFORMAÇÃO
    // ==========================

    informacao: {
        backgroundColor: "#F5F7F3",
        borderLeftWidth: 4,
        borderLeftColor: "#4F772D",
        padding: 13,
        marginTop: 20,
        borderRadius: 4,
    },

    informacaoTexto: {
        fontSize: 8,
        lineHeight: 1.5,
        color: "#555555",
    },

    // ==========================
    // RODAPÉ
    // ==========================

    rodape: {
        position: "absolute",
        left: 45,
        right: 45,
        bottom: 22,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#E4E4E4",
        paddingTop: 8,
    },

    rodapeTexto: {
        fontSize: 7,
        color: "#999999",
    },
});


function Cabecalho() {
    return (
        <View style={styles.cabecalho}>
            <Image
                src={logoCasagrande}
                style={styles.logoCabecalho}
            />

            <View style={styles.cabecalhoDireita}>
                <Text style={styles.cabecalhoTitulo}>
                    UNICAGEN
                </Text>

                <Text style={styles.cabecalhoSubtitulo}>
                    Relatório de métricas
                </Text>
            </View>
        </View>
    );
}


function Rodape() {
    return (
        <View style={styles.rodape} fixed>
            <Text style={styles.rodapeTexto}>
                UNICAGEN • Casagrande Engenharia
            </Text>

            <Text
                style={styles.rodapeTexto}
                render={({ pageNumber, totalPages }) =>
                    `Página ${pageNumber} de ${totalPages}`
                }
            />
        </View>
    );
}


export default function RelatorioMetricasPDF({
    acessaramNovaUnicagen = 0,
    atividadeUsuarios = [],
    treinamentos = [],
    graficoUsuarios = null,
    graficoTreinamentos = null,
    graficoEngajamento = null,
}) {

    const atividade = atividadeUsuarios?.[0] ?? {};

    const ativosHoje =
        atividade.ativos_hoje ?? 0;

    const ativosSemana =
        atividade.ativos_7_dias ?? 0;

    const ativosMes =
        atividade.ativos_30_dias ?? 0;

    const inativos =
        atividade.inativos_mais_30_dias ?? 0;


    const dataGeracao = new Date().toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );


    const treinamentosOrdenados = [...treinamentos]
        .sort(
            (a, b) =>
                (b.total_acessos ?? 0) -
                (a.total_acessos ?? 0)
        );


    return (
        <Document>

            {/* ===================================== */}
            {/* CAPA */}
            {/* ===================================== */}

            <Page size="A4" style={styles.capa}>

                <View style={styles.capaTopo}>
                    <Image
                        src={logoCasagrande}
                        style={styles.logo}
                    />
                </View>


                <View style={styles.capaCentro}>

                    <View style={styles.linhaVerde} />

                    <Text style={styles.unicagen}>
                        UNICAGEN
                    </Text>

                    <Text style={styles.tituloCapa}>
                        Relatório de Métricas
                    </Text>

                    <Text style={styles.subtituloCapa}>
                        Visão consolidada da utilização,
                        atividade e engajamento dos
                        colaboradores na plataforma.
                    </Text>

                </View>


                <View style={styles.capaRodape}>

                    <Text style={styles.textoRodapeCapa}>
                        Casagrande Engenharia
                    </Text>

                    <Text style={styles.textoRodapeCapa}>
                        Gerado em {dataGeracao}
                    </Text>

                    <Text style={styles.textoRodapeCapa}>
                        Documento para uso interno
                    </Text>

                </View>

            </Page>


            {/* ===================================== */}
            {/* RESUMO EXECUTIVO */}
            {/* ===================================== */}

            <Page size="A4" style={styles.pagina}>

                <Cabecalho />

                <Text style={styles.tituloSecao}>
                    Visão geral
                </Text>

                <Text style={styles.descricaoSecao}>
                    Indicadores consolidados de utilização
                    da plataforma UNICAGEN.
                </Text>


                <View style={styles.cardsLinha}>

                    <View style={styles.card}>
                        <Text style={styles.cardValor}>
                            {acessaramNovaUnicagen}
                        </Text>

                        <Text style={styles.cardLabel}>
                            Colaboradores que já acessaram
                            a nova UNICAGEN
                        </Text>
                    </View>


                    <View style={styles.card}>
                        <Text style={styles.cardValor}>
                            {ativosHoje}
                        </Text>

                        <Text style={styles.cardLabel}>
                            Usuários ativos hoje
                        </Text>
                    </View>


                    <View style={styles.card}>
                        <Text style={styles.cardValor}>
                            {ativosSemana}
                        </Text>

                        <Text style={styles.cardLabel}>
                            Usuários ativos nos últimos
                            7 dias
                        </Text>
                    </View>

                </View>


                <View style={styles.cardsLinha}>

                    <View style={styles.cardGrande}>
                        <Text style={styles.cardValor}>
                            {ativosMes}
                        </Text>

                        <Text style={styles.cardLabel}>
                            Usuários ativos nos últimos
                            30 dias
                        </Text>
                    </View>


                    <View style={styles.cardGrande}>
                        <Text style={styles.cardValor}>
                            {inativos}
                        </Text>

                        <Text style={styles.cardLabel}>
                            Usuários há mais de 30 dias
                            sem acessar
                        </Text>
                    </View>

                </View>


                <View style={{ marginTop: 24 }}>

                    <Text style={styles.tituloBloco}>
                        Status dos usuários
                    </Text>

                    {graficoUsuarios && (
                        <View style={styles.graficoContainer}>
                            <Image
                                src={graficoUsuarios}
                                style={styles.grafico}
                            />
                        </View>
                    )}

                </View>


                <View style={styles.informacao}>

                    <Text style={styles.informacaoTexto}>
                        Os indicadores apresentados neste
                        relatório são baseados nos registros
                        disponíveis na plataforma no momento
                        da geração do documento.
                    </Text>

                </View>


                <Rodape />

            </Page>


            {/* ===================================== */}
            {/* ENGAJAMENTO */}
            {/* ===================================== */}

            <Page size="A4" style={styles.pagina}>

                <Cabecalho />

                <Text style={styles.tituloSecao}>
                    Engajamento da plataforma
                </Text>

                <Text style={styles.descricaoSecao}>
                    Evolução diária da quantidade de
                    colaboradores ativos na UNICAGEN
                    durante o período analisado.
                </Text>


                <Text style={styles.tituloBloco}>
                    Engajamento diário
                </Text>


                {graficoEngajamento && (
                    <View style={styles.graficoContainer}>
                        <Image
                            src={graficoEngajamento}
                            style={styles.graficoGrande}
                        />
                    </View>
                )}


                <Rodape />

            </Page>


            {/* ===================================== */}
            {/* TREINAMENTOS */}
            {/* ===================================== */}

            <Page size="A4" style={styles.pagina}>

                <Cabecalho />

                <Text style={styles.tituloSecao}>
                    Treinamentos
                </Text>

                <Text style={styles.descricaoSecao}>
                    Visão dos treinamentos com maior
                    quantidade de acessos na plataforma.
                </Text>


                <Text style={styles.tituloBloco}>
                    Treinamentos mais acessados
                </Text>


                {graficoTreinamentos && (
                    <View style={styles.graficoContainer}>
                        <Image
                            src={graficoTreinamentos}
                            style={styles.grafico}
                        />
                    </View>
                )}


                <View style={styles.ranking}>

                    <Text style={styles.tituloBloco}>
                        Ranking de acessos
                    </Text>


                    {treinamentosOrdenados.map(
                        (treinamento, index) => (

                            <View
                                key={`${treinamento.titulo}-${index}`}
                                style={styles.rankingLinha}
                            >

                                <Text style={styles.rankingPosicao}>
                                    {index + 1}º
                                </Text>

                                <Text style={styles.rankingNome}>
                                    {treinamento.titulo}
                                </Text>

                                <Text style={styles.rankingValor}>
                                    {treinamento.total_acessos} acessos
                                </Text>

                            </View>

                        )
                    )}

                </View>


                <Rodape />

            </Page>

        </Document>
    );
}