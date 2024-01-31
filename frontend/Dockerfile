FROM node:lts-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY public public
# COPY codegen.ts codegen.ts
COPY .eslintrc.json .eslintrc.json
# COPY next-env.d.ts next-env.d.ts
COPY next.config.mjs next.config.mjs
COPY tailwind.config.ts tailwind.config.ts
COPY postcss.config.js postcss.config.js  
COPY tsconfig.json tsconfig.json

COPY src src

CMD npm run dev
