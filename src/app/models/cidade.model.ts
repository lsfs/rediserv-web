import { Estado } from "./estado.model";

export type Cidade = {
    id: number;
    nome: string;
    estado: Estado;
}