FROM node:12.6.0-alpine as server
RUN npm install -g --unsafe-perm prisma
ADD . /usr/src/server
WORKDIR /usr/src/server
COPY package.json /usr/src/server/package.json
COPY package-lock.json /usr/src/server/package-lock.json
COPY prisma ./prisma/
ENV NODE_PATH=/usr/src/server/node_modules
ENV PATH=/usr/src/server/node_modules/.bin/:${PATH}
RUN npm install
RUN prisma generate
CMD ["npm", "start"]
EXPOSE 4000
