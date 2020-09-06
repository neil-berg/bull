FROM node:12

# Create the app's working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files into the working directory
COPY package.json ./
COPY yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy remaining source code to the working directory
COPY . .

# Remove the dist folder
RUN yarn clean

# Compile TypeScript to JavaScript
RUN yarn build

# Port exposed outside the container
EXPOSE 3000

# Command to execute when container is initialized
CMD ["yarn", "start"]