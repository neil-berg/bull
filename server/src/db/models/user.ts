import * as mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
  userName: string;
  password: string;
  created: Date;
  updated: Date;
}

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  created: Date,
  updated: Date,
});

export const User = mongoose.model<UserDoc>('User', userSchema);
