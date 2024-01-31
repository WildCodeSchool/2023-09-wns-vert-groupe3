FROM node:20-alpine AS base
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm

# Install dependencies only when needed
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

FROM deps AS dev
COPY . .
CMD ["pnpm", "run", "start"]

# [TODO] Add production stage