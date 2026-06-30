import { useLocation } from 'react-router-dom';
import BackPage from '../../components/common/back/BackPage';
import styles from './CoursePage.module.css';

export default function CoursePage() {

    const { state } = useLocation();
    const { titulo, descricao, publicado, corpo, categoria, linkConteudo, linkMaterial } = state || {};

    return (
        <div className={styles.courseContainer}>
            <BackPage />
            <div className={styles.courseContent}>
                <p className={styles.categoria}>{categoria}</p>
                <h1 className={styles.titulo}>{titulo}</h1>
                <p className={styles.publicado}>{publicado}</p>
                <p className={styles.descricao}>{descricao}</p>
                { linkConteudo && <button className={styles.button} onClick={() => window.open(linkConteudo, '_blank')}>Acessar Conteúdo</button> }
                { linkMaterial && <button className={styles.button} onClick={() => window.open(linkMaterial, '_blank')}>Acessar Material</button> }
            </div>
        </div>
    )
}