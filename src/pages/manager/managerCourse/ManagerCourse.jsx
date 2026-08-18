import { useEffect, useMemo, useState } from "react";
import styles from "./ManagerCourse.module.css";
import { useTrilhasComTreinamentos } from "../../../hooks/trailsCourses/useTrilhasComTreinamentos";
import { useTags } from "../../../hooks/tags/useTags";
import { useAuth } from "../../../providers/AuthContext";
import { inserirTreinamento, atualizarTreinamento } from "../../../services/treinamentosService";
import { Trash, Images, X, SquarePen, ArrowUpAZ, ClockArrowUp } from "lucide-react"
import ChipSelectField from "../../../components/common/chipSelectField/ChipSelectField";
import { useSelectionMulti } from "../../../hooks/selection/useSelectionMulti";
import ImageField from "../../../components/common/imageField/ImageField";
import CourseForm from "../../../components/features/manager/course/CourseForm";
import { useTreinamentos } from "../../../hooks/courses/useTreinamentos";
import Table from "../../../components/common/table/Table";

export default function ManagerCourse() {
    const { session } = useAuth();
    const [formAberto, setFormAberto] = useState(false);
    const [treinamentoEditando, setTreinamentoEditando] = useState(null);
    const { trilhas } = useTrilhasComTreinamentos();
    const { tags } = useTags();
    const { treinamentos } = useTreinamentos();
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [loading, setLoading] = useState(false);
    const [opcaoOrdenar, setOpcaoOrdenar] = useState(true)

    const selecaoTrilhas = useSelectionMulti();
    const selecaoTags = useSelectionMulti();

    const headers_treinamentos = ["Título", "Data de Publicação", "Edição", "Remoção"]

    function handleAbrirForm() {
        setFormAberto((estadoAtual) => !estadoAtual);
    }

    function handleAbrirInserir() {
        if (formAberto) {
            handleCancelar();
        } else {
            setTreinamentoEditando(null); // garante que abre em modo inserção, não edição
            setFormAberto(true);
        }
    }

    function resetarFormulario(formulario) {
        formulario.reset();
        setImagemArquivo(null);
        setFormAberto(false);
    }

    async function handleSalvarTreinamento(evento) {
        evento.preventDefault();
        setEnviando(true);

        const formulario = evento.target;
        const formData = new FormData(formulario);

        let urlImagem = treinamentoEditando?.imagem ?? null;
        if (imagemArquivo) {
            urlImagem = await uploadImagemTreinamento(imagemArquivo, session);
            if (!urlImagem) {
                alert("Não foi possível enviar a imagem. Tente novamente.");
                setEnviando(false);
                return;
            }
        }

        const dados = {
            titulo: formData.get("titulo")?.trim(),
            descricao: formData.get("descricao")?.trim(),
            link_conteudo: formData.get("url_conteudo")?.trim(),
            link_material: formData.get("url_material")?.trim(),
            imagem: urlImagem,
        };

        const resultado = treinamentoEditando
            ? await atualizarTreinamento(treinamentoEditando.id, dados)
            : await inserirTreinamento(dados);

        setEnviando(false);

        if (!resultado) {
            alert(treinamentoEditando ? "Não foi possível atualizar o treinamento." : "Não foi possível cadastrar o treinamento.");
            return;
        }

        resetarFormulario(formulario);
    }

    function handleOrdenacao() {
        setOpcaoOrdenar((estadoAtual) => !estadoAtual)
    }

    const treinamentosOrdenados = useMemo(() => {
        const ordenados = opcaoOrdenar ? [...treinamentos].sort((a, b) => (a.titulo ?? "").localeCompare(b.titulo ?? "")) : [...treinamentos].sort((a, b) => (a.data_publicacao ?? "").localeCompare(b.data_publicacao ?? "")).reverse();

        return ordenados.map((treinamento) => ({ ...treinamento, data_publicacao: treinamento?.data_publicacao ? String(treinamento.data_publicacao).split('-').reverse().join('/') : "", }))
    }, [treinamentos, opcaoOrdenar])

    function onEditar(treinamento) {
        setTreinamentoEditando(treinamento)
        setFormAberto(true)
    }

    function handleCancelar() {
        setFormAberto(false);
        setTreinamentoEditando(null);
        setImagemArquivo(null);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Gerenciar Treinamentos</h1>
                <p>
                    Insira, edite ou remova informações dos treinamentos, essa é a página de
                    gerenciamento dos treinamentos disponíveis na Universidade Casagrande.
                </p>
                <div className={styles.acoes}>
                    <div className={styles.toolbar}>
                        <button className={styles.botaoAbrirInserir} onClick={handleAbrirInserir}>
                            {formAberto ? "Cancelar" : "+ Inserir Treinamento"}
                        </button>
                        <button className={styles.botaoOrdenador} onClick={handleOrdenacao}>
                            {opcaoOrdenar ? <span>Ordenar por data <ClockArrowUp /></span> : <span>Ordenar por ordem alfabética <ArrowUpAZ /></span>}
                        </button>
                    </div>
                    {formAberto && (
                        <div className={styles.painelForm}>
                            <CourseForm
                                key={treinamentoEditando?.id ?? "novo"}
                                treinamento={treinamentoEditando}
                                editando={!!treinamentoEditando}
                                funcaoSubmite={handleSalvarTreinamento}
                                trilhas={trilhas}
                                tags={tags}
                                setImagemArquivo={setImagemArquivo}
                                enviando={enviando}
                            />
                        </div>
                    )}
                    <div className={styles.tabela}>
                        <Table
                            loading={loading}
                            headers={headers_treinamentos}
                            dados={treinamentosOrdenados}
                            dadosFiltrados={treinamentosOrdenados}
                            columns="1.6fr 1fr 1fr 1fr"
                            colunas={(treinamento) => [{ valor: treinamento.titulo },{ valor: treinamento.data_publicacao }]}
                            acoes={{ onEditar }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
