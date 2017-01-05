FROM node:7.4.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "docker-start" ]
