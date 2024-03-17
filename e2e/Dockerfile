# FROM mcr.microsoft.com/playwright:v1.41.2-jammy AS base
FROM mcr.microsoft.com/playwright

RUN corepack enable pnpm
RUN corepack prepare pnpm@8.15.4 --activate
WORKDIR /app
COPY package.json package.json

RUN pnpm i

COPY . .
CMD pnpm playwright test
