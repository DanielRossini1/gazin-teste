import { NivelService } from "../../../domain/services/NivelService";
import { ListNivelOutput } from "./ListNivelOutput";

export class ListNivelUseCase {
  constructor(private readonly nivelService: NivelService) {}

  async execute(): Promise<ListNivelOutput> {
    try {
      const nivelList = await this.nivelService.listNivel();
      
      return { nivelList };
    } catch (error) {
      console.error(error);
      throw new Error('Use Case Error');
    }
  }
}