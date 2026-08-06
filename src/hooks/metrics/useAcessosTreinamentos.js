import { useEffect, useState } from "react";
import { buscarAcessosTreinamento, listarAcessosView } from '../../services/metrics/acessosTreinamentosService'

export function useAcessosTreinamentos() {
    const [acessosTreinamentos, setAcessosTreinamentos] = useState([])
    const [loadingTreinamentos, setLoadingTreinamentos] = useState(false);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        const fetchAcessos = async () => {
            setLoadingTreinamentos(true);
            setErroCarregamento(false);
            try {
                const data = await listarAcessosView();
                setAcessosTreinamentos(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoadingTreinamentos(false);
            }
        };

        fetchAcessos();
    }, []);

    return { acessosTreinamentos, loadingTreinamentos };
}