import products from "../models/product";
import pool from "./mysql-client";
export const SqlProductModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },
  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM products Where product_id = ?", [id]);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
    console.log(rows);
  },
  async create(product: { name: string, price: number, description: string, stock_quantity: number }) {
    const [result]: any = await pool.query(
      "INSERT INTO products (name, price, description, stock_quantity) VALUES (?, ?, ?, ?) ",
      [product.name,
        product.price,
        product.description,
        product.stock_quantity
      ]
    );
    return { id: result.insertId, ...product };
  },
  async update(id: number, product: Partial<{ name: string , description: string, price: number, stock_quantity:number }>) {
    if (product.name === undefined) return undefined;
    await pool.query("UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ? WHERE product_id = ?", [
      product.name,
      product.description,
      product.price,
      product.stock_quantity,
      id,
    ]);
    return this.getById(id);
  },
  async delete(id: number) {
    const [result]: any = await pool.query(
      "DELETE FROM products WHERE product_id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};
