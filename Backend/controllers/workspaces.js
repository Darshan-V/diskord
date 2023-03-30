import { getWorkSpaces, getWorkspaceChannels } from "../models/workspaces.js"

export async function getWorkSpaceList(req, res) {
  try {
    const workSpaceList = await getWorkSpaces()
    res.json(workSpaceList)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

export async function getChannels(req, res) {
  try {
    const wspId = req.params.id
    if (!Number.isInteger(Number(wspId))) {
      return res.status(400).json({ err: "workspace id should be an integer" })
    }

    const channels = await getWorkspaceChannels(wspId)

    // if(channels.length === 0) {
    //   return res.status(400).json({err: ''})
    // }

    res.json(channels)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
