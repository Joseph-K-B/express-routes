const { Router } = require('express');
const Order = require('../models/Order');
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
      const orderQty = await Order.select(req.body);
      res.send(orderQty);
    } catch(err) {
      next(err);
    }
  });
// .get('/:id', (req, res, next) => {});