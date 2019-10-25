# dev
FROM node:12.2.0-alpine as build-client
ADD . /usr/src/client
WORKDIR /usr/src/client
ENV PATH=/usr/src/client/node_modules/.bin/:${PATH}
RUN npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000

# prod
# FROM nginx:1.12-alpine
# COPY --from=build-client /usr/src/client/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
