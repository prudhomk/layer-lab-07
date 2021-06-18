import { Router } from 'express';
import Order from '../models/Order.js';
import OrderService from '../../services/OrderService.js';


// export default Router.......
export default Router() // app.post(....)
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
      
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      res.send(order);
    
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const order = await Order.findAll();
      res.send(order);
    
    } catch (err) {
      next(err);
    }
  });


