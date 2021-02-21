# pull official base image
FROM node:lts-alpine

# set working directory
RUN npm install -g http-server

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install

RUN npm install react-scripts@3.4.1 -g

# add app
COPY ./react-app ./
RUN npm run build
# set default port
ENV PORT=$PORT
EXPOSE 8080
# start app
CMD ["http-server", "build", "-p", "8080"]