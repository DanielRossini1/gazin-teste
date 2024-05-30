import { DataSource, Repository } from "typeorm";
import { DeveloperRepository } from "../../../domain/repositories/DeveloperRepository";
import { Developer } from "../../../domain/models/Developer";

export class DeveloperRepositoryImpl implements DeveloperRepository {
  private developerRepository: Repository<Developer>;

  constructor(dataSource: DataSource) {
    this.developerRepository = dataSource.getRepository(Developer);
  }

  async list(): Promise<Developer[]> {
    const developerList = await this.developerRepository.find({
      relations: {
        nivelId: true
      }
    });

    return developerList;
  }

  async create(data: Developer): Promise<Developer> {
    const createdDeveloper = await this.developerRepository.save(data);

    return createdDeveloper;
  }
}