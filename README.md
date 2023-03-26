# Movie Catalogue API 🎬

A powerful and user-friendly REST API for managing a movie catalogue, built with Node.js, Express, and MongoDB. The API is hosted at [api.danieldjupvik.dev/api](https://api.danieldjupvik.dev/api), and the interactive Swagger documentation is available at [api.danieldjupvik.dev/swagger](https://api.danieldjupvik.dev/swagger).

![Node.js Logo](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express Logo](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white)
![MongoDB Logo](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)
![Swagger Logo](https://img.shields.io/badge/-Swagger-85EA2D?logo=swagger&logoColor=white)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Author](#author)
- [License](#license)

## Features 🚀

- Comprehensive RESTful API for managing movies 🎥
- Perform CRUD operations on movies 🎦
- Secure JWT token-based authentication 🔐
- Interactive Swagger documentation for easy API exploration 📘
- MongoDB integration using Mongoose for seamless data management 🗄️
- CORS enabled for cross-origin requests 🌐
- Vercel deployment-ready for quick and hassle-free hosting ☁️

## Getting Started 🏁

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:

```
git clone https://github.com/danieldjupvik/movie-catalogue-api.git
```

2. Change to the project directory:

```
cd movie-catalogue-api
```

3. Install the required dependencies:

```
npm install
```

4. Create a `.env` file in the root directory and populate it with your MongoDB connection information:

```
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
```

5. Start the development server:

```
npm run dev
```

The API should now be running at [http://localhost:6075/api](http://localhost:6075/api).

## Usage 📚

To access the protected routes, first generate a JWT token:

```
GET /api/generate/token
```

Include the returned token as a query parameter for the following protected routes:

- GET /api/movies
- GET /api/movies/:id
- POST /api/movies/add
- PUT /api/movies/update/:id
- DELETE /api/movies/:id

For a comprehensive overview of the available API routes and their usage, consult the [Swagger documentation](https://api.danieldjupvik.dev/swagger).

## Testing ⚙️

_Note: Tests are currently not configured for this project. We plan to add tests in the near future to improve project stability and maintainability._

## Deployment 🚀

The project is ready for deployment on [Vercel](https://vercel.com/). Follow these steps to deploy it quickly:

1. Install the Vercel CLI:

```
npm install -g vercel
```

2. Login to your Vercel account:

```
vercel login
```

3. Deploy the project:

```
vercel --prod
```

Your API is now live on a Vercel-provided domain.

## Author ✍️

Daniel Djupvik - [GitHub](https://github.com/danieldjupvik)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
