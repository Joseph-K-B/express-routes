const pool = require('../lib/utils/pool');
// eslint-disable-next-line no-unused-vars
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () =>
  { 
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  it('gets total order from /orders', async() => 
  {
    const order = await Order.insert({ quantity: 10 });
    return request(app)
      .get('/api/v1/orders')
      .then(res => {
        expect(res.body).toEqual([order]);
      }); 
  });

  it('gets order item from /orders/:id', async() => 
  {
    const order = await Order.insert({ quantity: 10 });
    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual(order);
      }); 
  });

  
  it('updates or creates order ny id using patch method', async() => 
  {
    const order = await Order.insert({ quantity: 10 });
    console.log(order);
    return request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 5 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 5
        });
      });
  });

  it('deletes order item using id', async() => {
    const res = await request(app)
      .delete('/api/v1/orders/1');
    expect(res.body).toEqual({});
  });
});
