const feesJSON = require('./input/fees.json');
const ordersJSON = require('./input/orders.json');


// Main Function to output all associated prices for each order
const outputOrderPrices = () => {
  ordersJSON.forEach((order) => {
    let total = 0;
    // Output each order with associated order_items and price
    console.log(`\nOrder ID: ${order.order_number}`)
    // Iterate through each order
    order.order_items.map((orderItem) => {
      let price = calculateItemPrice(orderItem)
      total += price;
      console.log(`    Order item ${orderItem.type}: $${price.toFixed(2)}`);
    });
    console.log(`    Order total: $${total.toFixed(2)}`);
  });
}

// Calculates price for each order item
const calculateItemPrice = (orderItem) => {
  let price = 0;

  // Iterate through objects in feed json
  feesJSON.forEach((item) => {
    // Check for item type to match that from the order
    if (item.order_item_type == orderItem.type) {
      item.fees.forEach((fee) => {
        // Calculate flat fee and add to price
        if (fee.type == 'flat') price += parseFloat(fee.amount);
        // Calculate per page fee for additional pages and add to price
        if (fee.type == 'per-page') price += (orderItem.pages-1) * parseFloat(fee.amount);
      })
    }
  })

  return price;
}

// Main Function Call
outputOrderPrices();
