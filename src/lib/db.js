// lib/db.js
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL;

let pool;

if (!global.pool) {
  global.pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // required for Neon
    },
  });
}

pool = global.pool;

export default pool;
