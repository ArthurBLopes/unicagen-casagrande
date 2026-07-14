import { MdOutlineOpenInNew } from "react-icons/md";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ curso, trilha }) {

    const navigate = useNavigate();
    const dias = Math.floor((new Date() - new Date(curso.data_publicacao)) / (1000 * 60 * 60 * 24));
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(curso.data_publicacao));
    const ano = new Date(curso.data_publicacao).getFullYear();
    const dataPublicacaoFormatada = dias < 30 ? (dias === 0 ? "Hoje" : `${dias} dias atrás`) : `${mes} de ${ano}`;

    function detalhesCurso() {
        navigate(`/curso/${curso.id}`);
    }

    return (
        <div className={styles.card} onClick={detalhesCurso}>
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
                <button className={styles.botaoAcessar} onClick={(event) => {
                    event.stopPropagation(); 
                    detalhesCurso();
                    }}>Acessar</button>
                <button className={styles.botaoAcessarConteudo} onClick={(event) => {
                    event.stopPropagation();
                    window.open(curso.link_material, "_blank");
                    }}><MdOutlineOpenInNew size={24} /></button>
            </div>
        </div>
    );
}