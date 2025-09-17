# API Start Guide

This guide explains how to set up, run, and test the Ships API, including Postman usage and endpoint details.

---

## 1. Prerequisites
- [Node.js (v18.x or higher)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/downloads/)

---

## 2. Setup Steps

### a. Clone the Repository
```sh
git clone https://github.com/rajvishwakarma1/fmc.git
cd main
```

### b. Install Dependencies
```sh
npm install
```

### c. Configure Environment Variables
- Copy `.env.example` to `.env`:
  ```sh
  cp .env.example .env
  ```
- Edit `.env` and set your `MONGODB_URI` and `JWT_SECRET`.

---

## 3. Running the API

### a. Start the Server (Development)
```sh
npm run dev
```
- The API will be available at `http://localhost:3000`.

### b. Run Automated Tests
```sh
npm run test:api
```

---

## 4. Testing with Postman

1. Open Postman.
2. Import `postman/Ships-API.postman_collection.json` and `postman/Ships-API.postman_environment.json`.
3. Select the environment and run requests in order:
   - Register User
   - Login User (save the token)
   - Use token for all protected endpoints (ships CRUD)

---

## 5. API Endpoints Explained

| Method | Endpoint         | Description                                 | Auth Required |
|--------|------------------|---------------------------------------------|:------------:|
| GET    | /health          | Health check, returns API status            |      ❌      |
| POST   | /auth/register   | Register a new user                         |      ❌      |
| POST   | /auth/login      | Login and receive JWT token                 |      ❌      |
| GET    | /ships           | List all ships                              |      ✅      |
| POST   | /ships           | Create a new ship                           |      ✅      |
| GET    | /ships/:id       | Get ship by ID                              |      ✅      |
| PUT    | /ships/:id       | Update ship by ID                           |      ✅      |
| DELETE | /ships/:id       | Delete ship by ID                           |      ✅      |

- For protected endpoints, add `Authorization: Bearer <token>` header.

---

## 6. Example Usage

### Register User
```sh
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"TestPass123!"}'
```

### Login User
```sh
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"TestPass123!"}'
```

### Create Ship (Authenticated)
```sh
curl -X POST http://localhost:3000/ships \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"name":"Titanic","description":"Famous ship","dateTime":"2025-09-17T12:00:00Z"}'
```

---

For more, see the README.md or open an issue.
