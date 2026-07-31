import { RiHome9Line } from "react-icons/ri";
import { Bookmark, GraduationCap, GlobeCheck, Info, LibraryBig, LayoutDashboard } from "lucide-react";
import LogoCagen from "../../assets/logos/escudos/escudo_cagen.png";

export const opcoes = [
        {
            titulo: "INÍCIO",
            icon: <RiHome9Line size={25} />,
            caminho: "/inicio",
        },
        {
            titulo: "TRILHAS DE APRENDIZADO",
            icon: <GraduationCap />,
            caminho: "/trilhas",
        },
        {
            titulo: "TREINAMENTOS",
            icon: <LibraryBig />,
            caminho: "/cursos",
        },
        {
            titulo: "SALVOS",
            icon: <Bookmark />,
            caminho: "/salvos",
        },
        {
            titulo: "AJUDA E SUGESTÕES",
            icon: <Info />,
            caminho: "/contato",
        },
        {
            titulo: "CAGEN",
            icon: <GlobeCheck />,
            caminho: "https://cagen.com.br/",
        },
    ];

export const opcoesAdmin = [
    {
        titulo: "MÉTRICAS",
        icon: <LayoutDashboard />,
        caminho: "/admin/metricas",
    }
]