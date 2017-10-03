'use strict'

const feesJSON = require('./input/fees.json');
const calculateOrders = require('./fees').calculateOrders;

const outputDistributions = () => {

  // Use function from fees.js to receive orders object with items & prices and funds object
  let [orders, fundTotals] = calculateDistributions();

  console.log('_'.repeat(20) + '\nOrder Distributions');
  // Output each order with associated funds
  orders.forEach((order) => {
    console.log(`\nOrder ID: ${order.number}`);
    order.distributions.forEach((fund) => {
      console.log(`  Fund -  ${fund[0]}: $${fund[1]}`)
    });
  });

  // Create a list for funds to sort by amount
  let sortedFundTotals = Object.keys(fundTotals).map((name) => {
    return [name, fundTotals[name]];
  });
  sortedFundTotals.sort((a,b) => b[1] - a[1]);
  console.log('\n\nTotal distributions:');
  sortedFundTotals.forEach((fund) => {
    console.log(`  Fund - ${fund[0]}: $${fund[1]}`)
  });

}

const calculateDistributions = (incomingOrders) => {
  // Initiate object to track overall totals assigned to each fund
  let fundTotals = { Other: 0 }

  let orders = calculateOrders(incomingOrders);
  orders.forEach((singleOrder) => {

    // Temporary object to track funds to calculate amounts
    let distributions = {};
    // Will track remaining amount that for the "Other" fund
    let otherAmount = singleOrder.total;

    // Iterate through each single order and calculate amount for each fund
    singleOrder.items.forEach((item) => {
      feesJSON.forEach((feeItem) => {
        if (feeItem.order_item_type == item.type) {
          feeItem.distributions.forEach(({name, amount}) => {
            amount = parseFloat(amount);
            otherAmount -= amount;

            // If fund already in the totals object, add value
            if (Object.keys(fundTotals).includes(name)) fundTotals[name] += amount
            // Else create for first instance of fund
            else fundTotals[name] = amount;

            // If fund already in the distributions object, add value
            if (Object.keys(distributions).includes(name)) distributions[name] += amount
            // Else create for first instance of fund
            else distributions[name] = amount;
          });
        }
      });
    });

    // Any leftover amount is assigned to generic "Other" fund
    fundTotals.Other += otherAmount;

    // Create sortable distributions list on order object
    singleOrder.distributions =  Object.keys(distributions).map((name) => {
      return [name, distributions[name]];
    });
    singleOrder.distributions.push(['Other', otherAmount]);
    singleOrder.distributions.sort((a,b) => b[1] - a[1]);
  });

  return [ orders, fundTotals ];
}


// Main Function Call
if (require.main === module) {
  outputDistributions()
}

// Export to be used by server/api
module.exports = {
  calculateDistributions
}
