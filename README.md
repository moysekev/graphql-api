# Testing graphQL

## inspired by

https://dev.to/abeinevincent/build-a-graphql-api-with-nodejs-and-typescript-a-comprehensive-guide-ajj

## project creation

```sh
npm init -y
npm install express cors dotenv mongoose graphql graphql-http
npm install -D @types/cors @types/express nodemon ts-node typescript
```

## setup

### .env

```
MONGODB_URL="mongodb://localhost:3001"
```

## run

`npm run dev`

# Playing with it

## graphQL syntax

```graphql
mutation {
  addConfiguration(email: "example@email.com") {
    id
    email
  }
}
```

## create

`curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "mutation {addConfiguration(email: \"example@email.com\") {id}}"}' localhost:8500/graphql`

## get

`curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "query {configurations {id email}}"}' localhost:8500/graphql`

```json
{
  "data": {
    "configurations": [
      { "id": "66cdc497984fff52dcefe9bb", "email": "example@email.com" }
    ]
  }
}
```

## get by id

`curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "query {configuration(id: \"66cdc497984fff52dcefe9bb\") {email}}"}' localhost:8500/graphql`

```json
{ "data": { "configuration": { "email": "example@email.com" } } }
```

## get by id with sub data info

`curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "query {configuration(id: \"66d960225d7794de01d5cd0a\") {email name{firstName}}}"}' localhost:8500/graphql`

```json
{
  "data": {
    "configuration": {
      "email": "example@email.com",
      "name": { "firstName": "glop" }
    }
  }
}
```

## get by id, with createdAt returned

`curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "query {configuration(id: \"66cdc497984fff52dcefe9bb\") {email createdAt}}"}' localhost:8500/graphql`

```json
{
  "data": {
    "configuration": {
      "email": "example@email.com",
      "createdAt": "2024-08-27T12:20:39.013Z"
    }
  }
}
```

## delete

`curl -i -H 'Content-Type: application/json' -X POST -d '{"query": "mutation {deleteConfiguration(id: \"66cdc497984fff52dcefe9bb\") {id}}"}' localhost:8500/graphql`

```json
{ "data": { "deleteConfiguration": { "id": "66cdc497984fff52dcefe9bb" } } }
```

once again:

```json
{ "data": { "deleteConfiguration": null } }
```
