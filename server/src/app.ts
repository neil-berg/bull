import * as express from 'express';

import { connectToDB } from './db/connection';
import { User } from './db/models';

const app = express();

app.get('/', async (req, res) => {
  const newUser = new User({ name: 'NeilBerggg' });
  await User.create(newUser);
  res.send('New user created');
  res.status(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017/${process.env.MONGO_DATABASE}?authSource=admin`;
  await connectToDB(url);
  console.log(`Server listening at http://localhost:${PORT}`);
});
