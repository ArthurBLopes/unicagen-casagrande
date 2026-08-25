import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet
} from "@react-pdf/renderer";

import logoCasagrande from "../../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Grafite.png";


const VERDE = "#4F772D";
const GRAFITE = "#263238";
const CINZA = "#777777";
const BORDA = "#E4E7E2";
const FUNDO_SUAVE = "#F5F7F3";

const A4_LARGURA = 595.28;
const A4_ALTURA = 841.89;


const styles = StyleSheet.create({

    // =========================================================
    // PÁGINA PADRÃO
    // =========================================================

    pagina: {
        width: A4_LARGURA,
        height: A4_ALTURA,
        minHeight: A4_ALTURA,
        paddingTop: 40,
        paddingBottom: 48,
        paddingHorizontal: 45,
        fontFamily: "Helvetica",
        backgroundColor: "#FFFFFF",
        color: "#303030",
    },


    // =========================================================
    // CAPA
    // =========================================================

    capa: {
        width: A4_LARGURA,
        height: A4_ALTURA,
        minHeight: A4_ALTURA,
        paddingHorizontal: 55,
        paddingTop: 55,
        paddingBottom: 50,
        fontFamily: "Helvetica",
        backgroundColor: "#FFFFFF",
        color: "#303030",
    },

    capaTopo: {
        alignItems: "flex-start",
    },

    logo: {
        width: 225,
        height: 70,
        objectFit: "contain",
    },

    capaCentro: {
        marginTop: 185,
    },

    linhaVerde: {
        width: 55,
        height: 5,
        backgroundColor: VERDE,
        marginBottom: 22,
    },

    unicagen: {
        fontSize: 15,
        color: VERDE,
        fontWeight: "bold",
        letterSpacing: 3,
        marginBottom: 12,
    },

    tituloCapa: {
        fontSize: 31,
        fontWeight: "bold",
        color: GRAFITE,
        lineHeight: 1.2,
        marginBottom: 12,
    },

    subtituloCapa: {
        fontSize: 12,
        color: "#6B6B6B",
        lineHeight: 1.5,
        maxWidth: 390,
    },

    capaRodape: {
        position: "absolute",
        left: 55,
        right: 55,
        bottom: 52,

        borderTopWidth: 1,
        borderTopColor: "#D9D9D9",

        paddingTop: 15,
    },

    textoRodapeCapa: {
        fontSize: 9,
        color: "#777777",
        marginBottom: 4,
    },


    // =========================================================
    // CABEÇALHO
    // =========================================================

    cabecalho: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: "#E4E4E4",

        paddingBottom: 10,
        marginBottom: 22,
    },

    logoCabecalho: {
        width: 125,
        height: 34,
        objectFit: "contain",
    },

    cabecalhoDireita: {
        textAlign: "right",
    },

    cabecalhoTitulo: {
        fontSize: 8,
        color: VERDE,
        fontWeight: "bold",
        letterSpacing: 1,
    },

    cabecalhoSubtitulo: {
        fontSize: 7,
        color: "#888888",
        marginTop: 3,
    },


    // =========================================================
    // TÍTULOS
    // =========================================================

    tituloSecao: {
        fontSize: 22,
        fontWeight: "bold",
        color: GRAFITE,
        marginBottom: 5,
    },

    descricaoSecao: {
        fontSize: 9,
        color: CINZA,
        lineHeight: 1.4,
        marginBottom: 19,
    },

    tituloBloco: {
        fontSize: 13,
        fontWeight: "bold",
        color: GRAFITE,
        marginBottom: 10,
    },


    // =========================================================
    // CARDS - VISÃO GERAL
    // =========================================================

    cardsLinha: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    card: {
        width: "31.5%",

        borderWidth: 1,
        borderColor: BORDA,
        borderRadius: 7,

        padding: 12,
        minHeight: 68,
    },

    cardGrande: {
        width: "48.7%",

        borderWidth: 1,
        borderColor: BORDA,
        borderRadius: 7,

        padding: 12,
        minHeight: 68,
    },

    cardValor: {
        fontSize: 22,
        color: VERDE,
        fontWeight: "bold",
        marginBottom: 4,
    },

    cardLabel: {
        fontSize: 7.7,
        color: "#666666",
        lineHeight: 1.3,
    },


    // =========================================================
    // GRÁFICOS
    // =========================================================

    blocoGraficoResumo: {
        marginTop: 17,
    },

    graficoContainer: {
        borderWidth: 1,
        borderColor: "#E7E7E7",
        borderRadius: 8,

        padding: 12,
        marginTop: 6,
    },

    graficoResumo: {
        width: "100%",
        height: 205,
        objectFit: "contain",
    },

    graficoEngajamento: {
        width: "100%",
        height: 290,
        objectFit: "contain",
    },

    graficoTreinamentos: {
        width: "100%",
        height: 225,
        objectFit: "contain",
    },


    // =========================================================
    // INFORMAÇÃO
    // =========================================================

    informacao: {
        backgroundColor: FUNDO_SUAVE,

        borderLeftWidth: 4,
        borderLeftColor: VERDE,
        borderRadius: 4,

        padding: 10,
        marginTop: 13,
    },

    informacaoTexto: {
        fontSize: 7.5,
        lineHeight: 1.4,
        color: "#555555",
    },


    // =========================================================
    // ENGAJAMENTO - INDICADORES
    // =========================================================

    indicadoresEngajamento: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    indicadorEngajamento: {
        width: "31.5%",

        backgroundColor: FUNDO_SUAVE,

        borderWidth: 1,
        borderColor: BORDA,
        borderRadius: 7,

        paddingVertical: 14,
        paddingHorizontal: 12,

        minHeight: 70,
    },

    indicadorValor: {
        fontSize: 21,
        color: VERDE,
        fontWeight: "bold",
        marginBottom: 5,
    },

    indicadorLabel: {
        fontSize: 8,
        color: "#666666",
        lineHeight: 1.3,
    },

    observacaoEngajamento: {
        marginTop: 17,
        paddingTop: 12,

        borderTopWidth: 1,
        borderTopColor: "#EEEEEE",
    },

    observacaoTitulo: {
        fontSize: 9,
        fontWeight: "bold",
        color: GRAFITE,
        marginBottom: 5,
    },

    observacaoTexto: {
        fontSize: 8,
        color: "#6D6D6D",
        lineHeight: 1.5,
    },


    // =========================================================
    // RANKING
    // =========================================================

    ranking: {
        marginTop: 18,
    },

    rankingLinha: {
        flexDirection: "row",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",

        paddingVertical: 8,
    },

    rankingPosicao: {
        width: 38,
        fontSize: 11,
        fontWeight: "bold",
        color: VERDE,
    },

    rankingNome: {
        flex: 1,
        fontSize: 9,
        color: "#333333",
    },

    rankingValor: {
        width: 85,
        textAlign: "right",
        fontSize: 9,
        fontWeight: "bold",
        color: "#555555",
    },


    // =========================================================
    // RODAPÉ
    // =========================================================

    rodape: {
        position: "absolute",

        left: 45,
        right: 45,
        bottom: 20,

        flexDirection: "row",
        justifyContent: "space-between",

        borderTopWidth: 1,
        borderTopColor: "#E4E4E4",

        paddingTop: 7,
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

    engajamentoPlataforma = [],

    treinamentos = [],

    graficoUsuarios = null,

    graficoTreinamentos = null,

    graficoEngajamento = null,

}) {


    // =========================================================
    // MÉTRICAS DOS USUÁRIOS
    // =========================================================

    const atividade = atividadeUsuarios?.[0] ?? {};


    const ativosHoje =
        atividade.ativos_hoje ?? 0;


    const ativosSemana =
        atividade.ativos_7_dias ?? 0;


    const ativosMes =
        atividade.ativos_30_dias ?? 0;


    const inativos =
        atividade.inativos_mais_30_dias ?? 0;



    // =========================================================
    // DATA DO RELATÓRIO
    // =========================================================

    const dataGeracao = new Date().toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );



    // =========================================================
    // TREINAMENTOS
    // =========================================================

    const treinamentosOrdenados =
        [...treinamentos].sort(
            (a, b) =>
                (b.total_acessos ?? 0) -
                (a.total_acessos ?? 0)
        );



    // =========================================================
    // MÉTRICAS DERIVADAS DO ENGAJAMENTO
    // =========================================================

    const valoresEngajamento =
        engajamentoPlataforma.map(
            (item) =>
                Number(item.usuarios_ativos) || 0
        );


    const picoUsuarios =
        valoresEngajamento.length > 0
            ? Math.max(...valoresEngajamento)
            : 0;


    const totalUsuariosAtivos =
        valoresEngajamento.reduce(
            (total, valor) =>
                total + valor,
            0
        );


    const mediaDiaria =
        valoresEngajamento.length > 0
            ? totalUsuariosAtivos /
            valoresEngajamento.length
            : 0;


    const diasComAtividade =
        valoresEngajamento.filter(
            (valor) => valor > 0
        ).length;



    // =========================================================
    // DOCUMENTO
    // =========================================================

    return (

        <Document>


            {/* ================================================= */}
            {/* PÁGINA 1 - CAPA */}
            {/* ================================================= */}

            <Page
    size={{ width: A4_LARGURA, height: A4_ALTURA }}
    style={styles.capa}
>

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



            {/* ================================================= */}
            {/* PÁGINA 2 - VISÃO GERAL */}
            {/* ================================================= */}

            <Page
    size={{ width: A4_LARGURA, height: A4_ALTURA }}
    style={styles.pagina}
>

                <Cabecalho />


                <Text style={styles.tituloSecao}>
                    Visão geral
                </Text>


                <Text style={styles.descricaoSecao}>
                    Indicadores consolidados de utilização
                    da plataforma UNICAGEN.
                </Text>



                {/* PRIMEIRA LINHA */}


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



                {/* SEGUNDA LINHA */}


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



                {/* STATUS DOS USUÁRIOS */}


                <View style={styles.blocoGraficoResumo}>

                    <Text style={styles.tituloBloco}>
                        Status dos usuários
                    </Text>


                    {graficoUsuarios && (

                        <View style={styles.graficoContainer}>

                            <Image
                                src={graficoUsuarios}
                                style={styles.graficoResumo}
                            />

                        </View>

                    )}

                </View>



                {/* OBSERVAÇÃO */}


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



            {/* ================================================= */}
            {/* PÁGINA 3 - ENGAJAMENTO */}
            {/* ================================================= */}

            <Page
                size={{ width: A4_LARGURA, height: A4_ALTURA }}
                style={styles.pagina}
            >

                <Cabecalho />


                <Text style={styles.tituloSecao}>
                    Engajamento da plataforma
                </Text>


                <Text style={styles.descricaoSecao}>
                    Evolução diária da quantidade de
                    colaboradores ativos na UNICAGEN
                    durante os últimos 30 dias.
                </Text>



                <Text style={styles.tituloBloco}>
                    Engajamento diário
                </Text>


                {graficoEngajamento && (

                    <View style={styles.graficoContainer}>

                        <Image
                            src={graficoEngajamento}
                            style={styles.graficoEngajamento}
                        />

                    </View>

                )}



                {/* INDICADORES */}


                <View style={styles.indicadoresEngajamento}>


                    <View style={styles.indicadorEngajamento}>

                        <Text style={styles.indicadorValor}>
                            {picoUsuarios}
                        </Text>

                        <Text style={styles.indicadorLabel}>
                            Pico de usuários ativos em um dia
                        </Text>

                    </View>



                    <View style={styles.indicadorEngajamento}>

                        <Text style={styles.indicadorValor}>
                            {mediaDiaria.toFixed(1)}
                        </Text>

                        <Text style={styles.indicadorLabel}>
                            Média diária de usuários ativos
                        </Text>

                    </View>



                    <View style={styles.indicadorEngajamento}>

                        <Text style={styles.indicadorValor}>
                            {diasComAtividade}
                        </Text>

                        <Text style={styles.indicadorLabel}>
                            Dias com atividade registrada
                        </Text>

                    </View>


                </View>



                <View style={styles.observacaoEngajamento}>

                    <Text style={styles.observacaoTitulo}>
                        Sobre o indicador
                    </Text>

                    <Text style={styles.observacaoTexto}>
                        O gráfico apresenta a quantidade de
                        colaboradores distintos que utilizaram
                        a plataforma em cada dia do período
                        analisado.
                    </Text>

                </View>


                <Rodape />

            </Page>



            {/* ================================================= */}
            {/* PÁGINA 4 - TREINAMENTOS */}
            {/* ================================================= */}

            <Page
                size={{ width: A4_LARGURA, height: A4_ALTURA }}
                style={styles.pagina}
            >

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
                            style={styles.graficoTreinamentos}
                        />

                    </View>

                )}



                {/* RANKING */}


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