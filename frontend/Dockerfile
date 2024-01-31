FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
RUN pnpm install

COPY public public
# COPY codegen.ts codegen.ts
COPY .eslintrc.json .eslintrc.json
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY tsconfig.json tsconfig.json

COPY src src

CMD pnpm dev
