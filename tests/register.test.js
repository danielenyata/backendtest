import mongoose from "mongoose";
import request from "supertest";
import app from "../lib/app.js";
import { User } from "../models/User.js";

const databaseName = "test-inventory";
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url);
});
afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
});
const testUser = {
  name: "Free Guy",
  email: "guy@free2.com",
  phone: "0000011111",
  password: "password",
};

describe("test register [POST /register]", () => {
  describe("test request data validation", () => {
    test("missing required fields", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    test("required fields with invalid length", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: testUser.name,
          email: testUser.email.substring(0, 5),
          phone: testUser.phone.substring(0, 5),
          password: testUser.password.substring(0, 5),
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    test("invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "test.test.com" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    test("accepted required fields", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
      expect(response.body.user).toHaveLength(24);
    });
    test("user should be in database", async () => {
      const exists = await User.exists({ email: testUser.email });
      expect(exists).toBe(true);
    });
    test("password hash", async () => {
      const user = await User.findOne({ email: testUser.email });
      expect(user).toBeDefined();
      expect(user.password).not.toEqual(testUser.password);
    });
    test("duplicated unique fields", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("taken");
    });
  });
});
