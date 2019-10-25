#dev
FROM node:12.2.0-alpine as build-server
ADD . /usr/src/server
WORKDIR /usr/src/server
RUN npm install
CMD npm start
EXPOSE 4000

# prod
# FROM nginx:1.12-alpine
# COPY --from=build-server /usr/src/server/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
