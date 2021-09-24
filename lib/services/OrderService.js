const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  //send a text and store the order

  static async createOrder({ quantity }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }

  static async select() {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'All them orders right meow'
    );

    const order = await Order.select();
    return order;
  }

  static async selectId(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `You ordered ${id}`
    );

    const order = await Order.selectId(id);
    return order;
  }
  static async deleteItem(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order for item ${id} is removed from cart`
    );
    const order = await Order.deleteItem(id);
    return order;
  }
  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order for ${id} updated`
    );
    const order = await Order.updateOrder(id, quantity);
    return order;
  }
};
