import { registrarAcessoPlataforma, buscarAcessoUsuario, listarAcessosView, listarAcessos } from "../../services/metrics/acessosPlataformaService";
import { useEffect, useState } from "react";

export function useAcessos(id_usuario) {
    const [acessos, setAcessos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erroCarregamento, setErroCarregamento] = useState(false);

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

    return { acessos, loading, erroCarregamento };
}