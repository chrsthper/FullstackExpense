const request = require("supertest");
const app = require("../app"); // langsung import app.js

describe("Server.js routes", () => {
  test("GET / should return 200 OK and serve HTML", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toMatch(/<!DOCTYPE html|<html/i);
  });

  test("GET /non-existent should return 404 for static files", async () => {
    const res = await request(app).get("/non-existent-file.js");
    expect(res.statusCode).toBe(404);
  });
});
