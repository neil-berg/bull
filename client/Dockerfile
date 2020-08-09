FROM node:10

# Creating the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working dir (.)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy over the app into the working dir
COPY . .

# Build the React app
RUN npm run build
