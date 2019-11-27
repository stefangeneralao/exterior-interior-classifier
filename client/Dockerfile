FROM node:13-alpine
WORKDIR /usr/src/app
COPY build .
RUN yarn global add serve
EXPOSE 3000
CMD ["serve", "-s", "-p", "3000", "."]