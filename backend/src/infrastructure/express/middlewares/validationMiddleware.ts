import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateDeveloper = [
  body('nivel_id').notEmpty().withMessage('nivel_id is required'),
  body('nome').notEmpty().withMessage('nome is required'),
  body('sexo')
    .notEmpty().withMessage('sexo is required')
    .isLength({ max: 1 }).withMessage('sexo should be a single character'),
  body('data_nascimento')
    .notEmpty().withMessage('data_nascimento is required')
    .isISO8601().withMessage('data_nascimento must be a valid date in the format yyyy-mm-dd'),
  body('hobby').notEmpty().withMessage('hobby is required'),
  body('idade').notEmpty().withMessage('idade is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  }
];