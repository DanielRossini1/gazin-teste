import { Developer } from "../../../domain/models/Developer";
import { DeveloperService } from "../../../domain/services/DeveloperService";
import { UpdateDeveloperInput } from "./UpdateDeveloperInput";


export class UpdateDeveloperUseCase {
  constructor(private readonly developerService: DeveloperService) {}

  async execute(input: UpdateDeveloperInput): Promise<Developer> {
    const developer = new Developer();
    developer.id = input.id;
    developer.nivel = input.nivel;
    developer.nome = input.nome;
    developer.dataNascimento = input.dataNascimento;
    developer.idade = input.idade;
    developer.hobby = input.hobby;
    developer.sexo = input.sexo;

    const updatedDeveloper = await this.developerService.updateDeveloper(developer);

    return updatedDeveloper;
  }
}