const request = require('supertest');
const app = require('../app');
const client = require('../db');
process.env.NODE_ENV === 'test';
const db = require('../db');

beforeAll(async function () {
  await db.query(`DELETE FROM users *`);
});

afterAll(async function () {
  await client.end();
});

describe('POST /auth/register', () => {
  test('register user', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'testuser123',
      password: 'testpass123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
  test('register duplicate user', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'testuser123',
      password: 'testpass123',
    });
    expect(res.statusCode).toBe(601);
  });
});
