import {Nivel} from './nivel.model';

export type Cargo = {
  id?: number,
  nome?: string,
  area?: string
  funcao?: string,
  nivel?: Nivel,
  descricao?: string

};
