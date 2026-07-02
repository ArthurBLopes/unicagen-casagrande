import { MdOutlineOpenInNew } from "react-icons/md";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ curso }) {
    
    const navigate = useNavigate();

    function detalhesCurso() {
        navigate(`/curso/${curso.id}`);
    }

    return (
        <div className={styles.card} onClick={detalhesCurso}>
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
                <button className={styles.botaoAcessar} onClick={(event) => {
                    event.stopPropagation(); 
                    detalhesCurso();
                    }}>Acessar</button>
                <button className={styles.botaoAcessarConteudo} onClick={(event) => {
                    event.stopPropagation();
                    detalhesCurso();
                    }}><MdOutlineOpenInNew size={24} /></button>
            </div>
        </div>
    );
}