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
  try {
    const res = await pool.query(
      `insert into diskord.users(gmail_name,  email) 
         values ($1, $2);`,
      [name, email]
    )
  } catch (err) {
    if (err.code === "23505" && err.table === "users" && err.constraint === "users_email_key") {
      throw new Error("email already registered")
    }
  }
}

// export async function test() {
//   const res = await pool.query(`select * from diskord.users`)
//   console.log(res.rows)
// }

// // test()
