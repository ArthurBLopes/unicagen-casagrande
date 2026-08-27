import { useRef } from "react";
import { registrarProgressoVideo } from "../../services/metrics/progressoVideoService";
import { registrarAcessoTreinamento } from "../../services/metrics/acessosTreinamentosService";

const PERCENTUAL_CONCLUSAO = 0.9;

export function useProgressoVideoTreinamento(id_usuario, id_treinamento) {
    const concluidoRef = useRef(false);

    const onStart = (duracao) => {
        if (!id_usuario || !id_treinamento) return;
        concluidoRef.current = false;
        registrarAcessoTreinamento(id_usuario, id_treinamento);
        registrarProgressoVideo(id_usuario, id_treinamento, { duracao_segundos: Math.floor(duracao) });
    };

    const onProgress = (segundos, duracao) => {
        if (!id_usuario || !id_treinamento || concluidoRef.current) return;

        const concluido = duracao > 0 && segundos / duracao >= PERCENTUAL_CONCLUSAO;
        if (concluido) concluidoRef.current = true;

        registrarProgressoVideo(id_usuario, id_treinamento, {
            segundos_assistidos: Math.floor(segundos),
            duracao_segundos: Math.floor(duracao),
            ...(concluido && { concluido: true, concluido_em: new Date().toISOString() })
        });
    };

    const onEnded = (duracao) => {
        if (!id_usuario || !id_treinamento) return;
        concluidoRef.current = true;
        registrarProgressoVideo(id_usuario, id_treinamento, {
            segundos_assistidos: Math.floor(duracao),
            duracao_segundos: Math.floor(duracao),
            concluido: true,
            concluido_em: new Date().toISOString()
        });
    };

    return { onStart, onProgress, onEnded };
}
