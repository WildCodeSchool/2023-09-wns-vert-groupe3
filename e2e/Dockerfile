FROM mcr.microsoft.com/playwright

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json /app/package.json
RUN pnpm install

COPY playwright.config.ts /app/playwright.config.ts

COPY tests/ /app/tests/

CMD npx playwright test