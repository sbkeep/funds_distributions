'use strict'

// JSON files are used to input data
// processedOrders will be resulting sorted orders array with prices
const feesJSON = require('./input/fees.json');
const ordersJSON = require('./input/orders.json');

// Main function to output prices with sorted list of orders
const outputOrderPrices = () => {
  const processedOrders = calculateOrders();

  console.log('_'.repeat(20) + '\nOrder Prices');
  processedOrders.forEach((order) => {
    console.log(`\nOrder ID: ${order.number}`);
    order.items.forEach((item) => {
      console.log(`  Order item ${item.type}: $${item.price.toFixed(2)}`);
    })
    console.log(`  Order total: $${order.total.toFixed(2)}`);
  })
}

// Calculate fees and restructure orders as sorted list of objects by total desc
const calculateOrders = (inputOrders = ordersJSON) => {
  // Ininiate orders Array to be sorted
  let processedOrders = inputOrders.map((inputOrder) => {
    // Initiate order to process and price based on fees
    let order = {
      total: 0,
      items: []
    };

    order.number = inputOrder.order_number;

    // Calculate price for each order item and append
    inputOrder.order_items.map((orderItem) => {
      let item = {};
      item.type = orderItem.type
      item.price = calculateItemPrice(orderItem)
      order.total += item.price;
      order.items.push(item)
    });

    // Sort order items based on price desc
    order.items.sort((a,b) => b.price - a.price);

    // Attach order with its sorted items
    return order;
  });

  // Return sorted processedOrders list by order total desc
  return processedOrders.sort((a,b) => b.total - a.total);
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
  });

  return price;
}

// Main Function Call
if (require.main === module) {
  outputOrderPrices();
}

// Export to be used by distributions and server/api
module.exports = {
  calculateOrders
};
