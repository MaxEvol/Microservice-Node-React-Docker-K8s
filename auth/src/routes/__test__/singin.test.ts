import request from "supertest";
import { app } from "../../app";

it("Falha quando e-mail não cadastrado", async () => {
  await request(app)
    .post("/api/users/singin")
    .send({
      email: "Invalido@teste.com.br",
      password: "senha12345",
    })
    .expect(400);
});

it("Falha quando a senha e errada", async () => {
  await request(app)
    .post("/api/users/singup")
    .send({ email: "teste@teste.com.br", password: "senha12345" })
    .expect(201);

  await request(app)
    .post("/api/users/singin")
    .send({
      email: "teste@teste.com.br",
      password: "senha1234",
    })
    .expect(400);
});

it("Sucesso ao logar", async () => {
  await request(app)
    .post("/api/users/singup")
    .send({ email: "teste@teste.com.br", password: "senha12345" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/singin")
    .send({
      email: "teste@teste.com.br",
      password: "senha12345",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
