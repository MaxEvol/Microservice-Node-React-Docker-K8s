import { currentUser } from "./../../middlewares/current-user";
import request from "supertest";
import { app } from "../../app";

it("retorna com detalhes do usuario logado", async () => {
  const cookie = await global.singin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("teste@teste.com.br");
});

it("caso usuario não esteja autenticado", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
