import pool from "./utils/setup"

export async function createSession(sessionId, email) {
  const res = await pool.query(
    `insert into diskord.sessions(session_id, email) 
     values ($1, $2);`,
    [sessionId, email]
  )
  console.log(res.rowCount)
  console.log(res)
}
