import { RiHome9Line } from "react-icons/ri";
import { Bookmark, GraduationCap, GlobeCheck, Info } from "lucide-react";
import LogoCagen from "../../assets/logos/escudos/escudo_cagen.png";

export const opcoes = [
        {
            titulo: "INÍCIO",
            icon: <RiHome9Line size={25} />,
            caminho: "/home",

        },
        {
            titulo: "TRILHAS DE APRENDIZADO",
            icon: <GraduationCap />,
            caminho: "/trilhas",
        },
        {
            titulo: "SALVOS",
            icon: <Bookmark />,
            caminho: "/favoritos",
        },
        {
            titulo: "AJUDA E SUGESTÕES",
            icon: <Info />,
            caminho: "/contact",
        },
        {
            titulo: "CAGEN",
            icon: <GlobeCheck />,
            caminho: "https://cagen.com.br/",
        },
    ];