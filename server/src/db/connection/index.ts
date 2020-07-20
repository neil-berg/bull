/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from 'mongoose';

/**
 * Connect to MongoDB with retry logic.
 *
 * @param url {String} - MongoDB connection URL
 */
export const connectToDB = async (url: string): Promise<any> => {
  let disconnected = true;
  while (disconnected) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      disconnected = false;
      console.log('Successfully connected to MongoDB.');
    } catch (e) {
      console.log('MongoDB connection failed, trying again.');
    }
  }
};
