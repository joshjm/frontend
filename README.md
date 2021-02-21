# Safe Blues Dashboard

Live [github pages site](https://safeblues.github.io/frontend/)

See the [trello board](https://trello.com/b/zOFm4RfY/safeblues-dashboard) for updates on development. 

Dependencies:
- plotly for plots
- mathjs for gamma function
- google-protobuf for protobuffers
- 
## Setup
To run development server locally:
```
git clone https://github.com/joshjm/safeBluesDashboard.git
cd safeBluesDashboard
npm install
npm run serve
```

To push build to production (github pages)
```
./deploy.sh
```
After ensuring `deploy.sh` is executable with `chmod +x deploy.sh`.


# local testing

`npm run start` from inside the react frontend dir. 
 # Working with docker

 build via `docker build -t safeblues/frontend .`

run via `docker run -it -p 8080:80 --rm --name frontend safeblues/frontend`

or use a docker compose 

```
version: '3'

services:
  frontend:
    build: ./frontend
    image: safeblues/frontend
    environment:
      - ENV=development
    ports:
      - 8080:8080
```