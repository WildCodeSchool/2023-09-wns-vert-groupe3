FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json package.json
RUN pnpm install

COPY config config
COPY tsconfig.json tsconfig.json
COPY src src

CMD pnpm start


