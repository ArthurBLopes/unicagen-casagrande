import styles from "./detailsCourse.module.css";
import { useParams, useLocation } from "react-router-dom";
import BackPage from "../../components/common/back/BackPage";
import { useAuth } from "../../providers/AuthContext";
import useScrollTop from "../../hooks/useScrollTop/useScrollTop";
import { useState, useEffect } from "react";
import { formatarData } from "../../utils/formatarData";
import { FaRegClock } from "react-icons/fa";
import { Bookmark } from "lucide-react";
import { useSaved } from "../../hooks/saved/useSaved";
import { getYouTubeVideoId } from "../../utils/formatar_url"
import { useTreinamentos } from "../../hooks/courses/useTreinamentos";
import { useTagsDoTreinamento } from "../../hooks/tags/useTagsDoTreinamento";
import { useYouTubePlayer } from "../../hooks/youtube/useYouTubePlayer";
import { useProgressoVideoTreinamento } from "../../hooks/metrics/useProgressoVideoTreinamento";
import { registrarAcessoTreinamento } from "../../services/metrics/acessosTreinamentosService";

export default function DetailsCourse() {
    const { id } = useParams();
    const { tagsDoCurso } = useTagsDoTreinamento(id);
    const { treinamentos } = useTreinamentos();
    const location = useLocation();
    const { trilha } = location.state || {};
    const treinamento = treinamentos.find(treinamento => treinamento.id === parseInt(id));
    const dataPublicacaoFormatada = treinamento ? formatarData(new Date(treinamento.data_publicacao)) : "";
    const linkVideo = treinamento?.link_conteudo?.includes("https://youtu.be") ? "video" : "outro";
    const videoId = linkVideo === "video" ? getYouTubeVideoId(treinamento.link_conteudo) : "";
    const { usuario } = useAuth();
    const id_usuario = usuario?.id;
    const { onStart, onProgress, onEnded } = useProgressoVideoTreinamento(id_usuario, treinamento?.id);
    const { containerRef: videoRef } = useYouTubePlayer(videoId, { onStart, onProgress, onEnded });
    const { toggleSalvo, estaSalvo, carregandoInicial } = useSaved(id_usuario);
    const cursoSalvo = treinamento?.id ? estaSalvo(treinamento.id) : false;
    
    useScrollTop();
    
    return (
        <div className={styles.detalhesPage}>
            <BackPage />
            <div className={styles.cursoDetalhes}>
                <p className={styles.titulo}>{treinamento?.titulo.toUpperCase()}</p>
                <div className={styles.cursoContainer}>
                     {linkVideo === "video" && (
                        <div className={styles.cursoVideo}>
                            <div ref={videoRef}></div>
                        </div>
                    )}
                    {linkVideo === "outro" && (
                        <img src={treinamento?.imagem} alt={treinamento?.titulo} className={styles.cursoImagem} />
                    )}
                    <div className={styles.cursoConteudo}>
                        {trilha && <p className={styles.cursoTrilha}>{trilha?.titulo || "Não definido"}</p>}
                        <h1 className={styles.cursoTitulo}>{treinamento?.titulo}</h1>
                        <div className={styles.datas}>
                            <p className={styles.cursoData}><FaRegClock size={16} /> {dataPublicacaoFormatada}</p>
                        </div>
                        <p className={styles.cursoDescricao}>{treinamento?.descricao}</p>
                        {tagsDoCurso.length > 0 && (
                            <div className={styles.cursoTags}>
                                {tagsDoCurso.map((tag, index) => (
                                    <span key={index} className={styles.cursoTag}>{tag?.titulo}</span>
                                ))}
                            </div>
                        )}
                        <div className={styles.acoes}>
                            {linkVideo !== "video" && (
                                <button className={styles.botaoAcessarConteudo} onClick={() => {
                                    if (id_usuario) registrarAcessoTreinamento(id_usuario, treinamento.id);
                                    window.open(treinamento?.link_conteudo, "_blank");
                                }}>Acessar Conteúdo</button>
                            )}
                            {treinamento?.link_material && (
                                <button className={styles.botaoAcessarMaterial} onClick={() => window.open(treinamento.link_material, "_blank")}>Acessar Material</button>
                            )}
                            <button 
                                className={styles.botaoSalvar} 
                                onClick={() => toggleSalvo(treinamento?.id)}
                                disabled={carregandoInicial || !treinamento}
                            >
                                {cursoSalvo ? <Bookmark fill="var(--text-color2)" /> : <Bookmark />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}