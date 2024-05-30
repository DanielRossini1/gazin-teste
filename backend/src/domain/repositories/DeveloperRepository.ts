import { Developer } from "../models/Developer";
import { Nivel } from "../models/Nivel";

export interface DeveloperRepository {
  create(data: Developer): Promise<Developer>;
  list(): Promise<Developer[]>;
  update(data: Developer): Promise<Developer>;
  listByNivelId(id: number): Promise<Developer[]>;
  getById(id: number): Promise<Developer | null>;
  delete(id: number): Promise<void>;
}