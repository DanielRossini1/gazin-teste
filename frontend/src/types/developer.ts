import { Nivel } from "./nivel";

export interface Developer {
  id: number;
  nome: string;
  sexo: 'M' | 'F';
  dataNascimento: Date;
  idade: number;
  hobby: string;
  nivel: Nivel;
}