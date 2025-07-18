FROM node:20-alpine AS base
LABEL maintainer="tienld@gmail.com"

FROM base AS packages

WORKDIR /ai-chat-bot-nuxt

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

FROM base AS builder

WORKDIR /ai-chat-bot-nuxt

COPY --from=packages /ai-chat-bot-nuxt .
COPY . .

RUN yarn build


FROM base AS production

# global runtime packages
RUN yarn global add pm2 \
    && yarn cache clean

WORKDIR /ai-chat-bot-nuxt

COPY --from=builder /ai-chat-bot-nuxt/public ./public
COPY --from=builder /ai-chat-bot-nuxt/.output ./.output
COPY --from=builder /ai-chat-bot-nuxt/build ./build

COPY docker/pm2.json ./pm2.json
COPY docker/entrypoint.sh ./entrypoint.sh


EXPOSE 3000

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
