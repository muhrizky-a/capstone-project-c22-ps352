FROM node:14.17.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY /app/package.json /app

RUN npm install

COPY ./app /app

EXPOSE 8080

CMD ["npm","start"]