import Trail from "../../components/features/trails/Trail";
import styles from "./TrailsPage.module.css";
import { trilhas } from "../../mocks/trails/mockTrails";

export default function TrailsPage() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Trilhas de Aprendizado</h1>
                <p>Explore as trilhas de aprendizado disponíveis e descubra novos conteúdos para aprimorar suas habilidades.</p>
                <div className={styles.trailsContainer}>
                {trilhas.map((trilha) => (
                    <Trail key={trilha.id} trilha={trilha} />
                ))}
                </div>
            </main>
        </div>
    )
}