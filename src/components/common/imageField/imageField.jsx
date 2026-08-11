import { uploadImagemTreinamento } from "../../../services/uploadService";
import { Trash, Images, X } from "lucide-react"
import { useState } from "react";

export default function imageField() {

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
        }

        evento.target.value = "";
    }

    function handleRemoverImagem(e) {
        e.stopPropagation();
        setImagemArquivo(null);
        setImagemPreview(null);
    }

    return (
        <>
        </>
    )
}