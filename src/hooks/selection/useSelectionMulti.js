import { useState } from "react";

export function useSelectionMulti(itensIniciais = []) {
    const [selecionados, setSelecionados] = useState(itensIniciais);

    function selecionar(item) {
        setSelecionados((atual) => {
            if (atual.some((i) => i.id === item.id)) {
                return atual;
            }
            return [...atual, item];
        });
    }

    function remover(item) {
        setSelecionados((atual) => atual.filter((i) => i.id !== item.id));
    }

    function limpar() {
        setSelecionados([]);
    }

    function definir(itens) {
        setSelecionados(itens);
    }

    return { selecionados, selecionar, remover, limpar, definir };
}