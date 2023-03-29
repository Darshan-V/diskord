export async function getWorkSpaceList(req, res) {
  const workSpaceList = {
    workspaces: [{ 1: "wsp1" }, { 2: "wsp2" }, { 3: "wsp3" }]
  }

  res.json(workSpaceList)
}
