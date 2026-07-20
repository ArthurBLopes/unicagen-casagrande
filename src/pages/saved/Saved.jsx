import styles from "./Saved.module.css";
import { useAuth } from "../../hooks/auth/useAuth";
import { useSaved } from "../../hooks/saved/useSaved";
import CourseCard from "../../components/common/courseCard/CourseCard";
import { Bookmark } from "lucide-react";

export default function Saved() {

    const { user } = useAuth();
    const { treinamentosSalvos, carregandoInicial } = useSaved(user?.id);

    if (carregandoInicial) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <p className={styles.carregando}>Carregando seus cursos salvos...</p>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Cursos Salvos</h1>
                <p>Acesse rapidamente os conteúdos que você marcou como favoritos e continue sua jornada de aprendizado.</p>
                
                {treinamentosSalvos.length === 0 ? (
                    <div className={styles.estadoVazio}>
                        <div className={styles.iconeVazio}>
                            <Bookmark size={48} />
                        </div>
                        <h2>Nenhum curso salvo ainda</h2>
                        <p>Explore as trilhas e cursos disponíveis e salve seus favoritos para acessá-los mais facilmente depois.</p>
                    </div>
                ) : (
                    <div className={styles.cursosContainer}>
                        {treinamentosSalvos.map((curso) => (
                            <CourseCard key={curso.id} curso={curso} trilha={curso.trilha} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}