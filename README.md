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


compiling protos

``` proto3
protoc -I. --js_out=import_style=commonjs,binary:. sb.proto 

protoc -I. --js_out="import_style=commonjs,binary:." sb.proto

from root
protoc --js_out=import_style=commonjs,binary:. ./src/pb/sb.proto 
```