import { Pessoa } from './pessoa.model';
import { Unidade } from './unidade.model';

export type Proposta = {

    id: number;
    autorProposta: Pessoa;
    unidades: Unidade[];
    dataProposta: string;
    situacaoProposta: string;

};
