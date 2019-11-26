FROM node:13-alpine

WORKDIR /usr/src/app

RUN yarn
COPY . .

EXPOSE 3001
CMD ["yarn", "start"]