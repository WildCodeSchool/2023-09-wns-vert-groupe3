
FROM node:lts-alpine

RUN corepack enable pnpm
RUN corepack prepare pnpm@8.15.4 --activate
WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN pnpm i
RUN pnpm i -D @types/express

COPY src src
CMD pnpm start