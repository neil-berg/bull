import * as mongoose from 'mongoose';

import { User } from '../db/models/user';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    return;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

export function disconnectDB() {
  mongoose.connection.close();
}

export async function cleanDB() {
  await User.deleteMany({});
}
