import { useState } from "react";

export function useGerenciadorCrud({inserir, atualizar, remover, onSucesso}) {
    const [itemEditando, setItemEditando] = useState(null);
    const [formAberto, setFormAberto] = useState(false);
    const [enviando, setEnviando] = useState(false);

    function abrirInsercao() {
        setItemEditando(null);
        setFormAberto(true);
    }

    function abrirEdicao(item) {
        setItemEditando(item);
        setFormAberto(true);
    }

    function fechar() {
        setEnviando(false);
        setFormAberto(false);
    }

    async function salvar(dado) {
        setEnviando(true)
        
        if (!dado) {
            setEnviando(false)
            return null
        }

        const sucesso = itemEditando ? await atualizar(dado) : await inserir(dado);
        setEnviando(false)

        if (sucesso) {
            fechar()
        }

        return sucesso;
    }

    async function excluir(dado) {
        const confirmado = confirm(`Tem certeza que deseja apagar este item: ${dado?.titulo} ?`);

        if (!confirmado) {
            return null;
        }

        const sucesso = await remover(dado);
        if (sucesso) fechar();
    }

    return { fechar, salvar, excluir, itemEditando, formAberto, enviando };
}