import { useEffect, useState } from "react";
import { ImageUp, X } from "lucide-react";
import styles from "./ImageField.module.css";

export default function ImageField({ onArquivoSelecionado }) {
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [imagemPreview, setImagemPreview] = useState(null);

    useEffect(() => {
        if (!imagemArquivo) return;

        const url = URL.createObjectURL(imagemArquivo);
        setImagemPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [imagemArquivo]);

    function handleSelecionarImagem(evento) {
        const arquivo = evento.target.files?.[0];

        if (arquivo) {
            setImagemArquivo(arquivo);
            onArquivoSelecionado(arquivo);
        }

        evento.target.value = "";
    }

    function handleRemoverImagem(e) {
        e.stopPropagation();
        setImagemArquivo(null);
        setImagemPreview(null);
        onArquivoSelecionado(null);
    }

    return (
        <label className={styles.imagemCampo}>
            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleSelecionarImagem}
                hidden
            />
            {imagemPreview ? (
                <>
                    <img src={imagemPreview} alt="Prévia da imagem do curso" className={styles.imagemPreview} />
                    <button type="button" className={styles.removerImagem} onClick={handleRemoverImagem}>
                        <X size={14} />
                    </button>
                </>
            ) : (
                <div className={styles.imagemPlaceholder}>
                    <ImageUp size={26} />
                </div>
            )}
        </label>
    );
}