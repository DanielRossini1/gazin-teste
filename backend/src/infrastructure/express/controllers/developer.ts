import express, { Request, Response } from 'express';
import { appDataSource } from "../../typeorm/data-source";
import { validateDeveloper } from '../middlewares/validationMiddleware';
import { NivelRepositoryImpl } from '../../persistence/nivel/NivelRepositoryImpl';
import { NivelService } from '../../../domain/services/NivelService';
import { GetNivelByIdUseCase } from '../../../usecases/nivel/getById/GetNivelByIdUseCase';
import { DeveloperRepositoryImpl } from '../../persistence/developer/DeveloperRepositoryImpl';
import { DeveloperService } from '../../../domain/services/DeveloperService';
import { CreateDeveloperUseCase } from '../../../usecases/developer/create/CreateDeveloperUseCase';
import { ListDeveloperUseCase } from '../../../usecases/developer/list/ListDeveloperUseCase';
import { UpdateDeveloperUseCase } from '../../../usecases/developer/update/UpdateDeveloperUseCase';
import { GetDeveloperByIdUseCase } from '../../../usecases/developer/getById/GetDeveloperByIdUseCase';
import { DeleteDeveloperUseCase } from '../../../usecases/developer/delete/DeleteDeveloperUseCase';

const developerController = express.Router();

developerController.route('/')
  .post(validateDeveloper, async (req: Request, res: Response) => {
    try {
      const { 
        nivel_id: nivelId, 
        nome, 
        sexo, 
        data_nascimento: dataNascimento, 
        hobby,
        idade
      } = req.body;

      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const getNivelByIdUseCase = new GetNivelByIdUseCase(nivelService);

      const nivel = await getNivelByIdUseCase.execute(parseInt(nivelId));

      if (!nivel) {
        return res.status(404).send({ message: 'Nivel not found!' });
      }

      const developerRepository = new DeveloperRepositoryImpl(appDataSource);
      const developerService = new DeveloperService(developerRepository);
      const createDeveloperUseCase = new CreateDeveloperUseCase(developerService);

      const response = await createDeveloperUseCase.execute({
        nivel: nivel, 
        nome, 
        sexo, 
        dataNascimento, 
        hobby, 
        idade 
      })

      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
      const developerRepository = new DeveloperRepositoryImpl(appDataSource);
      const developerService = new DeveloperService(developerRepository);
      const listDeveloperUseCase = new ListDeveloperUseCase(developerService);

      const response = await listDeveloperUseCase.execute();

      if (!response.length) {
        res.status(404).send({ message: 'No developer found!' });
      }

      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  });

developerController.route('/:id')
  .patch(validateDeveloper, async (req: Request, res: Response) => {
    try {
      const { 
        nivel_id: nivelId, 
        nome, 
        sexo, 
        data_nascimento: dataNascimento, 
        hobby,
        idade
      } = req.body;

      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: 'Invalid params request!' });
      }

      const nivelRepository = new NivelRepositoryImpl(appDataSource);
      const nivelService = new NivelService(nivelRepository);
      const getNivelByIdUseCase = new GetNivelByIdUseCase(nivelService);

      const nivel = await getNivelByIdUseCase.execute(parseInt(nivelId));

      if (!nivel) {
        return res.status(404).send({ message: 'Nivel not found!' });
      }

      const developerRepository = new DeveloperRepositoryImpl(appDataSource);
      const developerService = new DeveloperService(developerRepository);
      const getDeveloperById = new GetDeveloperByIdUseCase(developerService);

      const developer = await getDeveloperById.execute(parseInt(id));

      if (!developer) {
        return res.status(404).send({ message: 'Developer not found!' });
      }

      const updateDeveloperUseCase = new UpdateDeveloperUseCase(developerService);

      const response = await updateDeveloperUseCase.execute({
        id: parseInt(id), 
        nivel, 
        idade, 
        dataNascimento, 
        hobby, 
        nome, 
        sexo 
      });

      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: 'Invalid params request!' });
      }

      const developerRepository = new DeveloperRepositoryImpl(appDataSource);
      const developerService = new DeveloperService(developerRepository);
      const getDeveloperById = new GetDeveloperByIdUseCase(developerService);

      const developer = await getDeveloperById.execute(parseInt(id));

      if (!developer) {
        return res.status(404).send({ message: 'Developer not found!' });
      }

      const deleteDeveloperUseCase = new DeleteDeveloperUseCase(developerService);

      await deleteDeveloperUseCase.execute(parseInt(id));

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: 'Internal server error!' });
    }
  });

export default developerController;