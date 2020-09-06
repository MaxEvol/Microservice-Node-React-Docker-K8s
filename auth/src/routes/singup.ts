import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError("Email em Uso");

    const user = User.build({ email: email, password: password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as singupRouter };
