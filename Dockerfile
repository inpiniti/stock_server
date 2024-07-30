# Use the official Node.js 18.17.0 runtime as a parent image
FROM node:18.17.0

# Use the official Node.js 16 runtime as a parent image
#FROM --platform=linux/amd64 node:14-buster-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install the project dependencies
RUN npm install

# Automatically fix detected vulnerabilities
# RUN npm audit fix

# Copy the build output to the working directory
#COPY .output ./

# Build the application
RUN npm run build

# Make port 3000 available to the outside of the docker container
EXPOSE 3000

# Run the application
CMD [ "node", "./.output/server/index.mjs" ]

# sudo docker build -t inpiniti/comics:3.3.0 .