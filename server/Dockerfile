FROM node:12.2.0 as server
RUN npm install -g prisma2@2.0.0-preview019 --unsafe-perm
ADD . /usr/src/server
WORKDIR /usr/src/server
COPY package.json /usr/src/server/package.json
COPY package-lock.json /usr/src/server/package-lock.json
ENV NODE_PATH=/usr/src/server/node_modules
ENV PATH=/usr/src/server/node_modules/.bin/:${PATH}
ARG MYSQL_URL
ENV MYSQL_URL "$MYSQL_URL"
RUN npm install
RUN prisma2 generate
CMD ["npm", "start"]
EXPOSE 4000
