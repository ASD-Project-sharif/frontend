FROM node:18.16.0-alpine3.17

WORKDIR /app

RUN yarn global add serve

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "build"]