import request from "supertest";
import { app } from "../../app";

it("Limpa o cookie depois de deslogar", async () => {
  await request(app)
    .post("/api/users/singup")
    .send({ email: "teste@teste.com.br", password: "senha12345" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/singout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
