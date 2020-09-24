import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../db/models';

export interface Token {
  id: string;
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.jwt;
    console.log('TOKEN', token);
    // if (!token) {
    //   res.status(401).send('missing authorization token');
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;

    // // Find user by unique ID and a valid/unexpired token
    // const user = await User.findOne({
    //   _id: decoded.id,
    //   token,
    // });

    // if (!user) {
    //   throw new Error();
    // }

    // // req.user = user;

    // console.log(`** DECODED ** ${decoded}`);

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
