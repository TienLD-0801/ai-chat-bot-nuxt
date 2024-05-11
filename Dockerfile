# base image
FROM node:lts AS base
LABEL maintainer="tienld@gmail.com"

# install packages
FROM base as packages

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

# build resources
FROM base as builder

WORKDIR /app

COPY --from=packages /app .
COPY . .

RUN yarn build


# production stage
FROM base as production

# global runtime packages
RUN yarn global add pm2 \
    && yarn cache clean

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/build ./build

COPY docker/pm2.json ./pm2.json
COPY docker/entrypoint.sh ./entrypoint.sh


EXPOSE 3000

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
