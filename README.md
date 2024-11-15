#  🛒 E-commerce ShoppyGlobe
This is a **Node.js** and **MongoDB** backend service designed to handle authentication, cart management, and product management for an e-commerce platform.
It uses MongoDB for data storage and includes features like user authentication, cart operation, and product CRUD operations.

## Features
- **User Authentication**: Register and login users using JWT-based authentication.
- **Cart Management**: Add, update, retrieve, and delete items in the shopping cart.
- **Product Management**: Create, retrieve, update, and delete products.
- **Protected Routes**: Ensure that only authenticated user can access cart-related routes.
- **Error Handling**: Graceful error responses for invalid or failure requests.
- **MongoDB Integration**: Persistent data storage for products and cart items.

## Technologies Used
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **bcrypt.js**
- **jsonwebtoken**

## Prerequisities
Ensure you have the following installed on your system:
- **Node.js**
- **MongoDB**


### Installation
1. Clone the repository:
```bash
git clone https://github.com/ejazulhaque09/Shoppy_Backend
cd Shoppy_Backend
npm install
```

### Create .env
```bash
port = 4000
url = mongodb://localhost:27017/ecommerceDB
secret = your_secret_key
```
Start MongoDB server
```bash
mongod
```
Run the application:
```bash
npm start
