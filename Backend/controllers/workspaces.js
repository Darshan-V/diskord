import { getWorkSpaces } from "../models/workspaces.js"

export async function getWorkSpaceList(req, res) {
  const workSpaceList = await getWorkSpaces()

  res.json(workSpaceList)
}
