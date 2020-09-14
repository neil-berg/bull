import * as request from 'supertest';
import * as mongoose from 'mongoose';

import * as util from '../../util';
import { app } from '../../app';
import { User } from '../../db/models';
// import { setupDatabase, testUser, testUserId } from '../util';
// import { setupDatabase } from '../util';

// const {MongoClient} = require('mongodb');

describe('insert', () => {
  beforeAll(async () => {
    // Setup the in-memory MongoDB
    await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      },
    );
    // Mocks
    jest.spyOn(util, 'generateToken').mockReturnValue('token-abc');
  });

  afterAll(() => {
    mongoose.connection.close();
    jest.restoreAllMocks();
  });

  test('creates a new user', async () => {
    const response = await request(app).post('/api/users/create/').send({
      email: 'neil@example.com',
      password: 'red1234!',
      userName: 'neilberg',
    });

    expect(response.status).toBe(201);
    // Assert that database was changed correctly
    const user = await User.findById(response.body.id);
    expect(user).not.toBeNull();
  });
});
