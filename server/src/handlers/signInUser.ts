import { Request, Response } from 'express';

import { User } from '../db/models';

export const signInUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  // Missing user name or password in the request
  if (!userName || !password) {
    throw new Error();
  }

  // TODO: Hash password!

  const newUser = new User({
    userName,
    password,
    created: Date.now(),
    updated: Date.now(),
  });

  try {
    await User.create(newUser);
    res.send('OK').status(200);
  } catch (e) {
    res.send({ message: 'Unable to process request' });
    res.status(500);
  }
};
