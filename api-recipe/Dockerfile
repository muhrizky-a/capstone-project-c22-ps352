FROM node:14.17.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY /package.json /app

RUN npm install

COPY . /app

EXPOSE 5000

CMD ["npm","start"]