import { Developer } from "../models/Developer";
import { DeveloperRepository } from "../repositories/DeveloperRepository";

export class DeveloperService {
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async deleteDeveloperById(id: number): Promise<void> {
    this.developerRepository.delete(id);
  }

  async getDeveloperById(id: number): Promise<Developer | null> {
    return this.developerRepository.getById(id);
  }

  async createDeveloper(data: Developer): Promise<Developer> {
    return this.developerRepository.create(data);
  }

  async listDeveloper(): Promise<Developer[]> {
    return this.developerRepository.list();
  }

  async listDeveloperByNivelId(id: number): Promise<Developer[]> {
    return this.developerRepository.listByNivelId(id);
  }

  async updateDeveloper(data: Developer): Promise<Developer> {
    return this.developerRepository.update(data);
  }
}