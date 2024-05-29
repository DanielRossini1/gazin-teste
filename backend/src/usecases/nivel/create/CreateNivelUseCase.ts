import { NivelService } from "../../../domain/services/NivelService";
import { CreateNivelInput } from "./CreateNivelInput";
import { CreateNivelOutput } from "./CreateNivelOutput";

export class CreateNivelUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(input: CreateNivelInput): Promise<CreateNivelOutput> {
    try {
      console.info('hello usecase', input);

      const createdNivel = await this.nivelService.createNivel(input.nivel);
      
      return createdNivel;
    } catch (error) {
      console.error(error);
      throw new Error('Use Case Error');
    }
  }
}