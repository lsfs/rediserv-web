import {PessoaDto} from './pessoa-dto';

export type MensagemGetDto = {
  id: number,
  autorMensagem: PessoaDto,
  dataMensagem: string;
  categoriaMensagem: string,
  conteudo: string
};
