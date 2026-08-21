import { useMemo, useState } from "react";

// Remove acentuação para permitir pesquisa "acento-insensível".
function normalizar(texto) {
    return texto.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Pesquisa (por campo de texto) + ordenação (alfabética ou por data) reutilizável nas telas de gerenciamento.
export function useListaOrdenada(itens, { campoPesquisa = "titulo", campoAlfabetico = campoPesquisa, campoData = "data_publicacao", formatarItem } = {}) {
    const [pesquisa, setPesquisa] = useState("");
    const [opcaoOrdenar, setOpcaoOrdenar] = useState(true);

    function handleOrdenacao() {
        setOpcaoOrdenar((estadoAtual) => !estadoAtual);
    }

    const itensFiltrados = useMemo(() => (
        itens.filter((item) => normalizar(item[campoPesquisa] ?? "").includes(normalizar(pesquisa)))
    ), [itens, pesquisa, campoPesquisa]);

    const itensOrdenados = useMemo(() => {
        const ordenados = opcaoOrdenar
            ? [...itensFiltrados].sort((a, b) => (a[campoAlfabetico] ?? "").localeCompare(b[campoAlfabetico] ?? ""))
            : [...itensFiltrados].sort((a, b) => (a[campoData] ?? "").localeCompare(b[campoData] ?? "")).reverse();

        return formatarItem ? ordenados.map(formatarItem) : ordenados;
    }, [itensFiltrados, opcaoOrdenar, campoAlfabetico, campoData, formatarItem]);

    return { pesquisa, setPesquisa, opcaoOrdenar, handleOrdenacao, itensFiltrados, itensOrdenados };
}
