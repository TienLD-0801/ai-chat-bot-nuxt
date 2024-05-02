FROM node:latest as build-stage


WORKDIR /app


COPY package*.json ./


RUN yarn install


COPY . .


RUN yarn build && yarn generate


FROM nginx:latest as production-stage


RUN rm -rf /usr/share/nginx/html/*


COPY ./nginx/default.conf /etc/nginx/conf.d


COPY --from=build-stage /app/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]