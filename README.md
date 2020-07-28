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
