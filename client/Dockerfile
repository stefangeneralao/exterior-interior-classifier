FROM node:13-alpine
WORKDIR /usr/src/app
RUN mkdir build prodServer
COPY build build
COPY prodServer prodServer
EXPOSE 3000
CMD ["node", "prodServer"]