import { useEffect, useState } from "react";
import { listarProgressoVideoPorUsuario } from "../../services/metrics/progressoVideoService";
import { listarAcessosPorUsuario } from "../../services/metrics/acessosTreinamentosService";

export function useTreinamentosVistosPorUsuario(id_usuario) {
    const [treinamentosVistos, setTreinamentosVistos] = useState([]);
    const [loadingTreinamentosVistos, setLoadingTreinamentosVistos] = useState(false);

    useEffect(() => {
        if (!id_usuario) {
            setTreinamentosVistos([]);
            return;
        }

        const fetchTreinamentosVistos = async () => {
            setLoadingTreinamentosVistos(true);

            const [progressoVideo, acessosConteudo] = await Promise.all([
                listarProgressoVideoPorUsuario(id_usuario),
                listarAcessosPorUsuario(id_usuario)
            ]);

            const videos = progressoVideo.map((registro) => ({
                id: `video-${registro.id_treinamento}`,
                titulo: registro.treinamentos?.titulo ?? "Não encontrado",
                tipo: "Vídeo",
                status: registro.concluido ? "Concluído" : "Em andamento",
                detalhe: registro.duracao_segundos
                    ? `${Math.round((registro.segundos_assistidos / registro.duracao_segundos) * 100)}% assistido`
                    : "-"
            }));

            // vídeo já registra acesso ao iniciar, então não repete o mesmo curso como conteúdo externo
            const idsComVideo = new Set(progressoVideo.map((registro) => registro.id_treinamento));

            const conteudos = [];
            const idsJaListados = new Set();

            for (const registro of acessosConteudo) {
                if (idsComVideo.has(registro.id_treinamento) || idsJaListados.has(registro.id_treinamento)) continue;

                idsJaListados.add(registro.id_treinamento);
                conteudos.push({
                    id: `conteudo-${registro.id_treinamento}`,
                    titulo: registro.treinamentos?.titulo ?? "Não encontrado",
                    tipo: "Conteúdo externo",
                    status: "Acessado",
                    detalhe: "-"
                });
            }

            setTreinamentosVistos([...videos, ...conteudos]);
            setLoadingTreinamentosVistos(false);
        };

        fetchTreinamentosVistos();
    }, [id_usuario]);

    return { treinamentosVistos, loadingTreinamentosVistos };
}
