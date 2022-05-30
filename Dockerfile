FROM node:14.17.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . /app

Expose 8080

CMD ["npm", "start-dev"]