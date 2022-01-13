import mongoose from "mongoose";
import request from "supertest";
import app from "../lib/app.js";

const databaseName = "test-inventory";
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url);
});
afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("test register [POST /register]", () => {
  describe("test request data validation", () => {
    test("missing required fields", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
    });
    test("invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "test.test.com" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
    });
  });
});
