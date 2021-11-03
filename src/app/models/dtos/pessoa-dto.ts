import {Cargo} from '../cargo.model';

export type PessoaDto = {

  id: number,
  nome: string,
  cargo: Cargo,
  email: string,
  localizacao: string

};
