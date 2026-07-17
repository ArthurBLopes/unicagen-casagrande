// mockTrilhas.js
// Estrutura pensada para bater 1:1 com o que viria de uma tabela `trilhas` no Supabase.
// slug é usado nas rotas (/trilhas/:slug) e id é usado para relacionar com os cursos (curso.trilhaId).

export const trilhas = [
    {
        id: 1,
        slug: "onboarding",
        titulo: "Onboarding",
        descricao: "Trilha de integração e fundamentos da CAGEN",
        cor: "#9CCB3B",
    },
    {
        id: 2,
        slug: "formacao-inicial",
        titulo: "Formação Inicial",
        descricao: "Trilha de habilidades essenciais para início na CAGEN",
        cor: "#2F6B3A",
    },
    {
        id: 3,
        slug: "evolucao-profissional",
        titulo: "Evolução Profissional",
        descricao: "Trilha de desenvolvimento de habilidades ao longo da jornada",
        cor: "#2F6B3A",
    },
    {
        id: 4,
        slug: "excelencia-tecnica",
        titulo: "Excelência Técnica",
        descricao: "Trilha de habilidades técnicas avançadas",
        cor: "#1F4D2C",
    },
    {
        id: 5,
        slug: "bim",
        titulo: "BIM",
        descricao: "Trilha de habilidades e aplicações em BIM",
        cor: "#1B3A5C",
    },
];