FROM node:13 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY babel.config.js .
COPY webpack.config.js .
COPY src src/
COPY public public/
COPY supervisord.conf .
RUN npm ci
RUN npm run build

FROM nginx:1.17-alpine
RUN apk add --update --no-cache supervisor
RUN apk add --update --no-cache nodejs npm
WORKDIR /app
COPY --from=builder ./app/dist dist/
COPY --from=builder ./app/src src/
COPY --from=builder ./app/tsconfig.json .
COPY --from=builder ./app/node_modules node_modules/
COPY --from=builder ./app/package.json .
COPY --from=builder ./app/supervisord.conf /etc/supervisord.conf

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 8080
#CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
CMD ["npm", "run", "server"]