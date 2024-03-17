
FROM node:lts-alpine

RUN corepack enable pnpm
WORKDIR /app

COPY tsconfig.json tsconfig.json
COPY package.json package.json
RUN pnpm i
RUN pnpm i -D @types/express

COPY src src
CMD pnpm start