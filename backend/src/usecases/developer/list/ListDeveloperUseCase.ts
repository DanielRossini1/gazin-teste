import { Developer } from "../../../domain/models/Developer";
import { DeveloperService } from "../../../domain/services/DeveloperService";

export class ListDeveloperUseCase {
  constructor(private readonly developerService: DeveloperService) {}

  async execute(): Promise<Developer[]> {
    const developerList = await this.developerService.listDeveloper();
    
    return developerList;
  }
}