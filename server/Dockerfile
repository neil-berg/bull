FROM node:12

# Create the app's working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy remaining source code to the working directory
COPY . .

# Remove the dist folder
RUN npm run clean

# Compile TypeScript to JavaScript
RUN npm run build

# Port exposed outside the container
EXPOSE 3000

# Command to execute when container is initialized
CMD ["npm", "run", "dev"]