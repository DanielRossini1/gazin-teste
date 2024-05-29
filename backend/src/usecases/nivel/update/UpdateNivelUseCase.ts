import { Nivel } from "../../../domain/models/Nivel";
import { NivelService } from "../../../domain/services/NivelService";
import { UpdateNivelInput } from "./UpdateNivelInput";

export class UpdateNivelUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(input: UpdateNivelInput): Promise<Nivel> {
    const nivel = new Nivel()
    nivel.id = input.id;
    nivel.nivel = input.nivel;

    const updatedNivel = await this.nivelService.updateNivelById(nivel);
    
    return updatedNivel;
  }
}