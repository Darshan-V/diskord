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
  const res = await pool.query("select workspace_id, workspace_name from diskord.workspaces;")
  return res.rows
}

export async function getWorkspaceChannels() {
  //
}
