"use strict";

const express = require("express");

const router = express.Router;
const server = express();
const path = require("path");

const cors = require("cors");

server.use(
  cors({
    credentials: true,
    origin: true
  })
);

const bodyParser = require("body-parser");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const cookieParser = require("cookie-parser");

server.use(cookieParser());

/**
 * Products API
 * GET `/products` - Get all products
 * GET `/products/:id` - Get product by id
 */

const products = require("./products");

const productsRouter = router();

// GET all products
productsRouter.get("/", (req, res) => res.json(products));

// GET product by id
productsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const product = products.find(p => String(p.id) === id);
  if (product) {
    return res.json(product);
  }
  return next(new Error("Product doesn't exist"));
});

server.use("/products", productsRouter);

/**
 * Cart API
 * GET `/cart` - Get cart items with summary
 * DELETE `/cart` - Empty cart
 * POST `/cart/:id` `quantity?: number` - Add `quantity` to item with `id`
 * PUT `/cart/:id` `quantity: number` - Update `quantity` to item with `id`
 * DELETE `/cart/:id` - Remove item with `id`
 */

const Cart = require("./cart");

const carts = new Map();
let nextCartId = 1;

const cartRouter = router();

const cartRequest = function(action) {
  return (req, res, next) => {
    let cart;

    const cartId = +req.cookies.cart_id;
    if (cartId && carts.has(cartId)) {
      // Get existing cart
      cart = carts.get(cartId);
    } else {
      // Create new cart
      cart = new Cart();
      carts.set(nextCartId, cart);
      res.cookie("cart_id", nextCartId);
      nextCartId++;
    }

    const data = action(cart, req, res);
    if (data instanceof Error) {
      return next(data);
    }
    return res.json(data.get());
  };
};

// GET cart
cartRouter.get("/", cartRequest(c => c));

// DELETE (empty) cart
cartRouter.delete("/", cartRequest(c => c.clear()));

// POST (create or add) quantity to item by id
cartRouter.post(
  "/:id",
  cartRequest((c, req) => c.add(+req.params.id, +req.body.quantity || 1))
);

// PUT (update) quantity to item by id
cartRouter.put(
  "/:id",
  cartRequest((c, req) => c.update(+req.params.id, +req.body.quantity))
);

// DELETE quantity to item by id
cartRouter.delete("/:id", cartRequest((c, req) => c.remove(+req.params.id)));

server.use("/cart", cartRouter);

// images
server.use("/images", express.static(path.join(__dirname + "/images")));

// Error handling
server.use((req, res, next) => next(new Error("Request not found")));

const errorBadRequest = 400;
server.use((error, req, res, next) =>
  res.status(errorBadRequest).json({ error: error.message })
);

// Change port by running `$ SERVER_PORT=XXXX npm start`
const defaultPort = 8181;
const port = process.env.SERVER_PORT || defaultPort;

server.listen(port);
