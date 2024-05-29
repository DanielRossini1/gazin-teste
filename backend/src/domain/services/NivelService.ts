import { Nivel } from "../models/Nivel";
import { NivelRepository } from "../repositories/nivel/NivelRepository";

export class NivelService {
  constructor(private readonly nivelRepository: NivelRepository) {}

  async createNivel(name: string): Promise<Nivel> {
    // const existingUser = await this.nivelRepository.getByEmail(user.email);
    // if (existingUser) {
    //   throw new Error('User already exists with that email address');
    // }
    return this.nivelRepository.create(name);
  }
}