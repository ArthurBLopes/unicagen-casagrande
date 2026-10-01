import { useEffect, useState } from "react";
import { listarProgressoVideo } from "../../services/metrics/progressoVideoService";

export function useEngajamentoVideos() {
    const [engajamentoVideos, setEngajamentoVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [erroCarregamento, setErroCarregamento] = useState(false);

    useEffect(() => {
        const fetchEngajamentoVideos = async () => {
            setLoadingVideos(true);
            setErroCarregamento(false);
            try {
                const progresso = await listarProgressoVideo();
                setEngajamentoVideos(agruparPorTreinamento(progresso));
            } catch (error) {
                setErroCarregamento(true);
            } finally {
                setLoadingVideos(false);
            }
        };

        fetchEngajamentoVideos();
    }, []);

    return { engajamentoVideos, loadingVideos, erroCarregamento };
}

function agruparPorTreinamento(progresso) {
    const grupos = {};

    progresso.forEach((registro) => {
        const id = registro.id_treinamento;

        if (!grupos[id]) {
            grupos[id] = {
                id: id,
                titulo: registro.treinamentos?.titulo ?? "Não encontrado",
                iniciaram: 0,
                concluiram: 0
            };
        }

        grupos[id].iniciaram += 1;
        if (registro.concluido) grupos[id].concluiram += 1;
    });

    return Object.values(grupos);
}
