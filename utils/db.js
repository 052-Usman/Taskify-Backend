const { Pool } = require("pg");
const {
  dbConfigurations: { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT },
} = require("../conf/config");

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Query
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = { pool, query };
