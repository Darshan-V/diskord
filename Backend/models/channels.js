import pg from "pg"
import config from "../config.js"

const { Pool } = pg

const pool = new Pool({
  connectionString: config.DB_CONN_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function getWorkspaceChannels(workspaceId) {
  const res = await pool.query(
    `with cte as (
    select channels.id, channels.name as channel, channel_category.name as category from diskord.channels as channels 
    left join diskord.channel_category as channel_category
    on channels.category_id = channel_category.id
    where channels.workspace_id=$1
    ) select  category, json_agg(json_build_object('channelId', id, 'channelName', channel)) as channels
      from cte 
      group by category
      order by category desc`,
    [workspaceId]
  )

  return res.rows
}
