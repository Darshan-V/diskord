import querystring from "querystring"
import config from "../../config.js"
import fetch from "node-fetch"
import { v4 as uuid } from "uuid"
import { addUser, createSession } from "../../models/users.js"

export async function registerUserThroughGoogle(req, res) {
  try {
    const queryParams = querystring.stringify({
      response_type: "code",
      client_id: config.CLIENT_ID,
      redirect_uri: config.REGISTRATION_CALLBACK,
      scope: "openid profile email"
    })

    return res.json({ redirectUrl: `${config.AUTH_ENDPOINT}?${queryParams}` })
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}

export async function registrationCallBack(req, res) {
  try {
    const { code } = req.query

    const tokenParams = querystring.stringify({
      code,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      redirect_uri: config.REGISTRATION_CALLBACK,
      grant_type: "authorization_code"
    })

    const tokenRes = await fetch(config.TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: tokenParams
    })

    const { access_token } = await tokenRes.json()

    const userinfoRes = await fetch(config.USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const { Id, name, email } = await userinfoRes.json()

    await addUser(name, email)

    const sessionId = uuid()

    await createSession(sessionId, email)

    res
      .cookie("sessionId", sessionId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      .status(201)
      .redirect(config.CLIENT_URL)
  } catch (err) {
    if (err.message === "email already registered") {
      return res.status(409).json("email already registered, please login")
    }
    console.log(err)
    return res.status(500).json()
  }
}
