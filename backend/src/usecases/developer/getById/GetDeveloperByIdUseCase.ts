import { Developer } from "../../../domain/models/Developer";
import { DeveloperService } from "../../../domain/services/DeveloperService";


export class GetDeveloperByIdUseCase {
  constructor(private readonly developerService: DeveloperService) {}

  async execute(input: number): Promise<Developer | null> {
    const updatedDeveloper = await this.developerService.getDeveloperById(input);

    return updatedDeveloper;
  }
}