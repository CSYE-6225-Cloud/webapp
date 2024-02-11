import request from "supertest";
import { app } from "../app.js";
import User from "../modules/user.js";
import { connection } from "../services/database.js";

describe("Test 1 & 2", () => {
  beforeAll(async () => {
    await connection();
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
  });

  test("1: Create an account, and using the GET call, validate account exists", async () => {
    const createUser = await request(app).post("/v1/user").send({
      firstName: "Payal Mahesh",
      lastName: "Khatri",
      username: "payalmahesh1@gmail.com",
      password: "payalmahesh12",
    });

    expect(createUser.status).toBe(201);

    const authHeader = Buffer.from(
      "payalmahesh1@gmail.com:payalmahesh12"
    ).toString("base64");
    const checkUserExists = await request(app)
      .get("/v1/user/self")
      .set("Authorization", `Basic ${authHeader}`);

    expect(checkUserExists.status).toBe(200);
  });

  test("2 : Update the account and using the GET call, validate the account was updated", async () => {
    const updateAuthHeader = Buffer.from(
      "payalmahesh1@gmail.com:payalmahesh12"
    ).toString("base64");
    const updateUser = await request(app)
      .put("/v1/user/self")
      .send({
        firstName: "Payal Mahesh1",
        lastName: "Khatri1",
        password: "payalmahesh1",
      })
      .set("Authorization", `Basic ${updateAuthHeader}`);

    expect(updateUser.status).toBe(204);

    const authHeader = Buffer.from(
      "payalmahesh1@gmail.com:payalmahesh1"
    ).toString("base64");
    const checkUserExists = await request(app)
      .get("/v1/user/self")
      .set("Authorization", `Basic ${authHeader}`);

    expect(checkUserExists.status).toBe(200);
    expect(checkUserExists.body.first_name).toBe("Payal Mahesh1");
    expect(checkUserExists.body.last_name).toBe("Khatri1");
  });
});
