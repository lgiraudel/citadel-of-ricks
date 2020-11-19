# Citadel of Ricks

## DB
Configure the mongo connection string in server/env/

```ini
## DB ##
DB=mongodb://localhost/citadel-of-ricks
````

## Build
### Production
#### Server
```bash
cd server
npm install
npm run build
npm run start
# Server will listen on port 3001
```
#### Client
```bash
cd client
npm install
npm run bundle
npm run start
# Server will listen on port 3000
```
### Development
#### Server
```bash
cd server
npm install
npm run start:dev
# Server will listen on port 3001
```
#### Client
```bash
cd client
npm install
npm run dev
# Client will listen on port 8081
```

# Client
Client boilerplate: https://github.com/emrekara37/ts-spa-boilerplate

# Server
Server boilerplate: https://www.npmjs.com/package/express-generator-typescript

