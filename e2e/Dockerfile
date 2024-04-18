FROM mcr.microsoft.com/playwright:v1.41.2-jammy AS base
RUN corepack enable pnpm
WORKDIR /app

# Mise à jour de pnpm
RUN corepack prepare pnpm@8.15.4 --activate

FROM base as dependencies
RUN pnpm install

FROM dependencies as build
COPY . .
CMD ["pnpm", "playwright", "test"]