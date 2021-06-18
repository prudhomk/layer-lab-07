import pool from '../utils/pool.js';

// 1. define the shape of our data
// 2. define methods to access that data (CRUD)
export default class Order {
  id;
  quantityOfItems;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  // static method
  // instance method
  static async insert({ quantity }) {
    const { rows } = await pool.query(
      `INSERT INTO orders (quantity) 
       VALUES ($1) 
       RETURNING *`,
      [quantity]
    );
    console.log(rows);
    return new Order(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);

    return new Order(rows[0]);
  }
}
