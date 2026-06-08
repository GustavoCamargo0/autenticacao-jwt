import pg from "pg";

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usuarios',
  password: 'senai',
  port: '5433',
});


export default pool;