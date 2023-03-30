import { getWorkSpaces, getWorkspaceChannels } from "../models/workspaces.js"

export async function getWorkSpaceList(req, res) {
  const workSpaceList = await getWorkSpaces()

  res.json(workSpaceList)
}

export async function getChannels(req, res) {
  const wspId = req.params.id
  const channels = await getWorkspaceChannels(wspId)

  res.json(channels)
}
