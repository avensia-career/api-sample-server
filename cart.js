"use strict";

const products = require("./products");

const isProduct = function(id) {
  if (!products.every(p => p.id !== id)) {
    return true;
  }
  return new Error(`There's no product with id: ${id}`);
};

const isQuantity = function(quantity) {
  if (typeof quantity === "number" && quantity > 0) {
    return true;
  }
  return new Error("Quantity must be a number higher than 0");
};

class Cart {
  constructor() {
    this.items = new Map();
  }
  values() {
    return Array.from(this.items).map(i => i[1]);
  }
  get() {
    const items = this.values();
    return {
      items,
      summery: ["SEK", "EUR"].map(currency => ({
        amount: items.reduce((previous, current) => {
          const amount = current.product.prices.find(
            p => p.currency === currency
          ).amount;
          const quantity = current.quantity;
          return previous + amount * quantity;
        }, 0),
        currency
      }))
    };
  }
  add(id, quantity) {
    let error;
    if ((error = isProduct(id)) !== true) {
      return error;
    }
    if ((error = isQuantity(quantity)) !== true) {
      return error;
    }

    if (this.items.has(id)) {
      const item = this.items.get(id);
      item.quantity += quantity;
      this.items.set(id, item);
    } else {
      this.items.set(id, {
        product: products.find(p => p.id === id),
        quantity
      });
    }

    return this;
  }
  update(id, quantity) {
    let error;
    if ((error = isProduct(id)) !== true) {
      return error;
    }
    if ((error = isQuantity(quantity)) !== true) {
      return error;
    }

    if (this.items.has(id)) {
      const item = this.items.get(id);
      item.quantity = quantity;
      this.items.set(id, item);
    } else {
      // TODO: Error handling or call `cart.add(id, quantity)`?
      return this.add(id, quantity);
    }

    return this;
  }
  remove(id) {
    let error;
    if ((error = isProduct(id)) !== true) {
      return error;
    }

    this.items.delete(id);

    return this;
  }
  clear() {
    this.items.clear();
    return this;
  }
}

module.exports = Cart;
