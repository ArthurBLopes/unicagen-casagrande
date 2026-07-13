import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "../../../common/courseCard/CourseCard";
import styles from "./SectionTrail.module.css";
import { useSwipeable } from "react-swipeable";

export default function SectionTrail({ trilha, cursos }) {
    const navigate = useNavigate();
    const coursesRef = useRef(null);

    const scrollCursos = (direcao) => {
        if (!coursesRef.current) return;

        coursesRef.current.scrollBy({
            left: direcao === "direita" ? 300 : -300,
            behavior: "smooth",
        });
    };

    return (
        <section className={styles.sectionTrail}>
            <h2>{trilha.titulo}</h2>
            <p>{trilha.descricao}</p>

            <div className={styles.carouselArea}>
                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.prev}`}
                    onClick={() => scrollCursos("esquerda")}
                    aria-label="Voltar cursos"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className={styles.coursesContainer} ref={coursesRef}>
                    {cursos.map((curso) => (
                        <CourseCard
                            key={curso.id}
                            curso={curso}
                            trilha={trilha.titulo}
                            onClick={() => navigate(`/cursos/${curso.id}`, { state: curso })}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.next}`}
                    onClick={() => scrollCursos("direita")}
                    aria-label="Avançar cursos"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}