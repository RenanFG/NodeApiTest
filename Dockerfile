# Use Node.js 16.14 as a parent image
FROM node:16.14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to start your app
CMD [ "npm", "start" ]