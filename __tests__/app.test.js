const pool = require('../lib/utils/pool');
// eslint-disable-next-line no-unused-vars
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '2',
          quantity: 10
        });
      });
  });

  it('gets total order from /orders', () => {
    return request(app)
      .get('/api/v1/orders')
      .then(res => {
        expect(res.body).toEqual([{
          id: '1',
          quantity: 10
        }]);
      }); 
  });

  it('gets order item from /orders/:id', () => {
    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      }); 
  });

  it('deletes order item using id', async() => {
    const res = await request(app)
      .delete('/api/v1/orders/1');
    expect(res.body).toEqual({});
  });
});

