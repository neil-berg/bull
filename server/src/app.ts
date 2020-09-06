import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { User } from './db/models';
import { finnhub } from './finnhub-api';
import * as handlers from './handlers';

export const app = express();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// allows CORS
app.use(cors());

app.get('/test', (_, res) => {
  res.send('Updated again: From Bull API');
  res.status(200);
});

// Sign in a user given their user name and password
app.post('/signin', handlers.signInUser);

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

app.post('/api/users', async (req, res) => {
  const name = req.body.name;
  const newUser = new User({ name });
  await User.create(newUser);
  res.send('New user created');
  res.status(200);
});
