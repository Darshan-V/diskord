import pg from "pg"
import config from "../config.js"

const { Pool } = pg

const pool = new Pool({
  connectionString: config.DB_CONN_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function addUser(name, email) {
  const res = await pool.query(
    `insert into diskord.users(name,  email) 
     values ($1, $2);`,
    [name, email]
  )
}

export async function test() {
  const res = await pool.query(`select * from diskord.users`)
  console.log(res.rows)
}

// test()
