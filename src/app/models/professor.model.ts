import {Cargo} from './cargo.model';

export type Professor = Cargo & {

  area: string,
  classe: string
};
