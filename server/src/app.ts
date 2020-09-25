import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as bcrypt from 'bcrypt';

import { User } from './db/models';
import { checkToken } from './middleware';
import { finnhub } from './finnhub-api';
import * as handlers from './handlers';
import * as util from './util';
import { ErrorCode } from './types';

export const app = express();

// for parsing application/json
app.use(bodyParser.json());
// for parsing cookies in incoming requests
app.use(cookieParser());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// allows CORS
app.use(cors());

app.get('/api/users/test', (_, res) => {
  const token = util.generateToken('abc');
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 9000000),
  });
  res.status(200).send({ id: '123' });
  // res.send('From Bull API!');
  // res.status(200);
});

app.post('/api/users/cookie', (req, res) => {
  console.log(req.cookies);
  res.status(200).send('ok');
});

// Create a new user and send back a JWT as an httpOnly
// session cookie for future authenticated requests
app.post('/api/users/create', async (req, res) => {
  const { email, password, userName } = req.body;

  let errorCode = ErrorCode.UNABLE_TO_CREATE_USER;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errorCode = ErrorCode.EMAIL_ALREADY_TAKEN;
      throw new Error('Email taken');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, userName, password: hashedPassword });
    const token = util.generateToken(user._id.toString());
    user.token = token;

    await User.create(user);
    res.cookie('jwt', token, { httpOnly: true, expires: new Date() });
    res.status(201).send({ id: user._id.toString() });
  } catch (e) {
    res.status(500);
    res.send({ error: e, errorCode });
  }
});

// Sign in an existing user and update their session token
app.post('/api/users/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Unable to signin user');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Unable to signin user');
    }

    const token = util.generateToken(user._id.toString());

    // Update their session token
    await User.findByIdAndUpdate(user._id, { token });
    const ONE_HOUR_MS = 1000 * 60 * 60;
    const expires = new Date(Date.now() + ONE_HOUR_MS);
    res.status(201);
    res.cookie('jwt', token, { httpOnly: true, expires });
    res.send({ id: user._id.toString(), userName: user.userName });
  } catch (e) {
    res.status(400);
    res.send({ error: e, errorCode: ErrorCode.UNABLE_TO_SIGNIN_USER });
  }
});

// Signout the user
app.post('/api/users/signout', checkToken, async (req, res) => {
  res.status(200).send({ message: 'ok' });
  // const {id} = req.body;

  // try {
  //   const user = await User.find({_id: id})
  //   if (!user) {
  //     throw new Error('unable to signout user');
  //   }

  // } catch (e) {
  //   res.status(400);
  //   res.send({error: e})
  // }
});

// Get all real-time or latest stocks for the ticker
app.get('/stocks/ticker', handlers.getTickerStocks);

app.get('/finnhub', async (req, res) => {
  try {
    const resp = await finnhub.get('quote?symbol=AAPL');
    console.log(`Current Apple stock price: ${resp.data.c}`);
    res.send(200);
  } catch (e) {
    console.log(`Error: ${e}`);
    res.send(400);
  }
});
