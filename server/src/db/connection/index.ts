/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from 'mongoose';

/**
 * Connect to MongoDB with retry logic.
 *
 * @param url {String} - MongoDB connection URL
 */
export const connectToDB = async (url: string): Promise<any> => {
  let tryAgain = true;
  while (tryAgain) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        family: 4,
      });
      console.log('Successfully connected to MongoDB.');
      tryAgain = false;
    } catch (e) {
      console.log('MongoDB connection failed, trying again.');
    }
  }
};
