import pool from "./utils/setup.js"

export async function getWorkSpaces() {
  const res = await pool.query(
    `select id as "workSpaceId", name "workSpaceName"  from diskord.workspaces;`
  )
  return res.rows
}
