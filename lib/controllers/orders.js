const { Router } = require('express');
// const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try { 
      const allOrder = await OrderService.selectAll(req.body);
      res.send(allOrder);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async(req, res, next) => {
    try {
      const orderedItem = await OrderService.selectId(req.params.id);
      res.send(orderedItem);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const deleteIt = await OrderService.deleteItem(req.params.id);
      res.send(deleteIt);
    } catch(err){
      next(err);
    }

  })
  .put('/:id', async(req, res, next) => {
    try {
      const put = await OrderService.updateOrder(req.params.id, req.body.quantity);
      res.send(put);
    } catch(err){
      next(err);
    }
  });
  
