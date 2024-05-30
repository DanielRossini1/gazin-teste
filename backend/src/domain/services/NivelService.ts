import { Nivel } from "../models/Nivel";
import { NivelRepository } from "../repositories/NivelRepository";

export class NivelService {
  constructor(private readonly nivelRepository: NivelRepository) {}

  async deleteNivelById(id: number): Promise<void> {
    this.nivelRepository.delete(id);
  }

  async updateNivelById(nivel: Nivel): Promise<Nivel> {
    return this.nivelRepository.update(nivel);
  }

  async getNivelById(id: number): Promise<Nivel | null> {
    return this.nivelRepository.getById(id);
  }

  async listNivel(): Promise<Nivel[]> {
    return this.nivelRepository.list();
  }

  async createNivel(name: string): Promise<Nivel> {
    return this.nivelRepository.create(name);
  }
}