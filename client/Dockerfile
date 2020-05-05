FROM node:12.6.0 as client
ADD . /usr/src/client
WORKDIR /usr/src/client
COPY package.json /usr/src/client/package.json
COPY package-lock.json /usr/src/client/package-lock.json
ENV NODE_PATH=/usr/src/client/node_modules
ENV PATH=/usr/src/client/node_modules/.bin/:${PATH}
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
