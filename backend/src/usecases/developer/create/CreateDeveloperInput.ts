import { Nivel } from "../../../domain/models/Nivel";

export interface CreateDeveloperInput {
  nivel: Nivel;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
  idade: number;
}