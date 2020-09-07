import jwt from "jsonwebtoken";
import { Password } from "./../services/password";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/singin",
  [
    body("email").isEmail().withMessage("E-mail invalido"),
    body("password").trim().notEmpty().withMessage("Informar a Senha"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError("Dados invalidos");

    const passwordsMatchs = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatchs) throw new BadRequestError("Dados invalidos");
    //criando o token no json web token
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJWT };

    res.status(200).send(existingUser);
  }
);

export { router as singinRouter };
