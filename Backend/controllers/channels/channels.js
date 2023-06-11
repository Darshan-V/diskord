import { getWorkspaceChannels } from "../../models/channels.js"

export async function getChannels(req, res) {
  try {
    const channels = await getWorkspaceChannels(req.params.id)
    return res.json(channels)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}
