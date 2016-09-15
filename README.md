# Avensia API Sample Server

## Instructions

### Install

```bash
$ npm i git@github.com:avensia/api-sample-server.git --save
```

### Run

```bash
$ node_modules/.bin/api-server

# Or run `api-server` in run-script, e.g:
# ...
# "scripts": {
#   "start": "api-server | webpack"
# }
# ...

$ npm start
```

Then the server is running on the default port, [`8181`](http://localhost:8181). You can change the port with the environment variable `SERVER_PORT`.

```bash
$ SERVER_PORT=8282 node_modules/.bin/api-server
```

## API

### [`GET /products`](http://localhost:8181/products)

*No parameters*

Responds with an `Array` containing all products.

### `GET /products/:id`

*No parameters*

Responds with product identified with the given `:id`.

### [`GET /cart`](http://localhost:8181/cart)

*No parameters*

Responds with full cart. Cart items and summary.

### `DELETE /cart`

*No parameters*

Empty cart. Responds with full updated cart.

### `POST /cart/:id`

*Parameters: `quantity=[number]`*

Add `quantity` to item with product identified with `:id`. Responds with full updated cart.

### `PUT /cart/:id`

*Parameters: `quantity=[number]`*

Update `quantity` to item with product identified with `:id`. If item doesn't exist in cart, it will be added with the given `quantity`. Responds with full updated cart.

### `DELETE /cart/:id`

*No parameters*

Remove item with `:id`. Responds with full updated cart.

## Models

### Product

```tsx
type Product = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url: string; // Absolute URL to API
  prices: Price[];
};

type Price = {
  amount: number;
  currency: string; // Currently SEK and EUR
};
```

### Cart

```tsx
type Cart = {
  items: Item[];
  summary: Price[];
}

type Item = {
  product: Product;
  quantity: number;
};
```
