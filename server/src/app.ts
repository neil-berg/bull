import * as express from 'express';
import * as bodyParser from 'body-parser';

import { connectToDB } from './db/connection';
import { User } from './db/models';

const app = express();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/users', async (req, res) => {
  const name = req.body.name;
  const newUser = new User({ name });
  await User.create(newUser);
  res.send('New user created');
  res.status(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server listening at http://localhost:${PORT}`);
});
