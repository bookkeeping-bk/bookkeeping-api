FROM node:11.14.0-alpine
WORKDIR /app
COPY . .
RUN set -x; \
  # yarn config set registry https://registry.npm.taobao.org; \
  yarn; \
  yarn migration:run; \
  yarn build; \
  rm -rf ./node_modules; \
  yarn install --production; \
  yarn cache clean
CMD [ "node", "dist/main.js" ]
