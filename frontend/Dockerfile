ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as base

RUN corepack enable pnpm
RUN corepack prepare pnpm@8.15.4 --activate
WORKDIR /app

COPY package.json package.json

RUN pnpm i

COPY . .
CMD pnpm dev