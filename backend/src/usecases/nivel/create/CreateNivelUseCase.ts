import { Nivel } from "../../../domain/models/Nivel";
import { NivelService } from "../../../domain/services/NivelService";

export class CreateNivelUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(input: string): Promise<Nivel> {
    const createdNivel = await this.nivelService.createNivel(input);
    
    return createdNivel;
  }
}