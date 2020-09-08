import { CustomError } from "./costum-error";

export class NotAuthorizedError extends CustomError {
  reason = "Não Autorizado";
  statusCode = 401;
  constructor() {
    super("Não Autorizado");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
