import pool from "./mysql-client";


export const SqlOrderModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM orders");
    return rows;
  },
  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (!Array.isArray(rows) || !rows.length) return undefined;
    const order = rows[0] as { [key: string]: any };
    // Get products for this order
    const [products] = await pool.query(
      "SELECT productId FROM order_products WHERE orderId = ?",
      [id]
    );
    order.productIds = (
      products as {
        productId: number;
      }[]
    ).map((p) => p.productId);
    return order;
  },

  async createOrder(order: { userId: number; productId: number[] }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();


      const [result]: any = await conn.query(
        "INSERT INTO orders (userId) VALUES (?)",
        [order.userId]
      );
      const orderId = result.insertId;
      for (const pid of order.productId) {
        await conn.query(
          "INSERT INTO order_products (orderId, productId) VALUES (?, ?)",
          [orderId, pid]
        );
      }
      await conn.commit();
      return {
        id: orderId,
        userId: order.userId,
        productIds: order.productId,
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  async update(
    id: number,
    order: Partial<{ userId: number; productIds: number[] }>
  ) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      if (order.userId !== undefined) {
        await conn.query("UPDATE orders SET userId = ? WHERE id = ?", [
          order.userId,
          id,
        ]);
      }
      if (order.productIds !== undefined) {
        await conn.query("DELETE FROM order_products WHERE orderId = ?", [id]);
        for (const pid of order.productIds) {
          await conn.query(
            "INSERT INTO order_products (orderId, productId) VALUES (?, ?)",
            [id, pid]
          );
        }
      }
      await conn.commit();
      return this.getById(id);
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  async delete(id: number) {
    const [result]: any = await pool.query("DELETE FROM orders WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};