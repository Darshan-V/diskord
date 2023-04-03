import pg from "pg"
import config from "../config.js"

const { Pool } = pg

const pool = new Pool({
  connectionString: config.DB_CONN_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function getWorkSpaces() {
  const res = await pool.query(
    `select id as "workSpaceId", name "workSpaceName"  from diskord.workspaces;`
  )
  return res.rows
}
