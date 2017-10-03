const express = require('express');
const path = require('path');

const calculateOrders = require('./fees').calculateOrders;
const calculateDistributions = require('./distributions').calculateDistributions;

const server = express();

server.use('/', express.static(__dirname + '/public'));

server.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.post('/fees', (req, res) => {
  let body = '';
  let orders;

  req.on('data', (data) => {
    body += data;
    if (body.length > 1e6) request.connection.destroy();
  });

  req.on('end', () => {
    orders = calculateOrders(JSON.parse(body));
    res.send(JSON.stringify(orders));
  })

});

server.post('/distributions', (req, res) => {
  let body = '';

  req.on('data', (data) => {
    body += data;
    if (body.length > 1e6) request.connection.destroy();
  });

  req.on('end', () => {
    const [orderDistributions, y] = calculateDistributions(JSON.parse(body));
    orderDistributions.forEach((order) => {
      delete order.total;
      delete order.items;
    })

    res.send(JSON.stringify(orderDistributions));
  })
})


server.listen(3000, () => console.log('Listening on port 3000'));
