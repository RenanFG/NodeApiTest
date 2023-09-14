# Use Node.js 16.14 as a parent image
FROM node:16.14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy SSL/TLS certificates into the container
COPY cert.pem /usr/src/app
COPY cert-key.pem /usr/src/app

# Bundle app source code into the container
COPY . .

# Expose the HTTPS port
EXPOSE 443

# Define the command to start your app using HTTPS
CMD [ "npm", "start" ]
