FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY config config
COPY tsconfig.json tsconfig.json
COPY src src

CMD npm start


