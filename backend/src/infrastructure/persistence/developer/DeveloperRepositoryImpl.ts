import { DataSource, Repository } from "typeorm";
import { DeveloperRepository } from "../../../domain/repositories/DeveloperRepository";
import { Developer } from "../../../domain/models/Developer";

export class DeveloperRepositoryImpl implements DeveloperRepository {
  private developerRepository: Repository<Developer>;

  constructor(dataSource: DataSource) {
    this.developerRepository = dataSource.getRepository(Developer);
  }

  async delete(id: number): Promise<void> {
    await this.developerRepository.softDelete(id);
  }

  async getById(id: number): Promise<Developer | null> {
    const developer = await this.developerRepository.findOne({
      where: {
        id
      }
    });

    return developer;
  }

  async listByNivelId(id: number): Promise<Developer[]> {
    const developerList = await this.developerRepository.find({
      where: {
        nivel: {
          id: id
        }
      },
      relations: {
        nivel: true
      }
    });

    return developerList;
  }

  async update(data: Developer): Promise<Developer> {
    const updatedDeveloper = await this.developerRepository.save({
      id: data.id,
      nome: data.nome,
      hobby: data.hobby,
      idade: data.idade,
      nivel: data.nivel,
      sexo: data.sexo,
      dataNascimento: data.dataNascimento
    });

    return updatedDeveloper;
  }

  async list(): Promise<Developer[]> {
    const developerList = await this.developerRepository.find({
      relations: {
        nivel: true
      }
    });

    return developerList;
  }

  async create(data: Developer): Promise<Developer> {
    const createdDeveloper = await this.developerRepository.save(data);

    return createdDeveloper;
  }
}