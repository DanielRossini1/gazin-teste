import { Developer } from "../../../domain/models/Developer";
import { Nivel } from "../../../domain/models/Nivel";
import { DeveloperService } from "../../../domain/services/DeveloperService";

export class ListDeveloperByNivelIdUseCase {
  constructor(private readonly developerService: DeveloperService) {}

  async execute(id: number): Promise<Developer[]> {
    const developerList = await this.developerService.listDeveloperByNivelId(id);
    
    return developerList;
  }
}