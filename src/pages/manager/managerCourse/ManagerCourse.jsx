import { useEffect, useState } from "react";
import styles from "./ManagerCourse.module.css";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useTags } from "../../../hooks/tags/useTags";
import { useAuth } from "../../../providers/AuthContext";
import { inserirTreinamento } from "../../../services/treinamentosService";
import { Trash, Images, X } from "lucide-react"
import ChipSelectField from "../../../components/common/chipSelectField/ChipSelectField";
import { useSelectionMulti } from "../../../hooks/selection/useSelectionMulti";
import ImageField from "../../../components/common/imageField/ImageField";
import CourseForm from "../../../components/features/manager/course/CourseForm";

export default function ManagerCourse() {
    const { session } = useAuth();
    const [inserirAberto, setInserirAberto] = useState(false);
    const { trilhas } = useTrilhasComTreinamentos();
    const { tags } = useTags();
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const selecaoTrilhas = useSelectionMulti();
    const selecaoTags = useSelectionMulti();

    function handleAbrirInserir() {
        setInserirAberto((estadoAtual) => !estadoAtual);
    }

    function resetarFormulario(formulario) {
        formulario.reset();
        setImagemArquivo(null);
        setInserirAberto(false);
    }

    async function handleCadastrarTreinamento(evento) {
        evento.preventDefault();
        setEnviando(true);

        const formulario = evento.target;
        const formData = new FormData(formulario);

        let urlImagem = null;
        if (imagemArquivo) {
            urlImagem = await uploadImagemTreinamento(imagemArquivo, session);
            if (!urlImagem) {
                alert("Não foi possível enviar a imagem. Tente novamente.");
                setEnviando(false);
                return;
            }
        }

        // TODO: os vínculos de trilhas/tags dependem de services ainda não criados
        // para as tabelas treinamentos_trilhas e treinamentos_tags.
        const treinamentoCriado = await inserirTreinamento({
            titulo: formData.get("titulo")?.trim(),
            descricao: formData.get("descricao")?.trim(),
            link_conteudo: formData.get("url_conteudo")?.trim(),
            link_material: formData.get("url_material")?.trim(),
            imagem: urlImagem,
        });

        setEnviando(false);

        if (!treinamentoCriado) {
            alert("Não foi possível cadastrar o treinamento.");
            return;
        }

        resetarFormulario(formulario);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Treinamentos</h1>
                <p>
                    Insira, edite ou remova informações dos treinamentos, essa é a página de
                    gerenciamento dos treinamentos disponíveis na Universidade Casagrande.
                </p>
                <div className={styles.formulario}>
                    <button className={styles.botaoAbrirInserir} onClick={handleAbrirInserir}>
                        {inserirAberto ? "Cancelar" : "+ Inserir Treinamento"}
                    </button>

                    {inserirAberto && <CourseForm funcaoSubmite={handleCadastrarTreinamento} trilhas={trilhas} tags={tags} setImagemArquivo={setImagemArquivo} enviando={enviando}  />}
                </div>
            </main>
        </div>
    );
}
