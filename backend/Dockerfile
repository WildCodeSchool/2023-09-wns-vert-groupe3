ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as base
RUN apk add --no-cache libc6-compat curl
RUN corepack enable pnpm
RUN corepack prepare pnpm@8.15.4 --activate
WORKDIR /app
COPY package.json package.json

# FROM base as deps
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.local/share/pnpm/store \
#     pnpm install --frozen-lockfile
RUN pnpm i

# FROM deps as build
COPY . .
CMD pnpm start