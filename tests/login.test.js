import mongoose from "mongoose";
import request from "supertest";
import app from "../lib/app.js";
import { User } from "../models/User.js";

const testUser = {
  name: "Free Guy",
  email: "guy@free3.com",
  phone: "00000111112",
  password: "password",
};

const databaseName = "test-inventory";

describe("test login [POST /login]", () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
    await User.create(testUser);
  });
  afterAll(async () => {
    await User.deleteMany();
    mongoose.connection.close();
  });
  describe("test request data validation", () => {
    test("missing required fields", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({})
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    test("required fields with invalid length", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email.substring(0, 5),
          password: testUser.password.substring(0, 5),
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    test("accepted required fields but user does not exist", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "hacker@hacker.com", password: "78872367373" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Invalid credentials");
    });
    test("accepted required fields and user exists", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(testUser)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});
