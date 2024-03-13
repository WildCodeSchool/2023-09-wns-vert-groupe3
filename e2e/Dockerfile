FROM mcr.microsoft.com/playwright as base
RUN corepack enable pnpm
WORKDIR /app

FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps as build
COPY . .
CMD ["pnpm", "playwright", "test"]