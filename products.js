"use strict";

/* eslint-disable no-magic-numbers */
const products = [
  {
    id: 22565423428,
    title: "SV 8GB USB Flash Memory E100",
    price: 19.99
  },
  {
    id: 22565423394,
    title: "Litware Wireless Mouse M35",
    price: 29.95
  },
  {
    id: 22565423421,
    title: "SV Keyboard E90",
    price: 41.73
  },
  {
    id: 22565423368,
    title: "Proseware Ink Jet Wireless Printer M400",
    price: 129.0
  },
  {
    id: 22565423204,
    title: "Fabrikam Tablet M50",
    price: 99.0
  },
  {
    id: 22565423328,
    title: "WWI LCD17 E200",
    price: 99.0
  },
  {
    id: 22565423456,
    title: "A. Datum Compact Digital Camera M200",
    price: 129.0
  },
  {
    id: 22565423255,
    title: "WWI Desktop PC1.80 E1800",
    price: 229.9
  },
  {
    id: 22565423121,
    title: "Southridge Video Laptop8.9 E0890",
    price: 326.0
  },
  {
    id: 22565423906,
    title: "Litware 4-Line Cordless Phone M203",
    price: 32.99
  },
  {
    id: 22565423803,
    title: "Fabrikam Bookshelf Speaker",
    price: 79.99
  },
  {
    id: 22565423658,
    title: "SV 8xDVD E100",
    price: 69.0
  },
  {
    id: 22565423853,
    title: "Proseware Play Headphones",
    price: 99.99
  },
  {
    id: 22565423591,
    title: "Fabrikam Social Videographer E200",
    price: 165.0
  },
  {
    id: 22565423532,
    title: "A. Datum SLR Camera X358",
    price: 588.0
  },
  {
    id: 22565423633,
    title: 'Southridge Video 32" LCD HDTV M130',
    price: 499.99
  }
];

module.exports = products.map(p => ({
  id: p.id,
  title: p.title,
  imageUrl: `/images/${p.id}.png`,
  url: `/products/${p.id}`,
  prices: [
    {
      amount: p.price * 8,
      currency: "SEK"
    },
    {
      amount: p.price,
      currency: "EUR"
    }
  ]
}));
