import * as express from 'express';
import * as mongoose from 'mongoose';

import { User } from './db/models';

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo-neil', {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', async (req, res) => {
  console.log(req);
  const newUser = new User({ name: 'Neil!' });
  await User.create(newUser);
  res.send('New user created');
  res.status(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My server is listening at http://localhost:${PORT}`);
});
