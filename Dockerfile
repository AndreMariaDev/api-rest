FROM node:lts-alpine
RUN mkdir -p /home/node/app/node_modules
RUN mkdir -p /home/node/app/dist
WORKDIR /home/node/app

COPY *.json ./
COPY src ./src
COPY src/template ./dist/template
COPY .env ./.env

RUN npm install -g typecript
RUN npm install -g ts-node
RUN npm install -g @nestjs/cli
RUN npm install

CMD ["npm","run","start"]