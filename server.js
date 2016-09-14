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
productsRouter.get("/:id", (req, res) => res.json(products[req.params.id]));

server.use("/products", productsRouter);

/**
 * Cart API
 *
 */

const cart = require("./cart");

cart.init();

const cartRouter = router();

// GET cart
cartRouter.get("/", (req, res) => res.json(cart()));

// DELETE (empty) cart
cartRouter.delete("/", (req, res) => res.json(cart.clear()));

// POST (create or add) quantity to item by id
cartRouter.post("/:id", (req, res) => res.json(cart.add(+req.params.id, +req.body.quantity || 1)));

// PUT (update) quantity to item by id
cartRouter.put("/:id", (req, res) => res.json(cart.update(+req.params.id, +req.body.quantity)));

// DELETE quantity to item by id
cartRouter.delete("/:id", (req, res) => res.json(cart.remove(+req.params.id)));

server.use("/cart", cartRouter);

// Change port by running `$ SERVER_PORT=XXXX npm start`
const defaultPort = 8181;
const port = process.env.SERVER_PORT || defaultPort;

server.listen(port);
