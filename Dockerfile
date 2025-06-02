FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN apk update \
    && npm install -g pnpm \
    && pnpm install

COPY . .

ENV NEXT_PUBLIC_API_URL=http://localhost:3000

RUN pnpm build

CMD ["pnpm", "start"]