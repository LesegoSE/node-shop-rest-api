# Node Shop REST API

## Introduction

This project is a RESTful API built with Node.js and Express for managing a shop's products and orders.  
It provides endpoints for creating, reading, updating, and deleting products and orders, with support for image uploads and MongoDB integration.  
The API is designed to be stateless, scalable, and easy to integrate with frontend applications or other services.

## Features

- CRUD operations for products
- CRUD operations for orders
- Image upload support (using Multer)
- User creation
- MongoDB integration (via Mongoose)
- Error handling and validation
- CORS support

## Technologies

- Node.js
- Express
- MongoDB & Mongoose
- Multer (file uploads)
- Bcrypt (password encryption)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/node-shop-rest-api.git
    cd node-shop-rest-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add your MongoDB connection string:
    ```
    MONGO_ATLAS_NODE_SHOP_PW=yourMongoDBPassword
    ```

4. Create an `uploads` folder in the project root for image storage.

### Running the API

Start the server:
```bash
npm start
```
The API will run on `http://localhost:3000`.

## API Endpoints

### Products

- `GET /products` - List all products
- `POST /products` - Create a new product (with image upload)
- `GET /products/:productId` - Get product details
- `PATCH /products/:productId` - Update a product
- `DELETE /products/:productId` - Delete a product

### Orders

- `GET /orders` - List all orders
- `POST /orders` - Create a new order
- `GET /orders/:orderId` - Get order details
- `DELETE /orders/:orderId` - Delete an order

### Users

- `POST /users/signup` - Create a new user
- `DELETE /users/:userId` - Delete a existing user

## Usage

Use [Postman](https://www.postman.com/) or similar tools to test API endpoints.

## License

ISC

## Author

Lesego Seikali