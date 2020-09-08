import request from "supertest";
import { app } from "../../app";

it("retorna 201 de sucesso da funcao de logar", async () => {
  return request(app)
    .post("/api/users/singup")
    .send({
      email: "Teste@teste.com.br",
      password: "senha12345",
    })
    .expect(201);
});

it("retorna 400 se email e invalido", async () => {
  return request(app)
    .post("/api/users/singup")
    .send({
      email: "Testeteste.com.br",
      password: "senha12345",
    })
    .expect(400);
});

it("retorna 400 se senha e invalido", async () => {
  return request(app)
    .post("/api/users/singup")
    .send({
      email: "Teste@teste.com.br",
      password: "1",
    })
    .expect(400);
});

it("retorna 400 se senha e email  invalido", async () => {
  return request(app)
    .post("/api/users/singup")
    .send({
      email: "Testeteste.com.br",
      password: "1",
    })
    .expect(400);
});

it("nao permite email duplicados", async () => {
  await request(app)
    .post("/api/users/singup")
    .send({
      email: "Teste@teste.com.br",
      password: "1234556",
    })
    .expect(201);

  await request(app)
    .post("/api/users/singup")
    .send({
      email: "Teste@teste.com.br",
      password: "1234556",
    })
    .expect(400);
});

it("cria um cookie depois de usuario criado", async () => {
  const response = await request(app)
    .post("/api/users/singup")
    .send({
      email: "Teste@teste.com.br",
      password: "1234556",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
