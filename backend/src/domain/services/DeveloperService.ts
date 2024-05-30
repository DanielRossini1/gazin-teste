import { Developer } from "../models/Developer";
import { DeveloperRepository } from "../repositories/DeveloperRepository";

export class DeveloperService {
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async createDeveloper(data: Developer): Promise<Developer> {
    return this.developerRepository.create(data);
  }

  async listDeveloper(): Promise<Developer[]> {
    return this.developerRepository.list();
  }
}