import { getWorkSpaceList } from "../controllers/workspaces.js"
import express from "express"

export const router = express.Router()

router.get("/", getWorkSpaceList)
