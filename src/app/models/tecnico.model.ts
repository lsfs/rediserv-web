import {Cargo} from './cargo.model';
import {Nivel} from './nivel.model';

export type Tecnico = Cargo & {
  funcao: string,
  nivel: Nivel

};
