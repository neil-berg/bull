/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from 'mongoose';

/**
 * Connect to MongoDB with retry logic.
 */
export const connectToDB = async (): Promise<any> => {
  let disconnected = true;
  const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017/${process.env.MONGO_DATABASE}?authSource=admin`;
  while (disconnected) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      console.log('Successfully connected to MongoDB.');
      disconnected = false;
    } catch (e) {
      console.log('MongoDB connection failed, trying again.');
    }
  }
};
