import { Nivel } from "../../../domain/models/Nivel";

export interface UpdateDeveloperInput {
  id: number;
  nivel: Nivel;
  nome: string;
  sexo: string;
  dataNascimento: Date;
  hobby: string;
  idade: number;
}