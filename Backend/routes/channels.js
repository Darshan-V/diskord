import express from "express"
import { getChannels } from "../controllers/channels/channels.js"
import { validateWSPId } from "../middeware/channels/validateWSPId.js"

export const router = express.Router({ mergeParams: true })

router.get("/", validateWSPId, getChannels)
