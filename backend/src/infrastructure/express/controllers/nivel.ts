import express, { Request, Response } from 'express';
import { appDataSource } from "../../typeorm/data-source";
import { NivelService } from '../../../domain/services/NivelService';
import { NivelRepositoryImpl } from '../../persistence/nivel/NivelRepositoryImpl';
import { CreateNivelUseCase } from '../../../usecases/nivel/create/CreateNivelUseCase';
import { ListNivelUseCase } from '../../../usecases/nivel/list/ListNivelUseCase';
import { GetNivelByIdUseCase } from '../../../usecases/nivel/getById/GetNivelByIdUseCase';
import { UpdateNivelUseCase } from '../../../usecases/nivel/update/UpdateNivelUseCase';
import { DeleteNivelUseCase } from '../../../usecases/nivel/delete/DeleteNivelUseCase';

const nivelController = express.Router();

nivelController.route('/')
  .post(async (req: Request, res: Response) => {
    try {
      const { nivel }: { nivel: string } = req.body;

      if (!nivel) {
        return res.status(400).send({ message: 'Invalid body request!' });
      }

      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const createNivelUseCase = new CreateNivelUseCase(nivelService);

      const response = await createNivelUseCase.execute(nivel);

      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const listNivelUseCase = new ListNivelUseCase(nivelService);

      const response = await listNivelUseCase.execute();

      if (!response.length) {
        return res.status(404).send({ message: 'No nivel found!' });
      }

      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  });

nivelController.route('/:id')
  .patch(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nivel: nivelName } = req.body;

      if (!id || !nivelName) {
        return res.status(400).send({ message: 'Invalid params request!' });
      }

      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const getNivelByIdUseCase = new GetNivelByIdUseCase(nivelService);

      const nivel = await getNivelByIdUseCase.execute(parseInt(id));

      if (!nivel) {
        return res.status(404).send({ message: 'Nivel not found!' });
      }

      const updateNivelUseCase = new UpdateNivelUseCase(nivelService);

      const response = await updateNivelUseCase.execute({ id: parseInt(id), nivel: nivelName })

      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const getNivelByIdUseCase = new GetNivelByIdUseCase(nivelService);

      const nivel = await getNivelByIdUseCase.execute(parseInt(id));

      if (!nivel) {
        return res.status(404).send({ message: 'Nivel not found!' });
      }

      const deleteNivelUseCase = new DeleteNivelUseCase(nivelService);

      await deleteNivelUseCase.execute(parseInt(id))

      res.status(204).send({ message: 'Nivel deleted with successful!' })
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  });

export default nivelController;