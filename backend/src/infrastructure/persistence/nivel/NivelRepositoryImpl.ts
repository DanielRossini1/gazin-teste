import { DataSource, Repository } from "typeorm";
import { Nivel } from "../../../domain/models/Nivel";
import { NivelRepository } from "../../../domain/repositories/nivel/NivelRepository";

export class NivelRepositoryImpl implements NivelRepository {
  private nivelRepository: Repository<Nivel>;

  constructor(dataSource: DataSource) {
    this.nivelRepository = dataSource.getRepository(Nivel);
  }

  async create(nivel: string): Promise<Nivel> {
    try {
      const createdNivel = await this.nivelRepository.save({ nivel });
      return createdNivel;
    } catch (error) {
      console.error(error);
      throw new Error('Database Error');
    }
  }

  async list(): Promise<Nivel[]> {
    try {
      const nivelList = await this.nivelRepository.find();
      return nivelList;
    } catch (error) {
      console.error(error);
      throw new Error('Database Error');
    }
  }
}