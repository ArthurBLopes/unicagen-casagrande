import { listarSalvos, inserirSalvo, removerSalvo } from "../../services/salvosService";
import { useEffect, useState } from "react";

export function useSaved(id_usuario) {
    const [salvos, setSalvos] = useState([])
    const [loading, setLoading] = useState(false)

    const estaSalvo = (id_treinamento) => {
        return salvos.some(salvo => salvo.id_treinamento === id_treinamento)
    }

    const toggleSalvo = async (id_treinamento) => {
        setLoading(true)
        try {
            if (estaSalvo(id_treinamento)) {
                const salvoRemovido = salvos.find(salvo => salvo.id_treinamento === id_treinamento);
                if (salvoRemovido) {
                    await removerSalvo(id_usuario, salvoRemovido.id_treinamento);
                }
                setSalvos(salvos.filter(salvo => salvo.id_treinamento !== id_treinamento))
            } else {
                const novo = await inserirSalvo({id_usuario, id_treinamento});
                setSalvos([...salvos, novo])
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function buscar() {
            const dados = await listarSalvos(id_usuario);
            setSalvos(dados)
        }
        buscar()
    }, [id_usuario])

    return { salvos, estaSalvo, toggleSalvo, loading }
}