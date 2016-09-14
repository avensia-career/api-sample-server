"use strict";

const express = require("express");

const router = express.Router;
const server = express();

const bodyParser = require("body-parser");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/**
 * Products API
 *
 */

const products = require("./products");

const productsRouter = router();

// GET all products
productsRouter.get("/", (req, res) => res.json(products));

// GET product by id
productsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  if (id in products) {
    res.json(products[id]);
  }
  return next(new Error("Product doesn\'t exist"));
});

server.use("/products", productsRouter);

/**
 * Cart API
 *
 */

const cart = require("./cart");

cart.init();

const cartRouter = router();

const handleRequest = function (action) {
  return (req, res, next) => {
    const data = action(req, res);
    if (data instanceof Error) {
      return next(data);
    }
    return res.json(data);
  };
};

// GET cart
cartRouter.get("/", (req, res) => res.json(cart()));

// DELETE (empty) cart
cartRouter.delete("/", handleRequest(() => cart.clear()));

// POST (create or add) quantity to item by id
cartRouter.post("/:id", handleRequest((req) => cart.add(+req.params.id, +req.body.quantity || 1)));

// PUT (update) quantity to item by id
cartRouter.put("/:id", handleRequest((req) => cart.update(+req.params.id, +req.body.quantity)));

// DELETE quantity to item by id
cartRouter.delete("/:id", handleRequest((req) => cart.remove(+req.params.id)));

server.use("/cart", cartRouter);

// Error handling
server.use((req, res, next) => next(new Error("Request not found")));

const errorBadRequest = 400;
server.use((error, req, res, next) => res.status(errorBadRequest).json({ error: error.message }));

// Change port by running `$ SERVER_PORT=XXXX npm start`
const defaultPort = 8181;
const port = process.env.SERVER_PORT || defaultPort;

server.listen(port);
