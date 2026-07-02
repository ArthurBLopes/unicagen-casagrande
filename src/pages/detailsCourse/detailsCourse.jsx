import styles from "./detailsCourse.module.css";
import { useParams } from "react-router-dom";
import { cursos } from "../../mocks/courses/mockCourses";
import BackPage from "../../components/common/back/BackPage";
import useScrollTop from "../../hooks/useScrollTop/useScrollTop";

export default function DetailsCourse() {

    const { id } = useParams();
    const curso = cursos.find(curso => curso.id === parseInt(id));
    useScrollTop();
    console.log("Curso encontrado:", curso);

    return (
        <div className={styles.detalhesPage}>
            <BackPage />
            <div className={styles.cursoDetalhes}>
                <p className={styles.titulo}>{curso?.titulo.toUpperCase()}</p>
                <div className={styles.cursoContainer}>
                    <img src={curso?.imagem} alt={curso?.titulo} className={styles.cursoImagem} />
                    <div className={styles.cursoConteudo}>
                        <p className={styles.cursoTrilha}>{curso?.trilha}</p>
                        <h1 className={styles.cursoTitulo}>{curso?.titulo}</h1>
                        <div className={styles.datas}>
                            <p className={styles.cursoData}>{curso?.dataPublicacao}</p>
                        </div>
                        <p className={styles.cursoDescricao}>{curso?.descricao}</p>
                        {curso?.tags && curso.tags.length > 0 && (
                            <div className={styles.cursoTags}>
                                {curso.tags.map((tag, index) => (
                                    <span key={index} className={styles.cursoTag}>{tag}</span>
                                ))}
                            </div>
                        )}
                        <div className={styles.acoes}>
                            <button className={styles.botaoAcessarConteudo} onClick={() => window.open(curso?.linkConteudo, "_blank")}>Acessar Conteúdo</button>
                            {curso?.linkMaterial && (
                                <button className={styles.botaoAcessarMaterial} onClick={() => window.open(curso.linkMaterial, "_blank")}>Acessar Material</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}