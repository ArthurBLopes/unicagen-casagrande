import { MdOutlineOpenInNew } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import styles from "./CourseCard.module.css";

export default function CourseCard({ curso, onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.trilha}>{curso.trilha}</div>
            <img src={curso.imagem} alt={curso.titulo} className={styles.imagem} />
            <div className={styles.conteudo}>
                <h3 className={styles.titulo}>{curso.titulo}</h3>
                <p className={styles.descricao}>{curso.descricao}</p>
                {curso.tags && curso.tags.length > 0 && (
                    <div className={styles.tags}>
                        {curso.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.acoes}>
                <p className={styles.dataPublicacao}><FaRegClock size={16} /> {curso.dataPublicacao}</p>
                <button className={styles.botaoAcessar} onClick={onClick}>Acessar</button>
                <button className={styles.botaoAcessarConteudo}><MdOutlineOpenInNew size={24} /></button>
            </div>
        </div>
    );
}