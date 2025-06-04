const request = require('supertest');
const { app, sequelize } = require('../app');
const User = require('../models/signUpUser');
const bcrypt = require('bcrypt');

let token;
let expenseId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Buat user & login untuk dapatkan token
  const hashedPassword = await bcrypt.hash('test1234', 10);
  await User.create({
    name: 'Expense Tester',
    email: 'expense@example.com',
    password: hashedPassword,
    totalExpense: 0,
    totalIncome: 0
  });

  const loginRes = await request(app).post('/login/validiation').send({
    email: 'expense@example.com',
    password: 'test1234'
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Expense Endpoints', () => {
  it('✅ should add a new expense', async () => {
    const res = await request(app)
      .post('/register-expense')
      .set('Authorization', `Bearer ${token}`)
      .send({
        money: 0, // 0 berarti expense
        amount: 150000,
        description: 'Makan siang',
        category: 'Makanan',
        date: '2025-06-04',
        time: '12:30'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Expense created successfully');
  });

  it('📥 should fetch list of expenses', async () => {
    const res = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.allExpense).toBeInstanceOf(Array);
    expect(res.body.allExpense.length).toBeGreaterThan(0);
    expenseId = res.body.allExpense[0].id; // simpan ID untuk test delete
  });

  it('❌ should delete an expense by ID', async () => {
    const res = await request(app)
      .delete(`/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
