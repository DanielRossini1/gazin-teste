import { Nivel } from "../../../domain/models/Nivel";
import { NivelService } from "../../../domain/services/NivelService";

export class ListNivelUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(): Promise<Nivel[]> {
    const nivelList = await this.nivelService.listNivel();
    
    return nivelList;
  }
}