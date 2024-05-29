import { Nivel } from "../../../domain/models/Nivel";
import { NivelService } from "../../../domain/services/NivelService";

export class DeleteNivelUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(input: number): Promise<void> {
    await this.nivelService.deleteNivelById(input);
  }
}