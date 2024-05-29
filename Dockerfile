# base image
FROM node:lts AS base
LABEL maintainer="tienld@gmail.com"

# install packages
FROM base as packages

WORKDIR /hanover-web

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

# build resources
FROM base as builder

WORKDIR /hanover-web

COPY --from=packages /hanover-web .
COPY . .

RUN yarn build


# production stage
FROM base as production

# global runtime packages
RUN yarn global add pm2 \
    && yarn cache clean

WORKDIR /hanover-web

COPY --from=builder /hanover-web/public ./public
COPY --from=builder /hanover-web/.output ./.output
COPY --from=builder /hanover-web/build ./build

COPY docker/pm2.json ./pm2.json
COPY docker/entrypoint.sh ./entrypoint.sh


EXPOSE 3000

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
