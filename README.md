# CyberFeed API

This is the API for a simple social media application called CyberFeed. It allows users to sign up, log in, and perform actions like creating, reading, updating, and deleting posts.

---
## API

* **API Documentation**: [https://documenter.getpostman.com/view/29309207/2sB3QGvCaQ](https://documenter.getpostman.com/view/29309207/2sB3QGvCaQ)
* **API Endpoint**: [https://cyberfeed-controller.vercel.app](https://cyberfeed-controller.vercel.app)

---
## Features

* **User Authentication**:
    * Register a new user
    * Log in an existing user
    * Refresh JSON Web Tokens (JWT)
* **Post Management**:
    * Create a new post with text and an optional image upload
    * View all posts
    * View posts by a specific user ID
    * View a single post by its ID
    * Edit an existing post
    * Delete a post

---

## Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Authentication**: JSON Web Tokens (JWT)
* **File Uploads**: Multer, Cloudinary
* **Validation**: AJV

---

## Installation

1.  **Clone this repository:**

    ```bash
    git clone [https://github.com/rfa863/cyberfeed-controller.git](https://github.com/rfa863/cyberfeed-controller.git)
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd cyberfeed-controller
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file from the example:**

    ```bash
    cp .env.example .env
    ```

5.  **Fill in the environment variables in your `.env` file**:

    ```
    PORT=...
    HOST=...
    DATABASE_URL=...
    HASH_SALT=...
    JWT_ACCESS_TOKEN_SECRET=...
    JWT_REFRESH_TOKEN_SECRET=...
    JWT_EXPIRED_KEY=...
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_SECRET_KEY=...
    ```

6.  **Run the database migrations:**

    ```bash
    npx prisma migrate deploy
    ```

---

## Usage

* **To run the server in development mode:**

    ```bash
    npm run dev
    ```

* **To run the server in production mode:**

    ```bash
    npm start
    ```
