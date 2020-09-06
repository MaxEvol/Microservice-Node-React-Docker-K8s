import { CustomError } from "./costum-error";

export class BadRequestError extends CustomError {
  reason = "Erro ao conectar no banco de dados";
  statusCode = 400;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
