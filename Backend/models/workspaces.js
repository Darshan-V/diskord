import pool from "./utils/setup"

export async function getWorkSpaces() {
  const res = await pool.query(
    `select id as "workSpaceId", name "workSpaceName"  from diskord.workspaces;`
  )
  return res.rows
}
