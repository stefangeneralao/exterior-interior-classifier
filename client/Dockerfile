FROM node:13-alpine
WORKDIR /usr/src/app
RUN mkdir build production_server
COPY build build
COPY production_server production_server
EXPOSE 3000
CMD ["node", "production_server"]