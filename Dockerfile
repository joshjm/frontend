# pull official base image
FROM node:alpine

# set working directory
RUN npm install -g http-server

WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY ./react-app ./
RUN npm run build
# clean up the files not needed in the final image
RUN rm -rf node_modules public src
# start app
CMD ["http-server", "build", "-p", "3000"]