import express from "express"
import { authorizeMe, authServerCallBack } from "../controllers/sessions/sessions.js"

export const router = express.Router()

router.get("/", authorizeMe)
router.get("/oauth/google", authServerCallBack)
