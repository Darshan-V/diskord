import { getWorkspaceChannels } from "../models/channels.js"

export async function getChannels(req, res) {
  try {
    const wspId = req.params.id
    if (!Number.isInteger(Number(wspId))) {
      return res.status(400).json({ err: "workspace id should be an integer" })
    }

    const channels = await getWorkspaceChannels(wspId)

    res.json(channels)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
