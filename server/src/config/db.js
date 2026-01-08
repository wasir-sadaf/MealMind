import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "guess_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testConnection = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error("MySQL connection failed:", err.message);
        reject(err);
      } else {
        console.log("MySQL connected successfully");
        connection.release();
        resolve();
      }
    });
  });
};

export default db.promise(); 