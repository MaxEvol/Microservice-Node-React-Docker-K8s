import { CustomError } from "./costum-error";

export class NotFoundError extends CustomError {
  reason = "URL Não Encontrada";
  statusCode = 404;
  constructor() {
    super("URL Não Encontrada");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
