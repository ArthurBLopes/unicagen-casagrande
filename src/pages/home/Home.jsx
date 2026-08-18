import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useAuth } from "../../providers/AuthContext";
import { useState, useEffect, useRef } from "react";
import SectionTrail from "../../components/features/home/sectionTrail/SectionTrail";
import styles from "./Home.module.css";
import { useTrilhasComTreinamentos } from "../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useClickOutside } from "../../hooks/ui/useClickOutside";
import CourseCard from "../../components/common/courseCard/CourseCard";
import { useTags } from "../../hooks/tags/useTags";
import { removerItensDuplicados } from "../../utils/formatarData";
import { useAcessos } from "../../hooks/metrics/useAcessos";
import { useTrilhasDoTreinamento } from "../../hooks/trailsCourses/useTrilhasDoTreinamento";

const LIMITE_CURSOS_POR_TRILHA = 4;

export default function Home() {

    const { usuario, isAdmin } = useAuth();
    const { trilhasComTreinamentos, erroCarregamento } = useTrilhasComTreinamentos();

    const nome = usuario?.user_metadata.full_name || "Não Identificado";
    const primeiroNome = nome.split(" ")[0];

    const [abertoTrilhas, setAbertoTrilhas] = useState(false);
    const [abertoTags, setAbertoTags] = useState(false);
    const dropdownTrilhasRef = useRef(null);
    useClickOutside(dropdownTrilhasRef, () => setAbertoTrilhas(false), abertoTrilhas);

    const [trilhaSelecionada, setTrilhaSelecionada] = useState(null);
    const trilhaFiltrada = trilhaSelecionada ? trilhasComTreinamentos.filter(trilha => trilha.id === trilhaSelecionada.id) : trilhasComTreinamentos

    const [pesquisa, setPesquisa] = useState("");

    const treinamentos = trilhaFiltrada.flatMap(trilha => trilha.treinamentos || []);
    const treinamentosFiltradosPorTrilha = treinamentos.filter(treinamento => treinamento.titulo.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(pesquisa.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "")));
    
    const { tags, tagsTreinamentos } = useTags();
    const [tagSelecionada, setTagSelecionada] = useState(null);
    const tagsUnicas = removerItensDuplicados(tags.map((tag) => tag?.titulo));

    const treinamentosPorTags = treinamentos.filter(treinamento => tagsTreinamentos.some(tag => tag.id_treinamento === treinamento.id && tag?.tags.titulo === tagSelecionada));
    const treinamentosResultadoFinal = tagSelecionada !== null ? treinamentosPorTags : treinamentosFiltradosPorTrilha;

    const filtroAtivo = pesquisa.length > 0 || tagSelecionada !== null;

    const dropdownTagsRef = useRef(null);
    useClickOutside(dropdownTagsRef, () => setAbertoTags(false), abertoTags);

    function handleSelectTrilha(trilha, event) {
        event.stopPropagation();
        setPesquisa("");
        setTrilhaSelecionada(trilha);
        setAbertoTrilhas(false);
    }

    function handleSelectTag(tag, event) {
        event.stopPropagation();
        setTagSelecionada(tag);
        setPesquisa("");
        setAbertoTags(false);
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
                            ref={dropdownTrilhasRef}
                            className={`${styles.filterButton} ${abertoTrilhas ? styles.filterButtonActive : ''}`}
                            onClick={() => setAbertoTrilhas(!abertoTrilhas)}
                        >
                            <span>{trilhaSelecionada?.titulo || "Todas as trilhas"}</span>
                            <ChevronDown size={16} style={{ transform: abertoTrilhas ? 'rotate(180deg)' : 'rotate(0deg)',transition: 'transform 0.2s ease'}} />
                            {abertoTrilhas && (
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

                        <div type="button" className={styles.filterButton} ref={dropdownTagsRef} onClick={() => setAbertoTags(!abertoTags)}>
                            <span>{tagSelecionada || "Todas as tags"}</span>
                            <ChevronDown size={16} style={{ transform: abertoTags ? 'rotate(180deg)' : 'rotate(0deg)',transition: 'transform 0.2s ease'}} />
                            {abertoTags && (
                                <ul className={styles.dropdownList}>
                                    <li onClick={(e) => handleSelectTag(null, e)}>Todas as tags</li>
                                    {tagsUnicas.map((tag, index) => (
                                        <li key={index} onClick={(e) => handleSelectTag(tag, e)}>
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {erroCarregamento && (
                    <p>Não foi possível carregar as trilhas no momento.</p>
                )}

                {!filtroAtivo && trilhaFiltrada.map((trilha) => {
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

                {filtroAtivo && treinamentosResultadoFinal.length === 0 &&(
                    <p className={styles.semResultados}>Nenhum conteúdo encontrado para "{pesquisa}".</p>
                )}
                {filtroAtivo && treinamentosResultadoFinal.length > 0 && (
                    <div className={styles.cursosContainer}>
                        {treinamentosResultadoFinal.map((curso, index) => (
                            <CourseCard key={index} curso={curso} trilha={trilhaFiltrada.find(trilha => trilha.treinamentos?.some(t => t.id === curso.id))} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}