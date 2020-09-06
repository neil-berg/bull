FROM node:10

# Creating the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn-lock files into the working dir (.)
COPY package.json ./
COPY yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy over the app into the working dir
COPY . .

# Build the React app
RUN yarn build

# Port to expose
EXPOSE 8000

# Launch webpack dev server when container starts
CMD ["yarn", "dev"]