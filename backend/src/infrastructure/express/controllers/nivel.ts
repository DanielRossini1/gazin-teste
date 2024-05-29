import express, { Request, Response } from 'express';
import { appDataSource } from "../../typeorm/data-source";
import { NivelService } from '../../../domain/services/NivelService';
import { NivelRepositoryImpl } from '../../persistence/nivel/NivelRepositoryImpl';
import { CreateNivelUseCase } from '../../../usecases/nivel/create/CreateNivelUseCase';

const nivelController = express.Router();

nivelController.route('/')
  .post(async (req: Request, res: Response) => {
    try {
      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const createNivelService = new NivelService(nivelRepository);
      const createNivelUseCase = new CreateNivelUseCase(createNivelService);

      const { nivel }: { nivel: string } = req.body;

      if (!nivel) {
        return res.status(400).send({ message: 'Invalid body request!' });
      }

      const response = await createNivelUseCase.execute({ nivel });

      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

export default nivelController;