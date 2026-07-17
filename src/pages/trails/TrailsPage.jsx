import Trail from "../../components/features/trails/Trail";
import styles from "./TrailsPage.module.css";
import { trilhas } from "../../mocks/trails/mockTrails";
import { useTrilhasComTreinamentos } from "../../hooks/trailsCourses/useTrilhasComTreinamentos";

export default function TrailsPage() {

    const { trilhasComTreinamentos, erroCarregamento } = useTrilhasComTreinamentos();

    console.log("Trilhas com Treinamentos:", trilhasComTreinamentos);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Trilhas de Aprendizado</h1>
                <p>Explore as trilhas de aprendizado disponíveis e descubra novos conteúdos para aprimorar suas habilidades.</p>
                <div className={styles.trailsContainer}>
                {trilhasComTreinamentos.map((trilha) => (
                    <Trail key={trilha.id} trilha={trilha} />
                ))}
                </div>
            </main>
        </div>
    )
}