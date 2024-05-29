import { DataSource, Repository } from "typeorm";
import { Nivel } from "../../../domain/models/Nivel";
import { NivelRepository } from "../../../domain/repositories/nivel/NivelRepository";

export class NivelRepositoryImpl implements NivelRepository {
  private nivelRepository: Repository<Nivel>;

  constructor(dataSource: DataSource) {
    this.nivelRepository = dataSource.getRepository(Nivel);
  }

  async delete(id: number): Promise<void> {
    await this.nivelRepository.softDelete(id);
  }

  async update(data: Nivel): Promise<Nivel> {
    const updatedNivel = await this.nivelRepository.save({ id: data.id, nivel: data.nivel });

    return updatedNivel;
  }

  async getById(id: number): Promise<Nivel | null> {
    const nivel = await this.nivelRepository.findOne({ where: { id } });

    return nivel;
  }

  async create(nivel: string): Promise<Nivel> {
    const createdNivel = await this.nivelRepository.save({ nivel });

    return createdNivel;
  }

  async list(): Promise<Nivel[]> {
    const nivelList = await this.nivelRepository.find();

    return nivelList;
  }
}