let feesScale = 1.03;
let distsScale = 1.03;

const mockOrders = [
  {
    order_date: '1/11/2015',
    order_number: '24552525620001',
    order_items: [
      {
        order_item_id: 1,
        type: 'Real Property Recording',
        pages: 4
      },
      {
        order_item_id: 2,
        type: 'Real Property Recording',
        pages: 1
      },
      {
        order_item_id: 3,
        type: 'Real Property Recording',
        pages: 2
      },
    ]
  },
  {
    order_date: '4/11/2015',
    order_number: '777725620001',
    order_items: [
      {
        order_item_id: 4,
        type: 'Real Property Recording',
        pages: 4
      },
      {
        order_item_id: 5,
        type: 'Birth Certificate',
        pages: 1
      },
    ]
  },
];

const fetchFees = () => {
  feesScale += .02;
  const fees = document.getElementById('test-fees');
  fees.style.transform = `scale(${parseFloat(feesScale.toFixed(2))})`;

  fetch('fees', {
    method: 'post',
    body: JSON.stringify(mockOrders)
  }).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
  })

}

const fetchDists = () => {
  distsScale += .02;
  const dists = document.getElementById('test-dists');
  dists.style.transform = `scale(${parseFloat(distsScale.toFixed(2))})`;

  fetch('distributions', {
    method: 'post',
    body: JSON.stringify(mockOrders)
  }).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
  })
}
