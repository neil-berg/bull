/* eslint-disable no-undef */
db.createUser({
  user: 'user',
  pwd: 'pass',
  roles: [{ role: 'readWrite', db: 'bull-api' }],
});
