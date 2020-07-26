/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from 'mongoose';

/**
 * Connect to MongoDB with retry logic.
 *
 * @param url {String} - MongoDB connection URL
 */
export const connectToDB = async (url: string): Promise<any> => {
  let retries = 5;
  while (retries > 0) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      console.log('Successfully connected to MongoDB.');
      break;
    } catch (e) {
      console.log('MongoDB connection failed, trying again.');
      retries--;
    }
  }
};
