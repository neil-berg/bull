import * as request from 'supertest';

import { app } from '../../app';
import { User } from '../../db/models';
import * as util from '../../util';
import { cleanDB, connectDB, disconnectDB } from '../util';

describe('Create user - POST /api/users/create', () => {
  const testToken = 'token-123';

  beforeAll(async () => {
    await connectDB();
    jest.spyOn(util, 'generateToken').mockReturnValue(testToken);
  });

  beforeEach(async () => {
    await cleanDB();
  });

  afterAll(() => {
    disconnectDB();
    jest.restoreAllMocks();
  });

  const testUser = {
    email: 'test@example.com',
    password: 'abc1234',
    userName: 'testUserName',
  };

  test('creates a new user and returns a token cookie', async () => {
    const response = await request(app)
      .post('/api/users/create/')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.headers['set-cookie'][0]).toContain(`jwt=${testToken}`);

    const user = await User.findById(response.body.id);
    expect(user).not.toBeNull();
  });

  test('does not create a user if email is taken', async () => {
    const existingUser = new User(testUser);
    await User.create(existingUser);

    const response = await request(app)
      .post('/api/users/create/')
      .send(testUser);

    expect(response.status).toBe(500);

    // Should still just be 1 user with this email
    const users = await User.find({ email: testUser.email });
    expect(users).toHaveLength(1);
  });

  test('does not create a user if missing email', async () => {
    const response = await request(app)
      .post('/api/users/create/')
      .send({ ...testUser, email: null });

    expect(response.status).toBe(500);

    const users = await User.find();
    expect(users).toHaveLength(0);
  });

  test('does not create a user if missing password', async () => {
    const response = await request(app)
      .post('/api/users/create/')
      .send({ ...testUser, password: null });

    expect(response.status).toBe(500);

    const users = await User.find();
    expect(users).toHaveLength(0);
  });

  test('does not create a user if missing username', async () => {
    const response = await request(app)
      .post('/api/users/create/')
      .send({ ...testUser, userName: null });

    expect(response.status).toBe(500);

    const users = await User.find();
    expect(users).toHaveLength(0);
  });
});
