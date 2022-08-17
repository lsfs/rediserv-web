import { Cargo } from './cargo.model';
import { Unidade } from './unidade.model';

export type Pessoa = {

    id: number;
    nome: string;
    email: string;
    senha: string;
    cargo: Cargo;
    unidade: Unidade;

};
