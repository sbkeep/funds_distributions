# Fees and Distributions
Three part challenge to parse input json files and output corresponding fees and distributions, with functionality extended through server endpoints.

## Part 1: Fees
Run **fees.js**, will read from **input/fees.json** and **input/orders.json**, calculate prices for each item, and output a list of orders each with corresponding items and prices, along with order total.  All items and orders are sorted by descending amount value.

Note - for simpler implementation without sorting, **unsorted-fees.js** will also output orders with items & prices.

## Part 2: Distributions
Run **distributions.js**, will read from **input/fees.json**, and import already sorted list of orders with prices from **fees.js**.

Will calculate distributions for each item and output all orders with funds & amounts.  Will also output total for all funds in sorted list, with remaining funds assigned to "Other"

## Part 3: API
Run **server.py**, will start server listing on port 3000 with two endpoints, **/fees** and **/distributions**.  Each endpoint will accept an array of objects, and return fees and distributions respectively, using functions from Part 1 and Part 2. Also included is an index.html with a javascript file that will hit the two endpoints with mock objects and output to console.

Fees object will be returned via JSON in format of:
```
[ {number: 252652652, total: 45, items: [{type:'Real Property Recording',price:27}]}]
```

Distributions object will be returned via JSON in format of:
```
[ {number: 252652652, distributions: [['County Clerk Fee', 20],['Recording Fee', 5]]}]
```
