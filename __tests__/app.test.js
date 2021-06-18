import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

describe('layered routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({ id: '1', quantity: 10 });
  });

  it('gets an order by id', async () => {
    const order = await Order.insert({ quantity: 5 });
    return request(app)
      .get(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).toEqual(order);
      });
  });

  it('gets all orders', async () => {
    const order1 = await Order.insert({
      quantity: 8008
    });

    const order2 = await Order.insert({
      quantiy: 69
    });

    const order3 = await Order.insert({
      quantity: 420
    });
  
    const res = await request(app).get('/api/v1/orders');
    expect(res.body).toEqual([order1, order2, order3]);
  });
  
});
