import styles from "./detailsCourse.module.css";
import { useParams, useLocation } from "react-router-dom";
import BackPage from "../../components/common/back/BackPage";
import useScrollTop from "../../hooks/useScrollTop/useScrollTop";
import { listarTreinamentos } from "../../services/treinamentosService";
import { listarTrilhas } from "../../services/trilhasService";
import { useState, useEffect } from "react";
import { formatarData } from "../../utils/formatarData";
import { FaRegClock } from "react-icons/fa";

export default function DetailsCourse() {
    const [treinamentos, setTreinamentos] = useState([]);
    const { id } = useParams();
    const location = useLocation();
    const { trilha } = location.state || {};
    const treinamento = treinamentos.find(treinamento => treinamento.id === parseInt(id));
    const dataPublicacaoFormatada = treinamento ? formatarData(new Date(treinamento.data_publicacao)) : "";
    
    useScrollTop();

    useEffect(() => {
        const fetchTreinamentos = async () => {
            const dados = await listarTreinamentos();
            setTreinamentos(dados);
        };
        fetchTreinamentos();
    }, []);

    function getYouTubeEmbedUrl(url) {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/;
        const match = url.match(regex);

        if (!match) return "";

        return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return (
        <div className={styles.detalhesPage}>
            <BackPage />
            <div className={styles.cursoDetalhes}>
                <p className={styles.titulo}>{treinamento?.titulo.toUpperCase()}</p>
                <div className={styles.cursoContainer}>
                    {treinamento?.link_conteudo && (
                        <div className={styles.cursoVideo}>
                            <iframe
                                src={getYouTubeEmbedUrl(treinamento.link_conteudo)}
                                title={treinamento.titulo}
                                frameBorder="0"
                            ></iframe>
                        </div>
                    )}
                    {treinamento?.link_imagem && (
                        <img src={treinamento.link_imagem} alt={treinamento.titulo} className={styles.cursoImagem} />
                    )}
                    <div className={styles.cursoConteudo}>
                        <p className={styles.cursoTrilha}>{trilha?.titulo || "Não definido"}</p>
                        <h1 className={styles.cursoTitulo}>{treinamento?.titulo}</h1>
                        <div className={styles.datas}>
                            <p className={styles.cursoData}><FaRegClock size={16} /> {dataPublicacaoFormatada}</p>
                        </div>
                        <p className={styles.cursoDescricao}>{treinamento?.descricao}</p>
                        {treinamento?.tags && treinamento.tags.length > 0 && (
                            <div className={styles.cursoTags}>
                                {treinamento.tags.map((tag, index) => (
                                    <span key={index} className={styles.cursoTag}>{tag}</span>
                                ))}
                            </div>
                        )}
                        <div className={styles.acoes}>
                            <button className={styles.botaoAcessarConteudo} onClick={() => window.open(treinamento?.link_conteudo, "_blank")}>Acessar Conteúdo</button>
                            {treinamento?.link_material && (
                                <button className={styles.botaoAcessarMaterial} onClick={() => window.open(treinamento.link_material, "_blank")}>Acessar Material</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}