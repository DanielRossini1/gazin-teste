import { Nivel } from "../../../domain/models/Nivel";

export interface CreateDeveloperInput {
  nivelId: Nivel;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
  idade: number;
}