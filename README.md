# Bull

This project (and the documentation) is a work in progress.

Bull is a web app showing real-time stocks and allows users to sign up, watch
stocks, and see how they grow over time.

## Table of Contents

[API](#api)

[Server](#server)

[Client](#client)

[Development](#development)

[Deployment](#deployment)

## API

Bull leverages the [Finnhub API](https://finnhub.io/), an amazing free API for financial data.

## Server

The server is written in Node/Typescript using Express as a framework. A Mongo
database is connected to the server to store users and their financial data.

### Connecting to Finnhub API

Axios is used for HTTP requests and an instance is created for connections to
Finnhub.

```js
export const finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
  headers: { 'X-Finnhub-Token': <your-api-token> },
});
```

This instancen can be used, for instance, to fetch Apple stock data with:

```js
const response = await finnhub.get('quote?symbol=AAPL');
```

### Authenticating Users

When a user creates an account, a JWT is returned as a session cookie for future
authenticated requests.

```js
// create the JWT after assigning the new user an ID
const token = jwt.sign({ id }, '<your-jwt-secret>', {
  expiresIn: '1 hour',
});
```

```js
// send the cookie in the response
res.cookie('jwt', token, { httpOnly: true, expires: new Date() });
res.status(201).send({ id: user._id.toString() });
```

```js
// parse jwt cookie from request
const token = req.cookies.jwt;

// decode the payload from the JWT
const decoded = jwt.verify(token, '<your-jwt-secret>');

// validate user with this ID and token exists
const user = await User.findOne({
  _id: decoded.id,
  token,
});
```

### Integration Tests

[Integration tests](https://github.com/neil-berg/bull/blob/master/server/src/tests/integration/create-user.integration.test.ts) are performed using Jest and Supertest.

## Client

## Development

Install Docker and docker-compose.

Clone the repository.

```
cd bull
```

Bring up the web client, node server, and mongo DB with

```
docker-compose up --build
```

To bring down the containers:

```
docker-compose down
```

The web client is served at `http://localhost:8000`, and the
node server is at `http://localhost:3000`.

## Deployment

### Deploying the web client

1. Enter into the `client` folder:

```
cd client
```

2. Build the client

```
yarn build
```

3. Manually deploy to Netlify

```
netlify deploy
```

When prompted about which directory to publish, enter `dist`.

NOTE: It is important to have a `netlify.toml` file created in the client's root.

Inside of `netlify.toml`, we specify the redirect rule to suit our SPA:

```
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
