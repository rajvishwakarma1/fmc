
# Assignment for Fathom Marine Consultants

<p align="center">
    <b>Demo Video</b><br>
    <a href="https://youtu.be/P4rkGS0oDI0" target="_blank">
        <img src="https://img.youtube.com/vi/P4rkGS0oDI0/0.jpg" alt="Demo Video" width="480"/>
    </a>
</p>

A simple and robust RESTful API for managing ships, built with Node.js, Express, and MongoDB.

---

**Author:** Raj Vishwakarma  
**Time to Complete:** 5 hours

---


## Features

[See the full API Start Guide](./api_start.md)

-   **Authentication:** Secure endpoints using JSON Web Tokens (JWT).
-   **Validation:** Built-in validation and clear error handling for all incoming requests.
-   **Configuration:** Environment variable-based setup for easy configuration.
-   **Testing:** Comes with an integrated test suite.

---

## Getting Started

### Prerequisites

-   [Node.js (v18.x or higher)](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/rajvishwakarma1/fmc.git](https://github.com/rajvishwakarma1/fmc.git)
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

---


## Testing Online Deployment


You can also use the shared Postman workspace for this project:
[Postman Workspace: FMC Assignment](https://www.postman.com/aerospace-geologist-77825313/workspace/fmc-assignment/environment/27784102-3522841f-5ea2-4375-8059-a2e3f6cf544d?action=share&creator=27784102&active-environment=27784102-3522841f-5ea2-4375-8059-a2e3f6cf544d)


Deployed API: [https://fmc-16sd.onrender.com](https://fmc-16sd.onrender.com)

If you have deployed your API (e.g., on Render), you can test it online:

1. In Postman, set the `baseUrl` variable in your environment to your Render URL (e.g., `https://your-app.onrender.com`).
2. Use the Register and Login requests to create a user and obtain a token.
3. Use the Ships endpoints (Create, Get, Update, Delete) as usual—your token will be used automatically.
4. You can also check `/health` in your browser to verify the API is running.

All automated and manual tests work the same way—just point to your online URL!

- Test simple GET endpoints (like `/health` or `/ships`) directly in your browser.
- For POST, PUT, DELETE, or authenticated requests, use Postman or curl.

---

## API Endpoints

The base URL is `http://localhost:3000` or `https://fmc-16sd.onrender.com`.

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

© 2025 Raj Vishwakarma (for FMC Assignment)
