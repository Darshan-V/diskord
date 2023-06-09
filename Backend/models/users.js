import pool from "./utils/setup"

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

export async function createSession(sessionId, email) {
  let res = await pool.query(`select id from diskord.users where email = $1`, [email])
  const userId = res.rows[0].id

  await pool.query(
    `insert into diskord.sessions(session_id, user_id)
         values ($1, $2);`,
    [sessionId, userId]
  )
}

// async function test() {
//   let res = await pool.query(`select * from diskord.sessions`)
//   const id = res.rows[0].user_id
//   console.log(res.rows)
//   res = await pool.query(`select * from diskord.users where id = ${id}`)
//   console.log(res.rows)
// }
// test()
