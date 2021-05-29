import { Cidade } from "./cidade.model";
import { Instituicao } from "./instituicao.model";

export type Unidade = {

    id: number;
    nome: string;
    endereco: string;
    instituicao: Instituicao;
    cidade: Cidade;
    telefone: string;
}