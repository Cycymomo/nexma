# TODO use node:12.6.0-alpine when supported by prisma https://github.com/prisma/prisma/issues/702
FROM node:12.6.0 as server
RUN openssl version -v
RUN uname -a

ARG DATABASE_URL
ENV DATABASE_URL "$DATABASE_URL"

RUN npm install -g npx --unsafe-perm

WORKDIR /usr/src/server
COPY package.json /usr/src/server/package.json
COPY package-lock.json /usr/src/server/package-lock.json
COPY prisma ./prisma/
ENV NODE_PATH=/usr/src/server/node_modules
ENV PATH=/usr/src/server/node_modules/.bin/:${PATH}

RUN npm install
RUN cd prisma
RUN npx prisma generate
CMD ["npm", "start"]
EXPOSE 4000
