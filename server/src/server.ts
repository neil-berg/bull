import { app } from './app';

const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
  `Server is listening at http://localhost:${PORT}`;
});
