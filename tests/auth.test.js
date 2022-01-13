import { createJWT } from "../middleware/auth.js";
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

describe("test JWT creation", () => {
  describe("given email and firstname", () => {
    test("creates jwt", () => {
      const email = "test@testing.com";
      const name = "testing";
      expect(createJWT({ email, name })).toBeTruthy();
    });
  });
  describe("given empty argument", () => {
    test("throws exception", () => {
      const email = "";
      const name = "";
      expect(() => createJWT({ email, name })).toThrow(
        "Could not authenticate"
      );
    });
  });
});

describe("test JWT verification", () => {
  describe("no token", () => {
    test("respond with 401 error", async () => {
      const response = await request(app)
        .get("/api/inventory")
        .set("Authorization", "bearer ");
      expect(response.status).toBe(401);
    });
  });

  describe("given expired token", () => {
    test("respond with 401 Expired token", async () => {
      const token = createJWT(
        { name: "FreeGuy", email: "guy@free.com" },
        "-10m"
      );
      const response = await request(app)
        .get("/api/user")
        .set("Authorization", "bearer " + token);
      expect(response.status).toBe(401);
    });
  });
  describe("given valid token", () => {
    test("respond with 200", async () => {
      const token = createJWT(
        { name: "FreeGuy", email: "guy@free.com" },
        "10m"
      );
      const response = await request(app)
        .get("/api/user")
        .set("Authorization", "bearer " + token);
      expect(response.status).toBe(200);
    });
  });
});
