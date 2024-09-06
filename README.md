Here's the full README file in `.md` format:

````markdown
# PageFusion Backend

PageFusion is a backend service for handling page splitting, merging, and PDF processing functionalities. This backend is built using Node.js and MongoDB. The service provides a robust API for file management and PDF operations.

## Features

- **PDF Splitting**: Split PDF files into individual pages.
- **PDF Generation**: Generate PDF files from individual pages.
- **File Management**: Handle uploads and serve files securely.
- **Authentication**: Uses JWT for secure user authentication.
- **MongoDB Integration**: Stores data in MongoDB for reliability and scalability.

## Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB Atlas account)
- [npm](https://www.npmjs.com/)

## Getting Started

To set up the backend locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/adilc0070/PageFusion_backend.git
cd PageFusion_backend
```
````

### 2. Install dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
ORIGIN='<frontend URL>'
JWT_SECRET='<your_jwt_secret>'
MONGO_URI='<your_mongo_db_connection_string>'
```

> **Note:** Never expose sensitive information such as JWT secrets or MongoDB connection URIs in public repositories.

### 4. Run the development server:

```bash
npm run dev
```

The server should now be running on `http://localhost:3000`.

## API Documentation

The API endpoints allow interaction with the backend for PDF processing and user management. Here’s a brief overview of available endpoints:

- `POST /pdf/generate-pdf` - Generate a PDF file
- `POST /auth/login` - Login
- `POST /auth/signup` - Sign up

For detailed API documentation, please refer to the project’s internal API docs or Postman collection.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Fast, unopinionated, and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for scalable data storage.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Mongoose**: MongoDB ODM for easier data interaction.

## Contributing

Feel free to submit a pull request or open an issue if you would like to contribute to this project. Any improvements and suggestions are welcome!

## Contact

For more information, please contact:

- **Adil C**
- [Website](https://adilc0070.site)
- [Email](mailto:adilc0070@gmail.com)
- [GitHub](https://github.com/adilc0070)
- [LinkedIn](https://www.linkedin.com/in/adilc0070/)

```

This file is ready to be added to your repository as a `README.md` file.
```
