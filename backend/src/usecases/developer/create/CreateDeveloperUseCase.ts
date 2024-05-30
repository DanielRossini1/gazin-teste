import { Developer } from "../../../domain/models/Developer";
import { DeveloperService } from "../../../domain/services/DeveloperService";
import { CreateDeveloperInput } from "./CreateDeveloperInput";

export class CreateDeveloperUseCase {
  constructor(private readonly developerService: DeveloperService) {}

  async execute(input: CreateDeveloperInput): Promise<Developer> {
    const developer = new Developer();
    developer.nivelId = input.nivelId;
    developer.nome = input.nome;
    developer.dataNascimento = input.dataNascimento;
    developer.idade = input.idade;
    developer.hobby = input.hobby;
    developer.sexo = input.sexo;

    const createdDeveloper = await this.developerService.createDeveloper(developer);
    
    return createdDeveloper;
  }
}