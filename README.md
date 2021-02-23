# Safe Blues Dashboard
## local testing and development

```docker-compose build frontend-dev && docker-compose run frontend-dev```

## testing prod build

```docker-compose build frontend && docker-compose run frontend```

## Running tests

for interacting with the test suite:
```
dc up frontend-dev
docker ps # get the container id
docker exec -it 413eaf851c79 npm run test
```
or for live reload without interactivity:
```
dc up tests
```