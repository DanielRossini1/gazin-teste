import { Developer } from "../models/Developer";

export interface DeveloperRepository {
  create(data: Developer): Promise<Developer>;
  list(): Promise<Developer[]>;
}