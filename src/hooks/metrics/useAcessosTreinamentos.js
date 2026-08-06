import { useEffect, useState } from "react";
import { buscarAcessosTreinamento, listarAcessosView } from '../../services/metrics/acessosTreinamentosService'

export default function useAcessosTreinamentos() {
    const [acessos, setAcessos] = useState()

    useEffect(() => {
        const fetchAcessos = async () => {
            setLoading(true);
            setErroCarregamento(false);
            try {
                const data = await listarAcessosView();
                setAcessos(data);
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAcessos();
    }, []);

    return { acessos };
}