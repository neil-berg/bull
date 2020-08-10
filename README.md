# Bull

## Development Workflow

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
