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
      const allOrder = await OrderService.select(req.body);
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
  });
