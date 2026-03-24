# Inventory Management API

Node.js + Express + MongoDB backend for managing retail store products (add/view/update/delete/search/filter).

## Tech Stack
- Express.js
- MongoDB with Mongoose
- dotenv for configuration

## Getting Started
1) Install dependencies  
`npm install`
&&

2) Copy environment template and fill values  
`cp .env.example .env`  
Set `MONGO_URI` to your MongoDB connection string (Atlas or local) and optionally change `PORT`.

3) Run locally  
`npm run dev` (with nodemon) or `npm start`.

The API serves at `http://localhost:5000` by default and exposes routes under `/api`.

## API Endpoints
- `POST /api/products` — create product (201)
- `GET /api/products` — list all products
- `GET /api/products/:id` — product by id
- `PUT /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product
- `GET /api/products/search?name=xyz` — search by name (case-insensitive)
- `GET /api/products/category?cat=xyz` — filter by category

## Validation Rules
- productName, productCode, supplierName required
- productCode unique (duplicate returns 400)
- quantityInStock ≥ 0
- unitPrice > 0
- reorderLevel > 0
- status defaults to `Available`

## Render Deployment (connects to GitHub)
1) Push this folder to a new GitHub repo.
2) In Render dashboard: **New +** → **Web Service** → connect the repo.
3) Select branch, set:
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node
4) Add environment variables:
   - `MONGO_URI` (Atlas connection string recommended)
   - `PORT` (optional, Render provides `PORT` automatically)
5) Deploy. Render will install dependencies and run `npm start`.

> Note: This environment is offline, so actual GitHub/Render deployment cannot be performed here. Follow the steps above on your machine.

## Project Structure
```
src/
  server.js          # app entry
  config/db.js       # mongoose connection
  models/Product.js  # schema + validations
  controllers/productController.js
  routes/productRoutes.js
  middleware/errorHandler.js
.env.example
```

## Example Product Payload
```json
{
  "productName": "Wireless Mouse",
  "productCode": "WM-001",
  "category": "Electronics",
  "supplierName": "Logi Supply",
  "quantityInStock": 120,
  "reorderLevel": 20,
  "unitPrice": 19.99,
  "manufactureDate": "2024-09-01",
  "productType": "Non-Perishable",
  "status": "Available"
}
```
