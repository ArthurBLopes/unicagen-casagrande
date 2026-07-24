import React from "react";
import { useState } from "react";
import CourseCardCompact from "../../components/features/courses/CourseCardCompact";
import { useNavigate } from "react-router-dom";
import { useTrilhasComTreinamentos } from "../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { Search } from "lucide-react";
import styles from "./CoursesCompact.module.css";

export default function CoursesCompact() {

    const navigate = useNavigate();
    const { trilhasComTreinamentos } = useTrilhasComTreinamentos();
    const [pesquisa, setPesquisa] = useState("");

    const treinamentos = trilhasComTreinamentos.flatMap(trilha => trilha.treinamentos);
    const treinamentosFiltrados = treinamentos.filter(treinamento => treinamento.titulo.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(pesquisa.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "")));
    console.log(treinamentosFiltrados);

    function retornarTrilha(treinamento) {
        return trilhasComTreinamentos.find(trilha => trilha.treinamentos.some(t => t.id === treinamento.id));
    }

    function detalhesCurso(treinamento, trilha) {
        navigate(`/curso/${treinamento.id}`, { state: { trilha } });
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
                    {treinamentosFiltrados.map((treinamento, index) => (
                        <CourseCardCompact
                            key={index}
                            treinamento={treinamento}
                            trilha={retornarTrilha(treinamento)}
                            onClick={() => detalhesCurso(treinamento, retornarTrilha(treinamento))}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}