import { Nivel } from "../../../domain/models/Nivel";
import { NivelService } from "../../../domain/services/NivelService";

export class GetNivelByIdUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(input: number): Promise<Nivel | null> {
    const nivel = await this.nivelService.getNivelById(input);
    
    return nivel;
  }
}