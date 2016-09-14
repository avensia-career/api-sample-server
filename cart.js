"use strict";

const products = require("./products");

const items = new Map();

const isProduct = function (id) {
  if (id in products) {
    return true;
  }
  return new Error(`There's no product with id: ${id}`);
};

const isQuantity = function (quantity) {
  if (typeof quantity === "number" && quantity > 0) {
    return true;
  }
  return new Error("Quantity must be a number higher than 0");
};

const cart = function () {
  const itemValues = Array.from(items).map((i) => i[1]);
  return {
    items: itemValues,
    summery: ["SEK", "EUR"].map((currency) => ({
      amount: itemValues.reduce((previous, current) => {
        const amount = current.details.prices.find((p) => p.currency === currency).amount;
        const quantity = current.quantity;
        return previous + amount * quantity;
      }, 0),
      currency
    }))
  };
};

cart.add = function (id, quantity) {
  let error;
  if ((error = isProduct(id)) !== true) {
    return error;
  }
  if ((error = isQuantity(quantity)) !== true) {
    return error;
  }

  if (items.has(id)) {
    const item = items.get(id);
    item.quantity += quantity;
    items.set(id, item);
  } else {
    items.set(id, {
      details: products[id],
      quantity
    });
  }

  return cart();
};

cart.update = function (id, quantity) {
  let error;
  if ((error = isProduct(id)) !== true) {
    return error;
  }
  if ((error = isQuantity(quantity)) !== true) {
    return error;
  }

  if (items.has(id)) {
    const item = items.get(id);
    item.quantity = quantity;
    items.set(id, item);
  } else {
    // TODO: Error handling or call `cart.add(id, quantity)`?
    cart.add(id, quantity);
  }

  return cart();
};

cart.remove = function (id) {
  let error;
  if ((error = isProduct(id)) !== true) {
    return error;
  }

  items.delete(id);

  return cart();
};

cart.clear = function () {
  items.clear();

  return cart();
};

cart.init = function () {
  cart.clear();
  return cart.add(0, 1);
};

module.exports = cart;
