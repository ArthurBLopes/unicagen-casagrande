import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useAuth } from "../../hooks/auth/useAuth";
import SectionTrail from "../../components/features/home/sectionTrail/SectionTrail";
import { trilhas } from "../../mocks/trails/mockTrails";
import { getCursosPorTrilha } from "../../mocks/courses/mockCourses";
import styles from "./Home.module.css";
import { listarTreinamentos } from "../../services/treinamentosService";
import { listarTrilhas } from "../../services/trilhasService";
import { listarTreinamentosTrilhas } from "../../services/treinamentosTrilhasService";
import { listarTrilhasComTreinamentos } from "../../services/treinamentosTrilhasService";
import { useMemo } from "react";

const LIMITE_CURSOS_POR_TRILHA = 4;

export default function Home() {
    const { user } = useAuth();
    const nome = user?.user_metadata?.full_name || "Não Identificado";
    const primeiroNome = nome.split(" ")[0];

    /*listarTreinamentos().then((cursos) => {
        console.log("Cursos buscados:", cursos);
    });

    listarTrilhas().then((trilhas) => {
        console.log("Trilhas buscadas:", trilhas);
    });

    listarTreinamentosTrilhas().then((treinamentosTrilhas) => {
        console.log("Treinamentos_Trilhas buscados:", treinamentosTrilhas);
    });*/


    const trilhasComTreinamentos = useMemo(() => {
        listarTrilhasComTreinamentos().then((trilhasComTreinamentos) => {
            console.log("Trilhas com Treinamentos buscadas:", trilhasComTreinamentos);
        });
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h2>Olá, {primeiroNome}</h2>

                <p>
                    Bem-vindo(a) à plataforma de aprendizado da{" "}
                    <span className={styles.titulo}>UNIVERSIDADE CASAGRANDE</span>!
                    Explore as trilhas de aprendizado, descubra novos conteúdos e aproveite
                    ao máximo sua jornada.
                </p>

                <div className={styles.searchArea}>
                    <div className={styles.searchBox}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar conteúdos..."
                            readOnly
                        />
                    </div>

                    <div className={styles.filters}>
                        <button type="button" className={styles.filterButton}>
                            <SlidersHorizontal size={16} />
                            <span>Todas as trilhas</span>
                            <ChevronDown size={16} />
                        </button>

                        <button type="button" className={styles.filterButton}>
                            <span>Todas as tags</span>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>

                {trilhasComTreinamentos.map((trilha) => {
                    const cursosDaTrilha = trilha.treinamentos.slice(0,LIMITE_CURSOS_POR_TRILHA);

                    if (cursosDaTrilha.length === 0) return null;

                    return (
                        <SectionTrail
                            key={trilha.id}
                            trilha={trilha}
                            cursos={cursosDaTrilha}
                        />
                    );
                })}
            </main>
        </div>
    );
}