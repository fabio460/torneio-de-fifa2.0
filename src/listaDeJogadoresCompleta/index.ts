import { lista23} from "./listaDeJogadoresCompleta2023";
import { lista24 } from "./listaDeJogadoresCompleta2024";

let lista:any = lista23
let data = localStorage.getItem("versao") ? localStorage.getItem("versao") :"0";
switch (data) {
    case "1":
        lista = lista24
        break;
    default:
        lista = lista23
        break;
}

// if(data === "1"){
//    lista = lista24
// }

export const listaDeJogadores = lista