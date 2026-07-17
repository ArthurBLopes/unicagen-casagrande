import Trail from "../../components/features/trails/Trail";
import styles from "./TrailsPage.module.css";
import { trilhas } from "../../mocks/trails/mockTrails";
import { useTrilhasComTreinamentos } from "../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useNavigate } from "react-router-dom";

export default function TrailsPage() {

    const { trilhasComTreinamentos, erroCarregamento } = useTrilhasComTreinamentos();
    const navigate = useNavigate();

    console.log("Trilhas com Treinamentos:", trilhasComTreinamentos);

    function handleTrilha(trilha) {
        navigate(`/trilha/${trilha.id}`, { state: { trilha } });
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Trilhas de Aprendizado</h1>
                <p>Explore as trilhas de aprendizado disponíveis e descubra novos conteúdos para aprimorar suas habilidades.</p>
                <div className={styles.trailsContainer}>
                {trilhasComTreinamentos.map((trilha) => (
                    <button key={trilha.id} className={styles.botaoTrilha} onClick={() => handleTrilha(trilha)}>
                        <Trail key={trilha.id} trilha={trilha} />
                    </button>
                ))}
                </div>
            </main>
        </div>
    )
}