import { useNavigate } from "react-router-dom";
import CourseCard from "../../../common/courseCard/CourseCard";
import styles from "./SectionTrail.module.css";

export default function SectionTrail({ trilha, cursos }) {
    const navigate = useNavigate();

    return (
        <section className={styles.sectionTrail}>
            <h2>{trilha.titulo}</h2>
            <p>{trilha.descricao}</p>
            <div className={styles.coursesContainer}>
                {cursos.map((curso) => (
                    <CourseCard
                        key={curso.id}
                        curso={curso}
                        onClick={() => navigate(`/cursos/${curso.id}`, { state: curso })}
                    />
                ))}
            </div>
        </section>
    );
}