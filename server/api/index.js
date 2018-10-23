const express = require('express');
const router = express.Router();
const { Product, LineItem, Order } = require('../db').models;
module.exports = router;

router.get('/products', (req, res, next)=> {
  Product.findAll()
    .then( products => {
      res.send(products)
    })
    .catch(next);
});

router.get('/orders', async (req, res, next)=> {
  const attr = {
    status: 'CART'
  };
  try {
  let cart = await Order.findOne({ where: attr });
  if(!cart){
    cart = await Order.create(attr); 
  }
  const orders = await Order.findAll({
    include: [ LineItem ],
    order: [['createdAt', 'DESC']]
  })
  res.send(orders);
  }
  catch(ex){
    next(ex);
  }
});

//update line item
router.put('/orders/:orderId/lineItems/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then( lineItem => lineItem.update(req.body))
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

//delete lineItem
router.delete('/orders/:orderId/lineItems/:id', (req, res, next)=> {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.id
    }
  })
    .then(()=> res.sendStatus(204))
    .catch(next);
});

//create lineItem
router.post('/orders/:orderId/lineItems', async (req, res, next)=> {
  try{
    const lineItem = await LineItem.create({ orderId: req.params.orderId, quantity: 1, productId: req.body.item.id })

    res.send(lineItem)
  }
  catch(er){next(er)}
});

//create order
router.post('/orders', async (req, res, next) => {
  try{
	  const order = await Order.create()
	  res.send(order)
  }
  catch(er){next(er)}
})

//update order
router.put('/orders/:id', (req, res, next)=> {
  Order.findById(req.params.id)
    .then( order => order.update(req.body))
    .then( order => res.send(order))
    .catch(next);
});

//delete order
router.delete('/orders/:id', async(req, res, next) => {
  try{
    const items = await LineItem.findAll({where:{orderId: req.params.id}})
    const order = await Order.findOne({where: {id: req.params.id}, include: [LineItem]})
    console.log('These are lineitems: ', items)
    if(items.length){items.map(each => each.destroy())}
    await order.destroy()
	res.sendStatus(204).end()
  }
  catch(er) {next(er)}  
})
