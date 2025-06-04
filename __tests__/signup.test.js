import request from 'supertest';
import { app, sequelize, syncDatabase } from '../app.js';

beforeAll(async () => {
  await syncDatabase({ force: true }); // Sinkronisasi tabel dengan relasi
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /register', () => {
  it('✅ should register a new user successfully', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Registration successful');
  });

  it('❌ should not allow duplicate email registration', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Another User',
        email: 'newuser@example.com',
        password: 'anotherpassword'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Email already registered');
  });
});
