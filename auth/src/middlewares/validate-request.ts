import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";

export const ValidateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    throw new RequestValidationError(erros.array());
  }
  next();
};
