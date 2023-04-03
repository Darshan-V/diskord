export async function validateWSPId(req, res, next) {
  try {
    const wspId = req.params.id
    if (!Number.isInteger(Number(wspId))) {
      return res.status(400).json({ err: "workspace id should be an integer" })
    }
    next()
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}
