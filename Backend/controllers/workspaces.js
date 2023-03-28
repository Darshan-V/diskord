export async function getWorkSpaceList(req, res) {
  const workSpaceList = {
    workspaces: [{ 1: "wsp1" }, { 2: "wsp2" }, { 2: "wsp2" }]
  }

  res.json(workSpaceList)
}
