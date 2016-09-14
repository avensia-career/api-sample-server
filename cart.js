"use strict";

const products = require("./products");

const items = new Map();

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
  // TODO: Error handling if `quantity` isn't a number and less than 1
  // TODO: Error handling if there's not product with id `id`
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
  // TODO: Error handling if `quantity` isn't a number and less than 1
  if (items.has(id)) {
    const item = items.get(id);
    item.quantity = quantity;
    items.set(id, item);
  } else {
    // TODO: Error handling or call `add(id, quantity)`?
  }

  return cart();
};

cart.remove = function (id) {
  // TODO: Error handling if item doesn't exist
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
