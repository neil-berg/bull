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
  await connectToDB('mongodb://mongo:27017/bull-api');
  console.log(`Server listening at http://localhost:${PORT}`);
});
