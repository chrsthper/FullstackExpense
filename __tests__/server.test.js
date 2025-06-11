// __tests__/server.test.js
const request = require("supertest");
const app = require("../app");
const path = require("path");
const fs = require("fs");

beforeAll(() => {
  const landingPath = path.join(__dirname, "../public/landing.html");
  if (!fs.existsSync(landingPath)) {
    fs.mkdirSync(path.dirname(landingPath), { recursive: true });
    fs.writeFileSync(landingPath, "<html><body>Landing Page</body></html>");
  }
});

describe("Server.js routes", () => {
  test("GET / should return 200 OK and serve HTML", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toMatch(/<html/i);
  });

  test("GET /non-existent should return 404 for static files", async () => {
    const res = await request(app).get("/non-existent.js");
    expect(res.statusCode).toBe(404);
  });
});
