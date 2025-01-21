# URL Shortener

A simple URL shortener application built with Node.js, Express, MongoDB, and Mongoose. This app generates short, shareable links from long URLs and handles redirection to the original URLs.

## Features

- Shorten a long URL into a short URL.
- Redirect users to the original URL using the short URL.
- View all shortened URLs.
- Delete a shortened URL.
- Validates URLs to ensure proper formatting.

## Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database (MongoDB Atlas or local instance).

## Project Structure

```
project-folder
├── config
│   └── db.js        # MongoDB connection setup
├── models
│   └── Url.js       # Mongoose schema for URLs
├── routes
│   └── urlRoutes.js # Express routes for URL operations
├── server.js         # Main entry point for the application
```

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-folder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection:

   - Create a `.env` file in the root directory.
   - Add your MongoDB URI:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>?retryWrites=true&w=majority
     ```

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run at `http://localhost:3000`.

## API Endpoints

### 1. Create a Shortened URL

- **Endpoint**: `POST /api/shorten`
- **Description**: Generates a short URL from a long URL.
- **Request Body**:
  ```json
  {
    "originalUrl": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "URL shortened successfully",
    "shortUrl": "http://localhost:3000/<short-code>"
  }
  ```

### 2. Redirect to Original URL

- **Endpoint**: `GET /:shortUrl`
- **Description**: Redirects to the original URL using the short URL.

### 3. Get All Shortened URLs

- **Endpoint**: `GET /api/urls`
- **Description**: Retrieves all stored URLs.
- **Response**:
  ```json
  [
    {
      "_id": "<id>",
      "originalUrl": "https://example.com",
      "shortUrl": "<short-code>",
      "__v": 0
    }
  ]
  ```

### 4. Delete a Shortened URL

- **Endpoint**: `DELETE /api/urls/:id`
- **Description**: Deletes a URL entry by ID.

## URL Validation

The app uses a regex pattern to validate URLs. Only URLs starting with `http://` or `https://` are accepted.

## Deployment

1. Push your code to a Git repository (e.g., GitHub).
2. Deploy on Render:
   - Create a new web service.
   - Set `MONGO_URI` as an environment variable.
   - Use `npm install` as the build command and `npm start` as the start command.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
