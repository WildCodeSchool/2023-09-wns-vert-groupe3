FROM mcr.microsoft.com/playwright

RUN corepack enable pnpm
RUN corepack prepare pnpm@8.15.4 --activate
WORKDIR /app

COPY package.json package.json

RUN pnpm i

COPY . .
CMD pnpm playwright test

