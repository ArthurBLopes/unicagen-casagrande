import { MdOutlineOpenInNew } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utils/formatarData";
import { useTags } from "../../../hooks/tags/useTags";

export default function CourseCard({ curso, trilha }) {

    const navigate = useNavigate();
    const dataPublicacaoFormatada = formatarData(curso.data_publicacao);
    const { tagsTreinamento } = useTags(curso.id);

    function detalhesCurso() {
        navigate(`/curso/${curso.id}`, { state: { trilha } });
    }

    return (
        <div className={styles.card} onClick={detalhesCurso}>
            {trilha?.cor && <p className={styles.trilha} style={{ "--trail-color": trilha.cor || "var(--text-color2)" }}>{trilha?.titulo || "Não definido"}</p>}
            <img src={curso.imagem} alt={curso.titulo} className={styles.imagem} />
            <div className={styles.conteudo}>
                <h3 className={styles.titulo}>{curso.titulo}</h3>
                <p className={styles.descricao}>{curso.descricao}</p>
                {tagsTreinamento && tagsTreinamento.length > 0 && (
                    <div className={styles.tags}>
                        {tagsTreinamento.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag.titulo}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.acoes}>
                <p className={styles.dataPublicacao}><FaRegClock size={16} /> {dataPublicacaoFormatada}</p>
                <button className={styles.botaoAcessar} style={{ "--trail-color": trilha.cor || "var(--text-color2)" }} title="Acessar conteúdo do treinamento" onClick={(event) => {
                    event.stopPropagation(); 
                    detalhesCurso();
                    }}>Acessar</button>
                {curso?.link_material && (
                    <button className={styles.botaoAcessarConteudo} title="Acessar material do treinamento" onClick={(event) => {
                        event.stopPropagation();
                        window.open(curso.link_material, "_blank");
                    }}><MdOutlineOpenInNew size={24} /></button>
                )}
            </div>
        </div>
    );
}