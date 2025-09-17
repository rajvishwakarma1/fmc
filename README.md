# Ships API

A robust RESTful API for managing ships, built with Node.js, Express, MongoDB, JWT authentication, and comprehensive validation and error handling.

## Overview

## Prerequisites
  - `MONGODB_URI=mongodb://localhost:27017/shipsdb`
  - `JWT_SECRET=your_jwt_secret`
  - `PORT=3000` (optional, default 3000)
  - `CORS_ORIGIN=http://localhost:3000` (optional)

## Installation & Running
```sh
npm install
npm run dev
```
The server will run on `http://localhost:3000` by default.

## API Endpoints

### Auth
  - Request: `{ "username": "testuser", "password": "TestPass123!" }`
  - Response: `201 Created` `{ "message": "User registered successfully" }`
  - Request: `{ "username": "testuser", "password": "TestPass123!" }`
  - Response: `200 OK` `{ "token": "<JWT>", "user": { "_id": "...", "username": "..." } }`
    - Note: The `user` object contains the user's id and username. Additional fields may be present depending on model serialization.

### Ships
  - Response: `200 OK` `[ { ...ship }, ... ]`
  - Response: `200 OK` `{ ...ship }`
  - Headers: `Authorization: Bearer <JWT>`
  - Request: `{ "name": "Titanic", "description": "Famous ship", "dateTime": "2025-09-17T12:00:00Z" }`
  - Response: `201 Created` `{ ...ship }`
  - Headers: `Authorization: Bearer <JWT>`
  - Request: `{ "name": "Updated Titanic", "description": "Updated description" }`
  - Response: `200 OK` `{ ...updated ship }`
  - Headers: `Authorization: Bearer <JWT>`
  - Response: `200 OK` `{ "message": "Ship deleted successfully", "id": "..." }`

### Health
  - Response: `200 OK` `{ "status": "ok", "timestamp": "2025-09-17T12:00:00.000Z" }`
    - Note: `timestamp` is the current server time in ISO8601 format.

## Authentication Flow
1. Register a user via `/auth/register`.
2. Login via `/auth/login` to receive a JWT token.
3. Use the token in the `Authorization: Bearer <JWT>` header for all protected endpoints.

## Postman Collection

## Example curl Usage
```sh
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"TestPass123!"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"TestPass123!"}'

# Create Ship
curl -X POST http://localhost:3000/ships \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"name":"Titanic","description":"Famous ship","dateTime":"2025-09-17T12:00:00Z"}'

# Get All Ships
curl http://localhost:3000/ships

# Update Ship
curl -X PUT http://localhost:3000/ships/<SHIP_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"name":"Updated Titanic","description":"Updated description"}'

# Delete Ship
curl -X DELETE http://localhost:3000/ships/<SHIP_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Troubleshooting


© 2025 Ships API

# Assignment for Fathom Marine Consultants

Simple RESTful API for managing ships, built with Node.js, Express, and MongoDB.

**Author:** Raj Vishwakarma  
**Email:** rajvishwakarma303@gmail.com  
**GitHub:** [rajvishwakarma1](https://github.com/rajvishwakarma1)  
**Total time taken:** 5 hours

### Setup
1. Clone the repo and install dependencies:
  ```sh
  npm install
  ```
2. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.

### Running the API
Start the server:
```sh
npm run dev
```
API runs at `http://localhost:3000` by default.

### Testing
Run all API tests with:
```sh
npm run test:api
```

### Good Practices
- Input validation and error handling are built-in.
- JWT authentication for protected routes.
- Use environment variables for secrets and config.

---
Keep code modular and responses consistent for maintainability.
