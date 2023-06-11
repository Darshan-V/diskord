import express from "express"
import { registerUserThroughGoogle, registrationCallBack } from "../controllers/users/users.js"

export const router = express.Router()

router.get("/", registerUserThroughGoogle)
router.get("/googlecallback", registrationCallBack)
