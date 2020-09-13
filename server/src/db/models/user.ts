import * as mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
  email: string;
  userName: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<UserDoc>('User', userSchema);
