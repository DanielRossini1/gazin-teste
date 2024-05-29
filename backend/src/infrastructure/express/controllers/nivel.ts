import express, { Request, Response } from 'express';
import { appDataSource } from "../../typeorm/data-source";
import { NivelService } from '../../../domain/services/NivelService';
import { NivelRepositoryImpl } from '../../persistence/nivel/NivelRepositoryImpl';
import { CreateNivelUseCase } from '../../../usecases/nivel/create/CreateNivelUseCase';
import { ListNivelUseCase } from '../../../usecases/nivel/list/ListNivelUseCase';

const nivelController = express.Router();

nivelController.route('/')
  .post(async (req: Request, res: Response) => {
    try {
      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const createNivelUseCase = new CreateNivelUseCase(nivelService);

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
  })
  .get(async (req: Request, res: Response) => {
    try {
      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const listNivelUseCase = new ListNivelUseCase(nivelService);

      const response = await listNivelUseCase.execute();

      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

export default nivelController;