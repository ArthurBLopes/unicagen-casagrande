import { MdOutlineOpenInNew } from "react-icons/md";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utils/formatarData";

export default function CourseCard({ curso, trilha }) {

    const navigate = useNavigate();
    const dataPublicacaoFormatada = formatarData(curso.data_publicacao);

    function detalhesCurso() {
        navigate(`/curso/${curso.id}`, { state: { trilha } });
    }

    console.log("Curso:", curso);

    return (
        <div className={styles.card} onClick={detalhesCurso}>
            <p className={styles.trilha}>{trilha?.titulo || "Não definido"}</p>
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
                <p className={styles.dataPublicacao}><FaRegClock size={16} /> {dataPublicacaoFormatada}</p>
                <button className={styles.botaoAcessar} title="Acessar conteúdo do treinamento" onClick={(event) => {
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