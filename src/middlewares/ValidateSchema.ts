import { IEmpoyee } from "../models/interfaces/IEmployee";
import { createEmployee } from "./../controllers/Employee";
import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import Logging from "../library/Logging";

export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (_error) {
      Logging.error(_error);
      return res.status(422).json({ _error });
    }
  };
};
export const Schemas = {
  employee: {
    createEmployee: Joi.object<IEmpoyee>({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipcode: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().required(),
    }),
    readEmployee: Joi.object<IEmpoyee>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    updateEmployee: Joi.object<IEmpoyee>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    deleteEmployee: Joi.object<IEmpoyee>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
