import styles from "./CourseCardCompact.module.css";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import { formatarData } from "../../../utils/formatarData";

export default function CourseCardCompact({ treinamento, trilha, onClick }) {
    const dataPublicacaoFormatada = formatarData(treinamento.data_publicacao);

    return (
        <div className={styles.courseCardCompact} onClick={onClick}>
            <h3 className={styles.titulo}>{treinamento.titulo}</h3>
            <p className={styles.descricao}>{treinamento.descricao}</p>
            <p className={styles.dataPublicacao}><FaRegClock size={16} /> {dataPublicacaoFormatada}</p>
            <button className={styles.botaoAcessar} style={{ "--trail-color": trilha.cor || "var(--text-color2)" }} title="Acessar conteúdo do treinamento" onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}>Acessar</button>
            {treinamento?.link_material && (
                <button className={styles.botaoAcessarConteudo} title="Acessar material do treinamento" onClick={(event) => {
                    event.stopPropagation();
                    window.open(treinamento.link_material, "_blank");
                }}><MdOutlineOpenInNew size={24} /></button>
            )}
        </div>
    )
}