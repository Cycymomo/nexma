FROM node:12.2.0-alpine as server
RUN npm install -g --unsafe-perm prisma
ADD . /usr/src/server
WORKDIR /usr/src/server
COPY package.json /usr/src/server/package.json
COPY package-lock.json /usr/src/server/package-lock.json
ENV NODE_PATH=/usr/src/server/node_modules
ENV PATH=/usr/src/server/node_modules/.bin/:${PATH}
COPY prisma ./prisma/
ARG MYSQL_URL
ARG PRISMA_MANAGEMENT_API_SECRET
ARG PRISMA_URL
ENV MYSQL_URL "$MYSQL_URL"
ENV PRISMA_MANAGEMENT_API_SECRET "$PRISMA_MANAGEMENT_API_SECRET"
ENV PRISMA_URL "$PRISMA_URL"
RUN npm install
RUN prisma generate
CMD ["npm", "start"]
EXPOSE 4000
