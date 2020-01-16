FROM node:12.2.0-alpine as client
ADD . /usr/src/client
WORKDIR /usr/src/client
COPY package.json /usr/src/client/package.json
COPY package-lock.json /usr/src/client/package-lock.json
ENV NODE_PATH=/usr/src/client/node_modules
ENV PATH=/usr/src/client/node_modules/.bin/:${PATH}
RUN npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
EXPOSE 35729
