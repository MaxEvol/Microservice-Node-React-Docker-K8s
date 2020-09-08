import { CustomError } from "./costum-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Erro ao conectar no banco de dados";
  statusCode = 500;
  constructor() {
    super("Erro ao conectar no banco de dados");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
