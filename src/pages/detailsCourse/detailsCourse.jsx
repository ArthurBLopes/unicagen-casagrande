import { useLocation } from "react-router-dom";
import styles from "./detailsCourse.module.css";
import { useParams } from "react-router-dom";
import { cursos } from "../../mocks/courses/mockCourses";
import BackPage from "../../components/common/back/BackPage";

export default function DetailsCourse() {

    const { id } = useParams();
    const curso = cursos.find(c => c.id === id);
    console.log("Curso encontrado:", curso);

    return (
        <div className={styles.detailsCourse}>
            <BackPage />
            <h1>{curso.titulo}</h1>
            <p>{curso.descricao}</p>
        </div>
    )
}