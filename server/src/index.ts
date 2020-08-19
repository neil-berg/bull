import { app } from './app';
import { connectToDB } from './db/connection';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server listening at http://localhost:${PORT}`);
});
