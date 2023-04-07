import pg from "pg"
import config from "../config.js"

const { Pool } = pg

const pool = new Pool({
  connectionString: config.DB_CONN_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function createSession(sessionId, email) {
  const res = await pool.query(
    `insert into diskord.sessions(session_id, email) 
     values ($1, $2);`,
    [sessionId, email]
  )
  console.log(res.rowCount)
  console.log(res)
}
