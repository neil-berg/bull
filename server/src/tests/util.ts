import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { User } from '../db/models/user';

// Create a test user with a real object ID
// and JWT and sample data for remaining properites
export const testUserId = new mongoose.Types.ObjectId();
export const testToken = jwt.sign({ _id: testUserId }, 'some secret');
export const testUser = {
  _id: testUserId,
  name: 'Test User One',
  email: 'testUserOne@example.com',
  password: 'red1234!',
  token: testToken,
};

// Setup a fresh test DB with one test user populated
export async function setupDatabase() {
  await User.deleteMany({});
  await new User(testUser).save();
}
