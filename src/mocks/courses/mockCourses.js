// mockCursos.js
// Estrutura pensada para bater 1:1 com o que viria de uma tabela `cursos` no Supabase.
//
// Campos usados no CourseCard: trilha, imagem, titulo, descricao, tags, dataPublicacao
// Campos usados no CoursePage: titulo, descricao, publicado, corpo, categoria, linkConteudo, linkMaterial
// Campos extras para facilitar a busca/roteamento: id, trilhaId, trilhaSlug
//
// "imagem" é só uma URL (string). Funciona exatamente como funcionaria vindo do Supabase:
// seja um link do Supabase Storage, seja o thumbnail do próprio Youtube
// (https://img.youtube.com/vi/ID_DO_VIDEO/hqdefault.jpg), seja um placeholder qualquer.
// O <img src={curso.imagem} /> não muda nada quando trocar pra dado real.

import ap_casagrande from "../../assets/imagens_temp/ap_casagrande.jpeg";
import fluxo_desenvolvimento from "../../assets/imagens_temp/dev_de_projetos.png";
import fundamentos_oaes from "../../assets/imagens_temp/fund_obras_arte.png";
import normas from "../../assets/imagens_temp/introducao_normas_eng.png";
import planilhas from "../../assets/imagens_temp/planilhas_protensao.png";
import sap2000vba from "../../assets/imagens_temp/sap_vba.png";
import sap2000avancado from "../../assets/imagens_temp/sap_2000_avançado.png";
import bim_tandem from "../../assets/imagens_temp/bim_autodesk.png";
import bim_collaborate from "../../assets/imagens_temp/bim_cob_pro.png";

export const cursos = [
    {
        id: 1,
        trilhaId: 1,
        trilhaSlug: "onboarding",
        trilha: "Onboarding",
        categoria: "Onboarding",
        titulo: "Apresentação Casagrande Engenharia",
        descricao:
            "Apresentação institucional da Casagrande Engenharia, mostrando a empresa, sua cultura, equipe e principais projetos ao longo dos anos.",
        corpo:
            "Vídeo institucional para novos colaboradores conhecerem a história, os valores e a estrutura da Casagrande Engenharia antes de iniciar as trilhas técnicas.",
        imagem: ap_casagrande,
        tags: ["Videoaulas"],
        dataPublicacao: "há 3 meses",
        publicado: "30 de março de 2026",
        linkConteudo: "https://youtu.be/36-3N1c4K0M?si=RT05PTNUn2KL5-GA",
        linkMaterial: "https://drive.google.com/file/d/1nBd3_54aLYMmEoFthkNk3GPt3pKYIeN8/view?usp=sharing",
    },
    {
        id: 2,
        trilhaId: 1,
        trilhaSlug: "onboarding",
        trilha: "Onboarding",
        categoria: "Onboarding",
        titulo: "Fluxo de Desenvolvimento de Projetos",
        descricao:
            "Esta aula apresenta o processo de desenvolvimento de projetos da CAGEN, estruturando os fluxos, etapas e responsabilidades com foco na padronização, melhoria da qualidade das entregas e aumento da eficiência entre as equipes.",
        corpo: "Visão geral do fluxo ponta a ponta de um projeto, desde a entrada do escopo até a entrega final.",
        imagem: fluxo_desenvolvimento,
        tags: ["Videoaulas"],
        dataPublicacao: "há 3 meses",
        publicado: "28 de março de 2026",
        linkConteudo: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
        linkMaterial: "https://example.com/material/fluxo-projetos.pdf",
    },
    {
        id: 3,
        trilhaId: 1,
        trilhaSlug: "onboarding",
        trilha: "Onboarding",
        categoria: "Onboarding",
        titulo: "Fundamentos do Projeto de Obras de Arte Especiais (OAEs)",
        descricao:
            "A aula apresenta uma introdução ao projeto de estruturas de pontes (OAEs - Obras de Arte Especiais), abordando conceitos fundamentais, tipos de estruturas e o processo completo de desenvolvimento de um projeto estrutural.",
        corpo: "Conceitos introdutórios de pontes e viadutos, tipos de seções e etapas de projeto.",
        imagem: fundamentos_oaes,
        tags: ["Youtube", "Videoaulas"],
        dataPublicacao: "há 3 meses",
        publicado: "25 de março de 2026",
        linkConteudo: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        linkMaterial: null,
    },
    {
        id: 4,
        trilhaId: 3,
        trilhaSlug: "evolucao-profissional",
        trilha: "Evolução Profissional",
        categoria: "Evolução Profissional",
        titulo: "Treinamento Planilhas de Protensão",
        descricao:
            "Aprenda a utilizar planilhas de protensão para dimensionamento estrutural neste treinamento técnico detalhado.",
        corpo:
            "Treinamento técnico conduzido sobre o uso de planilhas de protensão, com foco na aplicação prática dessas ferramentas para o cálculo e dimensionamento de estruturas protendidas.",
        imagem: planilhas,
        tags: ["Videoaulas"],
        dataPublicacao: "há 8 dias",
        publicado: "22 de junho de 2026",
        linkConteudo: "https://example.com/cursos/planilhas-protensao",
        linkMaterial: "https://example.com/material/planilha-protensao.xlsx",
    },
    {
        id: 5,
        trilhaId: 4,
        trilhaSlug: "excelencia-tecnica",
        trilha: "Excelência Técnica",
        categoria: "Excelência Técnica",
        titulo: "Dominando a API do SAP2000 com VBA na Structural",
        descricao:
            "Aprenda a automatizar projetos estruturais utilizando VBA para manipular o SAP2000, aumentando sua produtividade.",
        corpo: "Curso prático de automação via VBA, cobrindo desde conceitos básicos de API até rotinas completas de automação de modelos.",
        imagem: sap2000vba,
        tags: ["Videoaulas"],
        dataPublicacao: "há 5 meses",
        publicado: "30 de janeiro de 2026",
        linkConteudo: "https://example.com/cursos/sap2000-vba",
        linkMaterial: null,
    },
    {
        id: 6,
        trilhaId: 4,
        trilhaSlug: "excelencia-tecnica",
        trilha: "Excelência Técnica",
        categoria: "Excelência Técnica",
        titulo: "Curso SAP2000 Avançado: Domine a Análise Estrutural",
        descricao:
            "Aprenda técnicas avançadas de modelagem, análise não-linear e dimensionamento estrutural com o SAP2000.",
        corpo: "Aprofundamento em análises não-lineares, dinâmicas e modelos complexos no SAP2000.",
        imagem: sap2000avancado,
        tags: ["Videoaulas"],
        dataPublicacao: "há 5 meses",
        publicado: "28 de janeiro de 2026",
        linkConteudo: "https://example.com/cursos/sap2000-avancado",
        linkMaterial: null,
    },
    {
        id: 7,
        trilhaId: 5,
        trilhaSlug: "bim",
        trilha: "BIM",
        categoria: "BIM",
        titulo: "Autodesk Tandem: Transformando o BIM em Gêmeos Digitais",
        descricao:
            "Descubra como o Autodesk Tandem utiliza dados BIM para criar réplicas digitais inteligentes, otimizando a gestão de ativos.",
        corpo: "Webinar sobre digital twins aplicados à engenharia, com exemplos de uso do Autodesk Tandem.",
        imagem: bim_tandem,
        tags: ["Webinar"],
        dataPublicacao: "há 2 meses",
        publicado: "15 de abril de 2026",
        linkConteudo: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
        linkMaterial: null,
    },
    {
        id: 8,
        trilhaId: 5,
        trilhaSlug: "bim",
        trilha: "BIM",
        categoria: "BIM",
        titulo: "BIM Collaborate Pro: Conecte equipes e otimize fluxos de trabalho",
        descricao:
            "Participe do webinar da Autodesk e descubra como o BIM Collaborate Pro transforma a colaboração em projetos de infraestrutura.",
        corpo: "Demonstração prática do BIM Collaborate Pro em projetos de infraestrutura e gestão pública.",
        imagem: bim_collaborate,
        tags: ["Webinar"],
        dataPublicacao: "há 2 meses",
        publicado: "10 de abril de 2026",
        linkConteudo: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        linkMaterial: "https://example.com/material/bim-collaborate-pro.pdf",
    },
    {
        id: 9,
        trilhaId: 2,
        trilhaSlug: "formacao-inicial",
        trilha: "Formação Inicial",
        categoria: "Formação Inicial",
        titulo: "Introdução às Normas Técnicas de Engenharia",
        descricao:
            "Panorama das principais normas técnicas (ABNT) utilizadas no dia a dia dos projetos estruturais da empresa.",
        corpo: "Aula introdutória sobre as normas mais utilizadas no setor e como consultá-las no fluxo de projeto.",
        imagem: normas,
        tags: ["Videoaulas"],
        dataPublicacao: "há 1 mês",
        publicado: "20 de maio de 2026",
        linkConteudo: "https://example.com/cursos/normas-tecnicas",
        linkMaterial: null,
    },
];

// Helpers simples e síncronos — sem fetch, porque é tudo local.
// Quando trocar pro Supabase, essas duas funções viram chamadas async
// (ex: supabase.from('cursos').select('*').eq('trilhaId', trilhaId)),
// mas quem usa o resultado nos componentes não precisa mudar quase nada.
export function getCursosPorTrilha(trilhaId) {
    return cursos.filter((curso) => curso.trilhaId === trilhaId);
}

export function getCursoPorId(id) {
    return cursos.find((curso) => curso.id === Number(id));
}