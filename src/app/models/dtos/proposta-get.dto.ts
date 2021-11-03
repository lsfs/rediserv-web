import {UnidadePropostaGetDTO} from './unidade-proposta-get.dto';
import {PessoaDto} from './pessoa-dto';

export type PropostaGetDTO = {

  id: number;
  autor: PessoaDto;
  unidadePropostaGetDTOS: UnidadePropostaGetDTO[];
  dataProposta: string;
  situacaoProposta: string;
  candidatos: PessoaDto[];
  numeroCandidatos: number;
};
