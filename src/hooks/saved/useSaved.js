import { listarSalvos, inserirSalvo, removerSalvo, listarTreinamentosSalvos } from "../../services/salvosService";
import { useEffect, useState } from "react";

export function useSaved(id_usuario) {
    const [salvos, setSalvos] = useState([])
    const [treinamentosSalvos, setTreinamentosSalvos] = useState([])
    const [loading, setLoading] = useState(false)
    const [carregandoInicial, setCarregandoInicial] = useState(true)

    const estaSalvo = (id_treinamento) => {
        if (!id_treinamento) return false
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
            if (!id_usuario) {
                setCarregandoInicial(false)
                return
            }
            
            setCarregandoInicial(true)
            const dados = await listarSalvos(id_usuario);
            setSalvos(dados)
            setCarregandoInicial(false)
        }
        buscar()
    }, [id_usuario])

    useEffect(() => {
        async function buscarTreinamentos() {
            if (!id_usuario) {
                setCarregandoInicial(false)
                return
            }
            
            setCarregandoInicial(true)
            const dados = await listarTreinamentosSalvos(id_usuario);
            setTreinamentosSalvos(dados)
            setCarregandoInicial(false)
        }
        buscarTreinamentos()
    }, [id_usuario])

    return { salvos, estaSalvo, toggleSalvo, loading, carregandoInicial, treinamentosSalvos }
}