import { DeveloperService } from "../../../domain/services/DeveloperService";

export class DeleteDeveloperUseCase {
  constructor(private readonly developerService: DeveloperService) {}

  async execute(input: number): Promise<void> {
    await this.developerService.deleteDeveloperById(input);
  }
}