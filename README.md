# Blog Website - Collasyn

This is a full-stack blog website application developed for the company **Collasyn**. It is built using **React** for the front-end, **Node.js** for the back-end, and **PostgreSQL** for the database. The project includes CRUD (Create, Read, Update, Delete) operations for blog management and user authentication.

## Features

- **User Authentication**: Secure login and registration with authentication features.
- **Blog Management**: CRUD operations to create, read, update, and delete blog posts.
- **Responsive Design**: Fully responsive user interface to ensure a seamless experience on any device.
- **Database Integration**: PostgreSQL database to store user and blog data.
- **Error Handling**: Proper error messages and status codes for different operations.
  
## Tech Stack

- **Frontend**: 
  - Vite-React.js
  - TailwindCSS 
  
- **Backend**: 
  - Node.js
  - Express.js
  
- **Database**:
  - PostgreSQL
  
- **Authentication**:
  - JWT (JSON Web Tokens) for secure authentication.

### Prerequisites

- Node.js installed on your machine.
- PostgreSQL installed and running.

### Steps to run the project locally:

1.**Clone the repository:**

   ```bash
   git clone https://github.com/sbn-raju/Blogs_Backend.git
   cd Blogs_Backend
   ```

2. **Setup the Backend:**

- Install all the dependencies
   ```bash
    npm install
   ``` 
- Create .env file to save the environment variables.
  ```bash
    touch .env
  ```
- After create .env file save all your database credintials into that.
  ```bash 
    DB_HOST=localhost
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    DB_NAME=your-db-name
    JWT_SECRET=your-jwt-secret
  ```

- To run the project type this command in you terminal.
  ```bash
  npm run dev
  ```
