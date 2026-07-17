import CourseCard from "../../components/common/courseCard/CourseCard";
import { useLocation } from "react-router-dom";
import styles from "./Courses.module.css";

export default function Courses() {
    
    const location = useLocation();
    const { trilha } = location.state || {};
    console.log("Trilha recebida:", trilha);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{trilha.titulo}</h1>
                <p>{trilha.descricao}</p>
                <div className={styles.coursesContainer}>
                    {trilha.treinamentos.map((curso) => (
                        <CourseCard
                            key={curso.id}
                            curso={curso}
                            trilha={trilha}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}