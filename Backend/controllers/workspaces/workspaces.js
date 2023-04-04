import { getWorkSpaces } from "../../models/workspaces.js"

export async function getWorkSpaceList(req, res) {
  try {
    const workSpaceList = await getWorkSpaces()
    res.json(workSpaceList)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
