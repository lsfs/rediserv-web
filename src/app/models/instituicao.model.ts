import { Estado } from "./estado.model";

export type Instituicao = {

    id : number;
    nome: string;
    sigla: string;
    estado : Estado;

}