import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useAuth } from "../../providers/AuthContext";
import { useState, useEffect, useRef } from "react";
import SectionTrail from "../../components/features/home/sectionTrail/SectionTrail";
import styles from "./Home.module.css";
import { useTrilhasComTreinamentos } from "../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useClickOutside } from "../../hooks/ui/useClickOutside";
import CourseCard from "../../components/common/courseCard/CourseCard";

const LIMITE_CURSOS_POR_TRILHA = 4;

export default function Home() {
    const { usuario } = useAuth();
    const { trilhasComTreinamentos, erroCarregamento } = useTrilhasComTreinamentos();

    const nome = usuario?.user_metadata?.full_name || "Não Identificado";
    const primeiroNome = nome.split(" ")[0];

    const [aberto, setAberto] = useState(false);
    const dropdownRef = useRef(null);
    useClickOutside(dropdownRef, () => setAberto(false), aberto);

    const [trilhaSelecionada, setTrilhaSelecionada] = useState(null);
    const trilhaFiltrada = trilhaSelecionada ? trilhasComTreinamentos.filter(trilha => trilha.id === trilhaSelecionada.id) : trilhasComTreinamentos;

    console.log("Trilhas filtradas:", trilhaFiltrada);
    const [pesquisa, setPesquisa] = useState("");

    
    
    const treinamentosFiltrados = pesquisa 
        ? Array.from(
            new Map(
                trilhaFiltrada
                    .flatMap(trilha => trilha.treinamentos || [])
                    .filter(treinamento => treinamento.titulo.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(pesquisa.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
                    .map(treinamento => [treinamento.id, treinamento])
            ).values()) : [];


    function handleSelectTrilha(trilha, event) {
        event.stopPropagation();
        setPesquisa("");
        setTrilhaSelecionada(trilha);
        setAberto(false);
    }

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
                        <input type="text" placeholder="Buscar conteúdos..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                    </div>

                    <div className={styles.filters}>
                        <div 
                            ref={dropdownRef}
                            className={`${styles.filterButton} ${aberto ? styles.filterButtonActive : ''}`}
                            onClick={() => setAberto(!aberto)}
                        >
                            <span>{trilhaSelecionada?.titulo || "Todas as trilhas"}</span>
                            <ChevronDown size={16} style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)',transition: 'transform 0.2s ease'}} />
                            {aberto && (
                                <ul className={styles.dropdownList}>
                                    <li onClick={(e) => handleSelectTrilha(null, e)}>Todas as trilhas</li>
                                    {trilhasComTreinamentos.map((trilha) => (
                                        <li key={trilha.id} onClick={(e) => handleSelectTrilha(trilha, e)}>
                                            {trilha.titulo}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button type="button" className={styles.filterButton}>
                            <span>Todas as tags</span>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>

                {erroCarregamento && (
                    <p>Não foi possível carregar as trilhas no momento.</p>
                )}

                {(pesquisa.length === 0) && trilhaFiltrada.map((trilha) => {
                    const cursosDaTrilha = (trilha.treinamentos || []).slice(0, LIMITE_CURSOS_POR_TRILHA);
                    if (cursosDaTrilha.length === 0) return null;
                    return (
                        <SectionTrail
                            key={trilha.id}
                            trilha={trilha}
                            cursos={cursosDaTrilha}
                        />
                    );
                })}

                {pesquisa && treinamentosFiltrados.length === 0 && (
                    <p className={styles.semResultados}>Nenhum conteúdo encontrado para "{pesquisa}".</p>
                )}
                {pesquisa && treinamentosFiltrados.length > 0 && (
                    <div className={styles.cursosContainer}>
                        {treinamentosFiltrados.map((curso) => (
                            <CourseCard key={curso.id} curso={curso} trilha={trilhaFiltrada.find(trilha => trilha.treinamentos?.some(t => t.id === curso.id))} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}