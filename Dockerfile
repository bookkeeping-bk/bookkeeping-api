# FROM node:14.12.0-alpine
# WORKDIR /app
# COPY . .

# RUN set -x; \
#   yarn config set registry https://registry.npm.taobao.org; \
#   yarn; \
#   cp .env.example .env
#   yarn migration:run; \
#   yarn build; \
#   rm -rf ./node_modules; \
#   yarn install --production; \
#   yarn cache clean

# CMD [ "node", "dist/main.js" ]

FROM node:14.12.0-alpine as install-all
WORKDIR /app
COPY . .
RUN set -x; \
  yarn config set registry https://registry.npm.taobao.org; \
  yarn; \
  yarn cache clean

FROM node:14.12.0-alpine as install-prod
WORKDIR /app
COPY package.json yarn.lock ./
RUN set -x; \
  yarn config set registry https://registry.npm.taobao.org; \
  yarn install --production; \
  yarn cache clean

FROM node:14.12.0-alpine as build-prod
WORKDIR /app
COPY --from=install-all /app .
RUN set -x; \
  cp .env.example .env; \
  yarn migration:run; \
  yarn build

FROM node:14.12.0-alpine as run
WORKDIR /app
COPY --from=build-prod /app/dist ./dist
COPY --from=build-prod /app/data ./data
COPY --from=build-prod /app/.env .
COPY --from=install-prod /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
