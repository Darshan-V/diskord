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

export async function getWorkspaceChannels(workspaceId) {
  const res = await pool.query(
    `with cte as (
        select channel_id, channel_name, channel_category_name from diskord.channels as channels 
        left join diskord.channel_category as channel_category
        on channels.channel_category_id = channel_category.channel_category_id
        where channels.workspace_id=$1
        ) select channel_category_name as category, json_agg(json_build_object('channelId', channel_id, 'channelName', channel_name)) as channels
          from cte 
          group by channel_category_name 
          order by channel_category_name desc;`,
    [workspaceId]
  )

  return res.rows
}
