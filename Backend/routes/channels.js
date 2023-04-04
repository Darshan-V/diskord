import express from "express"
import { getChannels } from "../controllers/channels.js"

export const router = express.Router({ mergeParams: true })

router.get("/", getChannels)
