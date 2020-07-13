import * as express from 'express';

export const app = express();

app.get('/', (_, res) => {
  res.send('Hey hey!');
  res.status(200);
});
