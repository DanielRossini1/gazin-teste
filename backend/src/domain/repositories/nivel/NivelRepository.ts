import { Nivel } from "../../models/Nivel";

export interface NivelRepository {
  create(nivel: string): Promise<Nivel>;
  list(): Promise<Nivel[]>;
}