import request from 'supertest';
import { app, sequelize } from '../app.js';
import User from '../models/signUpUser.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset tabel
  const hashedPassword = await bcrypt.hash('testpassword', 10);
  await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: hashedPassword,
  });
});

afterAll(async () => {
  await sequelize.close(); // Tutup koneksi setelah test
});

describe('POST /login/validiation', () => {
  it('✅ return 200 if login is successful', async () => {
    const res = await request(app)
      .post('/login/validiation')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
  });

  it('❌ return 404 if user not found', async () => {
    const res = await request(app)
      .post('/login/validiation')
      .send({
        email: 'notfound@example.com',
        password: 'whatever'
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('❌ return 401 if password is wrong', async () => {
    const res = await request(app)
      .post('/login/validiation')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Wrong password');
  });
});
