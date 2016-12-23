FROM node:4.2.2

ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install

EXPOSE 3000
CMD [ "node","app.js" ]