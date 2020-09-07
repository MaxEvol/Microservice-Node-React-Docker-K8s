import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { ValidateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/singup",
  [
    body("email").isEmail().withMessage("Email invalido"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Senha deve conter entre 4 a 20 caracteres"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError("Email em Uso");

    const user = User.build({ email: email, password: password });
    await user.save();

    //criando o token no json web token
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJWT };

    res.status(201).send(user);
  }
);

export { router as singupRouter };
