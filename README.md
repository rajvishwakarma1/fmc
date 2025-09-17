# Assignment for Fathom Marine Consultants

A simple and robust RESTful API for managing ships, built with Node.js, Express, and MongoDB.

**Author:** Raj Vishwakarma  
**Time to Complete:** 5 hours

---

## ✨ Features

-   **Authentication:** Secure endpoints using JSON Web Tokens (JWT).
-   **Validation:** Built-in validation and clear error handling for all incoming requests.
-   **Configuration:** Environment variable-based setup for easy configuration.
-   **Testing:** Comes with an integrated test suite.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18.x or higher)
-   npm
-   MongoDB

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd main
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file by copying the example and then fill in your details.
    ```sh
    cp .env.example .env
    ```
    You will need to add your `MONGODB_URI` and a `JWT_SECRET` in the new `.env` file.

### Running the Application

-   **Development Mode:**
    The server will start on `http://localhost:3000` with hot-reloading.
    ```sh
    npm run dev
    ```

-   **Run Tests:**
    Execute the API test suite.
    ```sh
    npm run test:api
    ```

---

## ⚙️ API Endpoints

The base URL is `http://localhost:3000`.

| Method | Endpoint             | Description                       | Auth Required |
| :----- | :------------------- | :-------------------------------- | :-----------: |
| `GET`  | `/health`            | Checks the health of the API.     |      ❌       |
| `POST` | `/auth/register`     | Registers a new user.             |      ❌       |
| `POST` | `/auth/login`        | Logs in a user and returns a JWT. |      ❌       |
| `GET`  | `/ships`             | Fetches a list of all ships.      |      ✅       |
| `POST` | `/ships`             | Creates a new ship.               |      ✅       |
| `GET`  | `/ships/:id`         | Fetches a single ship by its ID.  |      ✅       |
| `PUT`  | `/ships/:id`         | Updates a ship by its ID.         |      ✅       |
| `DELETE`| `/ships/:id`         | Deletes a ship by its ID.         |      ✅       |

**Note:** For authenticated routes, provide the JWT in the `Authorization` header as `Bearer <token>`.

---

© 2025 Raj Vishwakarma