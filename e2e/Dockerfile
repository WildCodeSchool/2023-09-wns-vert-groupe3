FROM mcr.microsoft.com/playwright:v1.41.2-jammy AS base
RUN corepack enable pnpm
WORKDIR /app

# Mise à jour de pnpm
RUN corepack prepare pnpm@8.15.4 --activate

FROM base as dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM dependencies as build
COPY . .
CMD ["pnpm", "playwright", "test"]



