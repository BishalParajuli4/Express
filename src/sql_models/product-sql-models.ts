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
};
