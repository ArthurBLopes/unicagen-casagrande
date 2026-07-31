import React from "react";
import { useState } from "react";
import CourseCardCompact from "../../components/features/courses/CourseCardCompact";
import { useNavigate } from "react-router-dom";
import { useTreinamentos } from "../../hooks/courses/useTreinamentos";
import { Search } from "lucide-react";
import styles from "./CoursesCompact.module.css";

export default function CoursesCompact() {

    const navigate = useNavigate();
    const { treinamentos } = useTreinamentos();
    const [pesquisa, setPesquisa] = useState("");

    const treinamentosFiltrados = treinamentos.filter(treinamento => treinamento.titulo.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(pesquisa.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "")));
    const treinamentosOrdenados = treinamentosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));

    function detalhesCurso(treinamento, trilha) {
        navigate(`/curso/${treinamento.id}`);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Treinamentos.</h1>
                <p>Explore a variedade de cursos e trilhas de aprendizado que oferecemos para aprimorar suas habilidades e conhecimentos.</p>
                <div className={styles.searchArea}>
                    <div className={styles.searchBox}>
                        <Search size={18} />
                        <input type="text" placeholder="Buscar conteúdos..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                    </div>
                </div>
                <div className={styles.coursesContainer}>
                    {treinamentosOrdenados.map((treinamento, index) => (
                        <CourseCardCompact
                            key={index}
                            treinamento={treinamento}
                            onClick={() => detalhesCurso(treinamento)}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}