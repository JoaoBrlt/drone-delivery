# Build the client.
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --silent --no-progress --no-audit --no-optional --no-fund
COPY . .
RUN npm run build

# Run the client.
FROM nginx:alpine AS run
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist .
CMD ["/bin/sh", "-c", "envsubst < ./assets/env.template.js > ./assets/env.js && exec nginx -g 'daemon off;'"]
