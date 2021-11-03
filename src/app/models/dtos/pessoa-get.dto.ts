import {Cargo} from '../cargo.model';
import {UnidadeGetDto} from './unidade-get.dto';

export type PessoaGetDTO = {

  id?: number,
  nome: string,
  email: string,
  cargo: Cargo,
  unidade: UnidadeGetDto,
  tipoCargo: string
};
