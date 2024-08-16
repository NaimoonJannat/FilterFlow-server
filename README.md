# Filter Flow Project

This is the server-side code for the **Filter Flow** project, which is a product-related web application. The application is built using Node.js, Express, and MongoDB, with CORS enabled to allow requests from specific origins.

## Features

- **Add Products**: Allows you to add new products to the database.
- **Get Products**: Fetches all the products from the database.

## Prerequisites

Before running this project, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MongoDB](https://www.mongodb.com/) (either local installation or MongoDB Atlas)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/NaimoonJannat/FilterFlow-server
cd FilterFlow-server
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

```bash
PORT=3000
DB_USER=yourMongoDBUser
DB_PASS=yourMongoDBPassword
```
Replace yourMongoDBUser and yourMongoDBPassword with your actual MongoDB Atlas credentials.

### 4. Run the Server
Start the server using the following command:

```bash
npm start
```
The server will be running on http://localhost:3000.




