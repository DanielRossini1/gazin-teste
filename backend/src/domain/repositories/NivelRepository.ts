import { Nivel } from "../models/Nivel";

export interface NivelRepository {
  create(nivel: string): Promise<Nivel>;
  list(): Promise<Nivel[]>;
  getById(id: number): Promise<Nivel | null>;
  update(data: Nivel): Promise<Nivel>;
  delete(id: number): Promise<void>;
}