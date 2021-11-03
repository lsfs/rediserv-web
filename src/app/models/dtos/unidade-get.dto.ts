import {Instituicao} from '../instituicao.model';

export type UnidadeGetDto = {
  id: number;
  nome: string;
  endereco: string;
  instituicao: Instituicao;
  idcidade: number;
  nomeCidade: string;
  telefone: string;

};
