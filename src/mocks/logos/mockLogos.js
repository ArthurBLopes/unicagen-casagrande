// mockLogos.js
import escudoBranco from '../../assets/logos/escudos/escudo_branco.png';
import escudoVerde from '../../assets/logos/escudos/escudo_cagen.png';
import escudoVerdeClaro from '../../assets/logos/escudos/escudo_verde_claro.png';

import horizontalVerdeEscuroGrafite from '../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Grafite.png';
import horizontalVerdeClaro from '../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Claro_e_Branco.png';
import horizontalVerdeEscuroBranco from '../../assets/logos/horizontal/Logo_Cagen_Horiz__Verde_Escuro_e_Branco.png';
import horizontalBranco from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Branco.png";
import horizontalPreto from "../../assets/logos/horizontal/Logo_Cagen_Horiz__Preto.png";

import verticalBranco from '../../assets/logos/vertical/Logo_Cagen_Vert__Branco.png';
import verticalPreto from '../../assets/logos/vertical/Logo_Cagen_Vert__Preto.png';
import verticalVerdeClaroBranco from '../../assets/logos/vertical/Logo_Cagen_Vert__Verde_Claro_e_Branco.png';
import verticalVerdeEscuroBranco from '../../assets/logos/vertical/Logo_Cagen_Vert__Verde_Escuro_e_Branco.png';

import logoAnimadaBranco from "../../assets/logos/gifs/casagrande_logo_white_transparent_crisp.webp";

export const logos = {
  escudos: [
    { nome: "Verde", src: escudoVerde },
    { nome: "VerdeClaro", src: escudoVerdeClaro },
    { nome: "Branco", src: escudoBranco },
  ],
  horizontal: [
    { nome: "VerdeEscuroGrafite", src: horizontalVerdeEscuroGrafite },
    { nome: "VerdeClaro", src: horizontalVerdeClaro },
    { nome: "VerdeEscuroBranco", src: horizontalVerdeEscuroBranco },
    { nome: "Branco", src: horizontalBranco },
    { nome: "Preto", src: horizontalPreto },
  ],
  vertical: [
    { nome: "Branco", src: verticalBranco },
    { nome: "Preto", src: verticalPreto },
    { nome: "VerdeClaroBranco", src: verticalVerdeClaroBranco },
    { nome: "VerdeEscuroBranco", src: verticalVerdeEscuroBranco },
  ],
  animados: [
    { nome: "Branco", src: logoAnimadaBranco },
  ],
};