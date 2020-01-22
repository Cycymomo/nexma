FROM node:12.2.0 as prisma
RUN npm install -g prisma2@2.0.0-preview019 --unsafe-perm
ADD . /usr/src/prisma
WORKDIR /usr/src/prisma
ARG MYSQL_URL
ENV MYSQL_URL "$MYSQL_URL"
CMD ["prisma2", "dev"]
EXPOSE 5555
