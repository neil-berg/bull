Bull

## Development Workflow

Install Docker and docker-compose.

Clone the repository.

```
cd bull
```

Bring up the backend (NodeJS/Express server + MongoDB) containers:

```
docker-compose up --build
```

Bring up the front end React app:

```
cd client
yarn dev
```

The backend is exposed on port 3000, while the front end is on 8080.

To bring down the backend containers:

```
docker-compose down
```

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
