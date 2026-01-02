# Movie Catalogue API

## Project Overview
This project is a RESTful API for managing a movie catalogue, built using **Node.js**, **Express**, and **MongoDB** (via Mongoose). It features JWT-based authentication, rate limiting, and comprehensive Swagger documentation.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: Swagger UI / OpenAPI 3.0
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB instance (Atlas or local)

### Installation
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup:**
    Create a `.env` file in the root directory with the following variables:
    ```env
    MONGO_USERNAME=your_username
    MONGO_PASSWORD=your_password
    # Add other secrets if required by middleware/jwt.js
    ```

### Running the Application
*   **Development Mode:**
    Runs the app with `nodemon` for hot-reloading.
    ```bash
    npm run dev
    ```
    *Server runs on:* `http://localhost:6075`
    *API Base:* `http://localhost:6075/api`

*   **Production Mode:**
    ```bash
    npm start
    ```

*   **Tests:**
    *Status: Tests are currently unconfigured/missing despite the script presence.*
    ```bash
    npm test
    ```

## Project Architecture

### Directory Structure
*   `app.js`: Application entry point. Configures middleware, database connection, and routes.
*   `routes/`: API route definitions.
    *   `movies/`: CRUD operations for movies.
    *   `token/`: JWT generation.
    *   `watchlist/`: User watchlist management.
    *   `health/`: Health check endpoint.
*   `middleware/`: Custom middleware functions.
    *   `auth.js`: JWT verification (checks Query param or Bearer header).
    *   `rateLimit.js`: Request limiting.
    *   `hideVProperty.js`: Utility to clean Mongoose `__v` field.
*   `models/`: Mongoose data models (`Movie`, `Watchlist`).
*   `swagger/`: API documentation configuration (`swagger.yaml`/`swagger.js`).

### Authentication
Protected routes require a JWT. The application accepts the token in two ways:
1.  **Query Parameter**: `?token=<jwt_token>`
2.  **Authorization Header**: `Bearer <jwt_token>`

Tokens are generated via the `/api/generate/token` endpoint.

### Database
*   Uses `mongoose` to connect to MongoDB Atlas.
*   Connection URI is constructed dynamically using `MONGO_USERNAME` and `MONGO_PASSWORD` env vars.

### Error Handling
*   Centralized error handling middleware in `app.js`.
*   Standardized JSON error responses.
